# JJ's Minimal Monsters program, written in python.
# Only run this as main, or unexpected things will happen.

# Imports (keyboard is extremely powerful, exercise caution)
import keyboard
import queue
import serial
import serial.serialutil
import serial.tools.list_ports
import threading

print("WARNING: This program does suppress all key inputs even when not in focus.")
print("Press ESC to exit")

# For preventing the program to close until user presses ESC
channel = queue.Queue(2)

ser = None

keys_down = []

door = False

def monitor_usb_windows():
    import pythoncom
    import wmi

    global channel

    pythoncom.CoInitialize()

    # Create a WMI watcher
    c = wmi.WMI()
    watcher = c.Win32_DeviceChangeEvent.watch_for()

    print("Listening for USB changes on Windows...")

    try:
        event = watcher()
        if event:
            print("USB change detected.")
    except KeyboardInterrupt:
        print("Monitoring stopped by user.")

def port_thread():
    global ser, channel
    while True:
        ports = serial.tools.list_ports.comports()
        for port in ports:
            if port.vid == 0x2341 and port.pid == 0x0042:
                ser = serial.Serial(port.name, baudrate=9600)
                print("connected!")
        while ser is not None:
            try:
                r = ser.read()
                if len(r) == 0:
                    raise serial.serialutil.SerialException
                print(f"{r[0]:b}")
                if channel.unfinished_tasks == 1:
                    channel.put(None)
            except serial.serialutil.SerialException:
                ser = None
                print("disconnected!")

        ser = None
        monitor_usb_windows()

port_thread_call = threading.Thread(target=port_thread, daemon=True)
port_thread_call.start()

def parse_monster(key: str, down: bool):
    global ser
    global keys_down
    global door

    if ser is not None:
        df = 0b01000000 if down else 0b00000000
        match (key):
            case 'q':
                ser.write([df | 1])
            case 'w':
                ser.write([df | 2])
            case 'e':
                ser.write([df | 3])
            case 'r':
                ser.write([df | 4])
            case 't':
                ser.write([df | 5])
            case 'y':
                ser.write([df | 6])
            case 'u':
                ser.write([df | 7])
            case 'i':
                ser.write([df | 8])
            case 'o':
                ser.write([df | 9])
            case 'p':
                ser.write([df | 10])

            case 'a':
                ser.write([df | 11])
            case 's':
                ser.write([df | 12])
            case 'd':
                ser.write([df | 13])
            case 'f':
                ser.write([df | 14])
            case 'g':
                ser.write([df | 15])
            case 'h':
                ser.write([df | 16])
            case 'j':
                ser.write([df | 17])
            case 'k':
                ser.write([df | 18])
            case 'l':
                ser.write([df | 19])
            case ';':
                ser.write([df | 20])
            
            case 'z':
                ser.write([df | 21])
            case 'x':
                ser.write([df | 22])
            case 'c':
                ser.write([df | 23])
            case 'v':
                ser.write([df | 24])
            case 'b':
                ser.write([df | 25])
            case 'n':
                ser.write([df | 26])
            case 'm':
                ser.write([df | 27])
            case ',':
                ser.write([df | 28])
            case '.':
                ser.write([df | 29])
            case '/':
                ser.write([df | 30])

            case 'space':
                if down:
                    door = not door
                    df = 0b01000000 if door else 0b00000000
                    ser.write([df | 31])
                    print(f"\rdoor is {"open" if door else "shut"}", end='')
            case "'":
                ser.write([df | 32])

            case _:
                return

        if not keys_down.__contains__(key) and not down:
            return

        if down:
            keys_down.append(key)
        else:
            keys_down.remove(key)

def on_key_press(event):
    global channel
    global keys_down

    if not keys_down.__contains__(event.name):
        #keys_down.append(event.name)
        parse_monster(event.name, True)
        #print(f"{event.name}")
        if event.name == "esc":
            print()
            channel.put(None)


def on_key_release(event):
    global keys_down
    #keys_down.remove(event.name)
    parse_monster(event.name, False)

# Set up keyboard hooks
unhook_press = keyboard.on_press(on_key_press, True)
unhook_release = keyboard.on_release(on_key_release, True)

channel.get()
unhook_press()
unhook_release()
if ser is not None:
    ser.write([0b10000000])
    #channel.get()

print("Exiting...")
