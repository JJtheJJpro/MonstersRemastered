use crossterm::event::Event;
use rdev::{EventType, Key};
use serial2::{COMMON_BAUD_RATES, SerialPort};
use serialport::SerialPortType;
use std::{
    collections::HashMap,
    error::Error,
    sync::{
        atomic::{AtomicBool, Ordering},
        mpsc::{self, Receiver},
    },
    thread,
    time::Duration,
};

static FOCUSED: AtomicBool = AtomicBool::new(true);
static KEYBDLS: AtomicBool = AtomicBool::new(false);

pub struct Backend {
    sp: Option<SerialPort>,
    keyr: Receiver<(bool, Key)>,
}

impl Backend {
    pub fn init() -> Self {
        let (tx, rx) = mpsc::channel();
        thread::spawn(move || {
            let mut keysdown: HashMap<Key, bool> = HashMap::with_capacity(32);
            rdev::listen(move |ev| {
                if let EventType::KeyPress(evk) = ev.event_type {
                    if !*keysdown.get(&evk).unwrap_or(&false) {
                        if KEYBDLS.load(Ordering::SeqCst) && FOCUSED.load(Ordering::SeqCst) {
                            let _ = tx.send((true, evk));
                        }
                        keysdown.insert(evk, true);
                    }
                } else if let EventType::KeyRelease(evk) = ev.event_type {
                    if KEYBDLS.load(Ordering::SeqCst) && FOCUSED.load(Ordering::SeqCst) {
                        let _ = tx.send((false, evk));
                    }
                    *keysdown.entry(evk).or_insert(true) = false;
                }
                
            })
            .unwrap();
        });
        thread::spawn(|| {
            loop {
                match crossterm::event::read().unwrap() {
                    Event::FocusGained => FOCUSED.store(true, Ordering::SeqCst),
                    Event::FocusLost => FOCUSED.store(false, Ordering::SeqCst),
                    _ => (),
                }
            }
        });
        Self { sp: None, keyr: rx }
    }

    #[cfg(target_os = "windows")]
    fn monitor_usb_windows(&self) {
        use std::collections::HashMap;
        use wmi::{COMLibrary, Variant, WMIConnection};

        let com = COMLibrary::new().unwrap();
        let wmi_con = WMIConnection::new(com).unwrap();

        //println!("Listening for USB device changes...");

        const QUERY: &'static str = r#"SELECT * FROM Win32_DeviceChangeEvent WHERE EventType=2"#;
        let iter = wmi_con
            .raw_notification::<HashMap<String, Variant>>(QUERY)
            .unwrap();
        for evt in iter {
            match evt {
                Ok(_event) => break, //println!("DeviceChangeEvent: {:?}", event),
                Err(e) => {
                    // Fallback: attempt to parse as generic JSON
                    let val = wmi_con
                        .raw_query(QUERY)
                        .unwrap()
                        .into_iter()
                        .collect::<HashMap<String, Variant>>()
                        .clone();
                    println!("Raw Event JSON: {:?}", val);
                    eprintln!("WMI error mapping: {}", e);
                }
            }
        }
    }

    #[cfg(target_os = "linux")]
    fn monitor_usb_linux(&self) {
        use udev::MonitorBuilder;

        let mut monitor = MonitorBuilder::new()
            .unwrap()
            .match_subsystem("usb")
            .unwrap()
            .listen()
            .unwrap();
        //println!("Listening for USB device changes...");

        for event in monitor.iter() {
            break;
        }
    }

    #[cfg(target_os = "macos")]
    fn monitor_usb_macos(&self) {
        use core_foundation::runloop::CFRunLoopRun;
        use iokit_sys::{
            IOIteratorNext, IOObjectRelease, IOServiceAddMatchingNotification, IOServiceMatching,
            io_iterator_t, kIOMasterPortDefault, kIOMatchedNotification,
        };

        extern "C" fn callback(_refcon: *mut std::ffi::c_void, iterator: io_iterator_t) {
            unsafe {
                loop {
                    let service = IOIteratorNext(iterator);
                    if service == 0 {
                        break;
                    }
                    println!("USB device event on macOS: service=0x{:x}", service);
                    IOObjectRelease(service);
                }
            }
        }

        unsafe {
            let matching = IOServiceMatching(b"IOUSBDevice\0".as_ptr() as *const _);
            let mut notify: io_iterator_t = 0;
            IOServiceAddMatchingNotification(
                kIOMasterPortDefault,
                kIOMatchedNotification,
                matching,
                callback,
                ptr::null_mut(),
                &mut notify,
            );
            // Prime notifications
            callback(ptr::null_mut(), notify);
            //println!("Listening for USB device changes...");
            CFRunLoopRun();
        }
    }

    /// Blocks the current thread until a USB plug-in event triggers.
    pub fn monitor_usb(&self) {
        #[cfg(target_os = "windows")]
        self.monitor_usb_windows();
        #[cfg(target_os = "linux")]
        self.monitor_usb_linux();
        #[cfg(target_os = "macos")]
        self.monitor_usb_macos();
    }

