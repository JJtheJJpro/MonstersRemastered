import keyboard
import queue
import serial
import serial.serialutil
import serial.tools.list_ports

class Backend:
    sp: serial.Serial | None = None

def monitor_usb_nt():
    '''This blocks the calling thread.'''
    import pythoncom
    import wmi
    
    pythoncom.CoInitialize()

    c = wmi.WMI()
    watcher = c.Win32_DeviceChangeEvent.watch_for()

    print("Listening for USB changes...")

    try:
        event = watcher()
        if event:
            print("USB change detected.")
    except KeyboardInterrupt:
        print("Monitoring stopped by user.")
def monitor_usb_posix():
    '''This blocks the calling thread.'''
    import pyudev
    
    ctx = pyudev.Context()
    monitor = pyudev.Monitor.from_netlink(ctx)
    monitor.filter_by(subsystem='usb')

    print("Listening for USB changes...")

    for _ in monitor:
        print("USB change detected.")
def monitor_usb():
    '''This blocks the calling thread.'''
    import os

    if os.name == 'nt':
        monitor_usb_nt()
    else:
        monitor_usb_posix()

def parse_monster(monster: int, down: bool):
    return (0b01000000 if down else 0b00000000) | monster

def parse_monster_key(key: str, down: bool):
    match (key):
        case 'q':
            return parse_monster(1, down)
        case 'w':
            return parse_monster(2, down)
        case 'e':
            return parse_monster(3, down)
        case 'r':
            return parse_monster(4, down)
        case 't':
            return parse_monster(5, down)
        case 'y':
            return parse_monster(6, down)
        case 'u':
            return parse_monster(7, down)
        case 'i':
            return parse_monster(8, down)
        case 'o':
            return parse_monster(9, down)
        case 'p':
            return parse_monster(10, down)
        
        case 'a':
            return parse_monster(11, down)
        case 's':
            return parse_monster(12, down)
        case 'd':
            return parse_monster(13, down)
        case 'f':
            return parse_monster(14, down)
        case 'g':
            return parse_monster(15, down)
        case 'h':
            return parse_monster(16, down)
        case 'j':
            return parse_monster(17, down)
        case 'k':
            return parse_monster(18, down)
        case 'l':
            return parse_monster(19, down)
        case ';':
            return parse_monster(20, down)
        
        case 'z':
            return parse_monster(21, down)
        case 'x':
            return parse_monster(22, down)
        case 'c':
            return parse_monster(23, down)
        case 'v':
            return parse_monster(24, down)
        case 'b':
            return parse_monster(25, down)
        case 'n':
            return parse_monster(26, down)
        case 'm':
            return parse_monster(27, down)
        case ',':
            return parse_monster(28, down)
        case '.':
            return parse_monster(29, down)
        case '/':
            return parse_monster(30, down)
        
        case 'space':
            return parse_monster(31, down)

        case '\'':
            return parse_monster(32, down)
