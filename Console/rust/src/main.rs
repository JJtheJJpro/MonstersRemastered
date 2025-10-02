mod backend;
mod frontend;

use backend::Backend;
use frontend::{Frontend, FrontendScreen, PrintCommand};
use rdev::Key;

fn main() {
    let mut backend = Backend::init();
    let mut frontend = Frontend::init();
    let mut monsts: [bool; 32] = [
        false, false, false, false, false, false, false, false, false, false, false, false, false,
        false, false, false, false, false, false, false, false, false, false, false, false, false,
        false, false, false, false, false, false,
    ];

    loop {
        let mut exit = false;
        while port_init(&mut backend) {
            match frontend.menu() {
                FrontendScreen::Menu => {
                    exit = true;
                    break;
                }
                FrontendScreen::Control => control_part(&mut frontend, &mut backend, &mut monsts),
                FrontendScreen::Settings => settings_part(&mut frontend, &backend),
                FrontendScreen::Help => help_part(&mut frontend, &backend),
            }
        }

        if exit {
            break;
        }

        monitor_usb(&frontend, &backend);
    }

    frontend.reset();
    backend.exit();
}

/// `true` if port initialized; `false` otherwise.
fn port_init(backend: &mut Backend) -> bool {
    match backend.port_init() {
        Ok(v) => v,
        Err(e) => {
            eprintln!("port initialization error: {e}");
            false
        }
    }
}

fn control_part(frontend: &mut Frontend, backend: &Backend, monsts: &mut [bool; 32]) {
    frontend.update_control(monsts);
    backend.key_event(move |down, key| {
        match key {
            Key::KeyQ
            | Key::KeyW
            | Key::KeyE
            | Key::KeyR
            | Key::KeyT
            | Key::KeyY
            | Key::KeyU
            | Key::KeyI
            | Key::KeyO
            | Key::KeyP
            | Key::KeyA
            | Key::KeyS
            | Key::KeyD
            | Key::KeyF
            | Key::KeyG
            | Key::KeyH
            | Key::KeyJ
            | Key::KeyK
            | Key::KeyL
            | Key::SemiColon
            | Key::KeyZ
            | Key::KeyX
            | Key::KeyC
            | Key::KeyV
            | Key::KeyB
            | Key::KeyN
            | Key::KeyM
            | Key::Comma
            | Key::Dot
            | Key::Slash
            | Key::Space
            | Key::Quote => {
                if let Some(v) = backend.parse_button_to_byte(
                    down,
                    key,
                    if key == Key::Space && down {
                        Some(!monsts[30])
                    } else {
                        None
                    },
                ) {
                    if v != 0xFF {
                        backend.write_byte(v).unwrap();
                    }
                } else {
                }
                match key {
                    Key::KeyQ => monsts[0] = if down { true } else { false },
                    Key::KeyW => monsts[1] = if down { true } else { false },
                    Key::KeyE => monsts[2] = if down { true } else { false },
                    Key::KeyR => monsts[3] = if down { true } else { false },
                    Key::KeyT => monsts[4] = if down { true } else { false },
                    Key::KeyY => monsts[5] = if down { true } else { false },
                    Key::KeyU => monsts[6] = if down { true } else { false },
                    Key::KeyI => monsts[7] = if down { true } else { false },
                    Key::KeyO => monsts[8] = if down { true } else { false },
                    Key::KeyP => monsts[9] = if down { true } else { false },
                    Key::KeyA => monsts[10] = if down { true } else { false },
                    Key::KeyS => monsts[11] = if down { true } else { false },
                    Key::KeyD => monsts[12] = if down { true } else { false },
                    Key::KeyF => monsts[13] = if down { true } else { false },
                    Key::KeyG => monsts[14] = if down { true } else { false },
                    Key::KeyH => monsts[15] = if down { true } else { false },
                    Key::KeyJ => monsts[16] = if down { true } else { false },
                    Key::KeyK => monsts[17] = if down { true } else { false },
                    Key::KeyL => monsts[18] = if down { true } else { false },
                    Key::SemiColon => monsts[19] = if down { true } else { false },
                    Key::KeyZ => monsts[20] = if down { true } else { false },
                    Key::KeyX => monsts[21] = if down { true } else { false },
                    Key::KeyC => monsts[22] = if down { true } else { false },
                    Key::KeyV => monsts[23] = if down { true } else { false },
                    Key::KeyB => monsts[24] = if down { true } else { false },
                    Key::KeyN => monsts[25] = if down { true } else { false },
                    Key::KeyM => monsts[26] = if down { true } else { false },
                    Key::Comma => monsts[27] = if down { true } else { false },
                    Key::Dot => monsts[28] = if down { true } else { false },
                    Key::Slash => monsts[29] = if down { true } else { false },
                    Key::Space => {
                        if down {
                            monsts[30] = !monsts[30];
                        }
                    }
                    Key::Quote => monsts[31] = if down { true } else { false },
                    Key::Return => {
                        for i in 0..32 {
                            monsts[i] = false;
                        }
                    }
                    _ => unreachable!(),
                }
                frontend.update_control(monsts);
            }
            Key::Return => backend.reset(),
            Key::Escape => return false,
            _ => (),
        }

        true
    });
}

fn settings_part(frontend: &mut Frontend, backend: &Backend) {
    frontend.update_settings();
    backend.key_event(move |down, key| {
        if down {
            match key {
                Key::Equal => {
                    frontend.key_guide = !frontend.key_guide;
                    frontend.update_settings();
                }
                Key::Minus => {
                    frontend.gui_update = !frontend.gui_update;
                    frontend.update_settings();
                }
                Key::Return => backend.reset(),
                Key::Escape => return false,
                _ => (),
            }
        }

        true
    });
}

fn help_part(frontend: &mut Frontend, backend: &Backend) {
    frontend.update_help();
    backend.key_event(|down, key| !(down && key == Key::Escape));
}

fn monitor_usb(frontend: &Frontend, backend: &Backend) {
    frontend.print(PrintCommand::USBListen);
    backend.monitor_usb();
    frontend.print(PrintCommand::USBChange);
}