    /// Returns an initialized serial port if the Arduino device is found and initialized (will auto reset arduino) or if the Arduino is already connected.<br/>Returns None if the Arduino device isn't found.<br/>Errors may result.
    pub fn port_init(&mut self) -> Result<bool, Box<dyn Error>> {
        if self.sp.is_some() {
            return Ok(true);
        }
        let ports = serialport::available_ports()?;
        for port in ports {
            match port.port_type {
                SerialPortType::UsbPort(usbport) => {
                    if usbport.vid == 0x2341 && usbport.pid == 0x0042 {
                        let mut sp = SerialPort::open(port.port_name, COMMON_BAUD_RATES[1])?;
                        sp.set_dtr(true)?;
                        sp.set_read_timeout(Duration::MAX)?;
                        sp.set_write_timeout(Duration::MAX)?;
                        self.sp = Some(sp);
                        self.read_byte().unwrap();
                        return Ok(true);
                    }
                }
                _ => continue,
            }
        }

        Ok(false)
    }

    pub fn reset(&self) {
        if let Some(sp) = &self.sp {
            sp.write(&[0b10000000]).unwrap();
        }
    }

    pub fn exit(self) {
        if let Some(sp) = self.sp {
            sp.write(&[0b10000000]).unwrap();
        }
    }

    /// Blocks calling thread until a byte is read from the serial port.<br/>Returns None if serial port is not initialized.<br/>Errors may result.
    pub fn read_byte(&self) -> Result<Option<u8>, Box<dyn Error>> {
        match &self.sp {
            Some(sp) => {
                let mut b = [0u8];
                sp.read_exact(&mut b)?;
                Ok(Some(b[0]))
            }
            None => Ok(None),
        }
    }

    /// Blocks calling thread, calling a callback when data is read.  The callback must return false in order for this function to return.
    ///
    /// It is imperative that the callback return false if the port is not initialized or an error occurs.  A stack overflow may occur otherwise.
    pub fn read_byte_loop<F>(&self, callback: F)
    where
        F: Fn(Result<Option<u8>, Box<dyn Error>>) -> bool,
    {
        loop {
            if !callback(self.read_byte()) {
                break;
            }
        }
    }

    /// Writes a byte to the Arduino.<br/>Returns false if serial port not initialized.<br/>Errors may occur.
    pub fn write_byte(&self, v: u8) -> Result<bool, Box<dyn Error>> {
        match &self.sp {
            Some(sp) => {
                sp.write(&[v])?;
                Ok(true)
            }
            None => Ok(false),
        }
    }

    pub fn parse_button_to_byte(&self, down: bool, key: Key, door: Option<bool>) -> Option<u8> {
        match &self.sp {
            Some(_sp) => Some(if key == Key::Space {
                if let Some(d) = door {
                    if d { 95 } else { 31 }
                } else {
                    255
                }
            } else {
                (if down { 64 } else { 0 }
                    | match key {
                        Key::KeyQ => 1,
                        Key::KeyW => 2,
                        Key::KeyE => 3,
                        Key::KeyR => 4,
                        Key::KeyT => 5,
                        Key::KeyY => 6,
                        Key::KeyU => 7,
                        Key::KeyI => 8,
                        Key::KeyO => 9,
                        Key::KeyP => 10,
                        Key::KeyA => 11,
                        Key::KeyS => 12,
                        Key::KeyD => 13,
                        Key::KeyF => 14,
                        Key::KeyG => 15,
                        Key::KeyH => 16,
                        Key::KeyJ => 17,
                        Key::KeyK => 18,
                        Key::KeyL => 19,
                        Key::SemiColon => 20,
                        Key::KeyZ => 21,
                        Key::KeyX => 22,
                        Key::KeyC => 23,
                        Key::KeyV => 24,
                        Key::KeyB => 25,
                        Key::KeyN => 26,
                        Key::KeyM => 27,
                        Key::Comma => 28,
                        Key::Dot => 29,
                        Key::Slash => 30,
                        Key::Quote => 32,
                        Key::Return => 128,
                        _ => unreachable!(),
                    })
            }),
            None => None,
        }
    }

    /// have callback return false to exit this function.
    ///
    /// F: Fn(down: bool, key: KeyCode)
    pub fn key_event<F>(&self, mut callback: F)
    where
        F: FnMut(bool, Key) -> bool,
    {
        KEYBDLS.store(true, Ordering::SeqCst);
        loop {
            match self.keyr.recv() {
                Ok((down, key)) => {
                    if FOCUSED.load(Ordering::SeqCst) {
                        //println!("{key:?}");
                        if !callback(down, key) {
                            break;
                        }
                    }
                }
                Err(e) => eprintln!("{e}"),
            }
        }
        KEYBDLS.store(false, Ordering::SeqCst);
    }
}
