from enum import Enum


class FrontendScreen(Enum):
    Menu = 0
    Control = 1
    Settings = 2
    Help = 3


class Frontend:
    screen = FrontendScreen.Menu
    key_guide = False
    gui_update = False
    names = [
        "Monster 1",
        "Monster 2",
        "Monster 3",
        "Monster 4",
        "Monster 5",
        "Monster 6",
        "Monster 7",
        "Monster 8",
        "Monster 9",
        "Monster10",
    ]
    
    def __init__(_):
        print("\x1b[38;2;255;0;0mWARNING: This program does suppress all key inputs even when not in focus.")
