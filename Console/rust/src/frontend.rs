use std::io::Write;

use crossterm::event::{Event, KeyCode};

const TOPL: char = '\u{2554}';
const TOPM: char = '\u{2566}';
const TOPR: char = '\u{2557}';

const BOTL: char = '\u{255A}';
const BOTM: char = '\u{2569}';
const BOTR: char = '\u{255D}';

const LEFM: char = '\u{2560}';
const RIGM: char = '\u{2563}';

const TPBT: char = '\u{2550}';
const LFRT: char = '\u{2551}';

const MIDD: char = '\u{256C}';

const TOPBOTTOM: &str =
    "\u{2550}\u{2550}\u{2550}\u{2550}\u{2550}\u{2550}\u{2550}\u{2550}\u{2550}\u{2550}\u{2550}";
const TOPBOTTOMREPM: &str = "\u{2550}\u{2550}\u{2550}\u{2550}\u{2550}\u{2550}\u{2550}\u{2550}\u{2550}\u{2550}\u{2550}\u{2550}\u{2550}\u{2550}\u{2550}\u{2550}\u{2550}\u{2550}\u{2550}\u{2550}\u{2550}\u{2550}\u{2550}\u{2550}\u{2550}\u{2550}\u{2550}\u{2550}\u{2550}\u{2550}\u{2550}";

pub(super) enum FrontendScreen {
    Menu,
    Control,
    Settings,
    Help,
}

pub(super) enum PrintCommand {
    USBListen,
    USBChange,
}

pub(super) struct Frontend {
    pub screen: FrontendScreen,
    pub key_guide: bool,
    pub gui_update: bool, // true is wait, false is instant
    names: [&'static str; 10],
}
impl Frontend {
    pub fn init() -> Self {
        println!(
            "\x1b[38;2;255;0;0mWARNING: This program does suppress all key inputs even when not in focus."
        );
        Self {
            screen: FrontendScreen::Menu,
            key_guide: false,
            gui_update: false,
            names: [
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
            ],
        }
    }
    pub fn print(&self, cmd: PrintCommand) {
        match cmd {
            PrintCommand::USBListen => println!("Listening for USB devices changes..."),
            PrintCommand::USBChange => println!("USB insert detected!"),
        }
    }

    pub fn reset(self) {
        println!("\x1b[39m\x1b[49m");
    }

    pub fn menu(&mut self) -> FrontendScreen {
        match self.screen {
            FrontendScreen::Control => {
                for _ in 0..11 {
                    print!("\x1b[1A");
                    print!("\x1b[K");
                }
                std::io::stdout().flush().unwrap();
            }
            FrontendScreen::Settings => {
                for _ in 0..7 {
                    print!("\x1b[1A");
                    print!("\x1b[K");
                }
                std::io::stdout().flush().unwrap();
            }
            FrontendScreen::Help => {
                for _ in 0..12 {
                    print!("\x1b[1A");
                    print!("\x1b[K");
                }
                std::io::stdout().flush().unwrap();
            }
            _ => {}
        }
        self.screen = FrontendScreen::Menu;
        let mut tpos: u8 = 0;
        loop {
            println!(
                "{} Control {}",
                if tpos == 0 { ">" } else { " " },
                if tpos == 0 { "<" } else { " " }
            );
            println!(
                "{} Settings {}",
                if tpos == 1 { ">" } else { " " },
                if tpos == 1 { "<" } else { " " }
            );
            println!(
                "{} Help {}",
                if tpos == 2 { ">" } else { " " },
                if tpos == 2 { "<" } else { " " }
            );
            println!(
                "{} Exit {}",
                if tpos == 3 { ">" } else { " " },
                if tpos == 3 { "<" } else { " " }
            );
            if let Ok(ev) = crossterm::event::read() {
                if let Event::Key(evk) = ev {
                    match evk.code {
                        KeyCode::Up => {
                            if tpos != 0 {
                                tpos -= 1;
                            }
                        }
                        KeyCode::Down => {
                            if tpos != 3 {
                                tpos += 1;
                            }
                        }
                        KeyCode::Enter => break,
                        _ => (),
                    }
                }
            } else {
                break;
            }
            print!("\x1b[4A");
            std::io::stdout().flush().unwrap();
        }
        match tpos {
            0 => FrontendScreen::Control,
            1 => FrontendScreen::Settings,
            2 => FrontendScreen::Help,
            3 => FrontendScreen::Menu,
            _ => unreachable!(),
        }
    }

    pub fn update_control(&mut self, data: &[bool; 32]) {
        match self.screen {
            FrontendScreen::Menu => {
                print!("\x1b[4A");
                std::io::stdout().flush().unwrap();
            }
            FrontendScreen::Control => {
                print!("\x1b[11A");
                std::io::stdout().flush().unwrap();
            }
            _ => (),
        }
        self.screen = FrontendScreen::Control;

        const P: &'static str =
            "\x1b[38;2;0;0;0m\x1b[48;2;255;0;0m  Power  \x1b[49m\x1b[38;2;255;0;0m";
        const A: &'static str =
            "\x1b[38;2;0;0;0m\x1b[48;2;255;0;0m Activate\x1b[49m\x1b[38;2;255;0;0m";
        const X: &'static str =
            "\x1b[38;2;0;0;0m\x1b[48;2;255;0;0mAlt. Act.\x1b[49m\x1b[38;2;255;0;0m";

        let power01 = if data[0] == false { "  Power  " } else { P };
        let power02 = if data[1] == false { "  Power  " } else { P };
        let power03 = if data[2] == false { "  Power  " } else { P };
        let power04 = if data[3] == false { "  Power  " } else { P };
        let power05 = if data[4] == false { "  Power  " } else { P };
        let power06 = if data[5] == false { "  Power  " } else { P };
        let power07 = if data[6] == false { "  Power  " } else { P };
        let power08 = if data[7] == false { "  Power  " } else { P };
        let power09 = if data[8] == false { "  Power  " } else { P };
        let power10 = if data[9] == false { "  Power  " } else { P };

        let activ01 = if data[10] == false { " Activate" } else { A };
        let activ02 = if data[11] == false { " Activate" } else { A };
        let activ03 = if data[12] == false { " Activate" } else { A };
        let activ04 = if data[13] == false { " Activate" } else { A };
        let activ05 = if data[14] == false { " Activate" } else { A };
        let activ06 = if data[15] == false { " Activate" } else { A };
        let activ07 = if data[16] == false { " Activate" } else { A };
        let activ08 = if data[17] == false { " Activate" } else { A };
        let activ09 = if data[18] == false { " Activate" } else { A };
        let activ10 = if data[19] == false { " Activate" } else { A };

        let altat01 = if data[20] == false { "Alt. Act." } else { X };
        let altat02 = if data[21] == false { "Alt. Act." } else { X };
        let altat03 = if data[22] == false { "Alt. Act." } else { X };
        let altat04 = if data[23] == false { "Alt. Act." } else { X };
        let altat05 = if data[24] == false { "Alt. Act." } else { X };
        let altat06 = if data[25] == false { "Alt. Act." } else { X };
        let altat07 = if data[26] == false { "Alt. Act." } else { X };
        let altat08 = if data[27] == false { "Alt. Act." } else { X };
        let altat09 = if data[28] == false { "Alt. Act." } else { X };
        let altat10 = if data[29] == false { "Alt. Act." } else { X };

        let d = if data[30] == false {
            "   Door  "
        } else {
            "\x1b[38;2;0;0;0m\x1b[48;2;255;0;0m   Door  \x1b[49m\x1b[38;2;255;0;0m"
        };
        let g = if data[31] == false {
            " Garbage "
        } else {
            "\x1b[38;2;0;0;0m\x1b[48;2;255;0;0m Garbage \x1b[49m\x1b[38;2;255;0;0m"
        };

        println!(
            "{TOPL}{TOPBOTTOM}{TOPM}{TOPBOTTOM}{TOPM}{TOPBOTTOM}{TOPM}{TOPBOTTOM}{TOPM}{TOPBOTTOM}{TOPM}{TOPBOTTOM}{TOPM}{TOPBOTTOM}{TOPM}{TOPBOTTOM}{TOPM}{TOPBOTTOM}{TOPM}{TOPBOTTOM}{TOPR}"
        );
        println!(
            "{LFRT} {} {LFRT} {} {LFRT} {} {LFRT} {} {LFRT} {} {LFRT} {} {LFRT} {} {LFRT} {} {LFRT} {} {LFRT} {} {LFRT}",
            self.names[0],
            self.names[1],
            self.names[2],
            self.names[3],
            self.names[4],
            self.names[5],
            self.names[6],
            self.names[7],
            self.names[8],
            self.names[9],
        );
        println!(
            "{LEFM}{TOPBOTTOM}{MIDD}{TOPBOTTOM}{MIDD}{TOPBOTTOM}{MIDD}{TOPBOTTOM}{MIDD}{TOPBOTTOM}{MIDD}{TOPBOTTOM}{MIDD}{TOPBOTTOM}{MIDD}{TOPBOTTOM}{MIDD}{TOPBOTTOM}{MIDD}{TOPBOTTOM}{RIGM}"
        );
        println!(
            "{LFRT} {power01} {LFRT} {power02} {LFRT} {power03} {LFRT} {power04} {LFRT} {power05} {LFRT} {power06} {LFRT} {power07} {LFRT} {power08} {LFRT} {power09} {LFRT} {power10} {LFRT}"
        );
        println!(
            "{LEFM}{TOPBOTTOM}{MIDD}{TOPBOTTOM}{MIDD}{TOPBOTTOM}{MIDD}{TOPBOTTOM}{MIDD}{TOPBOTTOM}{MIDD}{TOPBOTTOM}{MIDD}{TOPBOTTOM}{MIDD}{TOPBOTTOM}{MIDD}{TOPBOTTOM}{MIDD}{TOPBOTTOM}{RIGM}"
        );
        println!(
            "{LFRT} {activ01} {LFRT} {activ02} {LFRT} {activ03} {LFRT} {activ04} {LFRT} {activ05} {LFRT} {activ06} {LFRT} {activ07} {LFRT} {activ08} {LFRT} {activ09} {LFRT} {activ10} {LFRT}"
        );
        println!(
            "{LEFM}{TOPBOTTOM}{MIDD}{TOPBOTTOM}{MIDD}{TOPBOTTOM}{MIDD}{TOPBOTTOM}{MIDD}{TOPBOTTOM}{MIDD}{TOPBOTTOM}{MIDD}{TOPBOTTOM}{MIDD}{TOPBOTTOM}{MIDD}{TOPBOTTOM}{MIDD}{TOPBOTTOM}{RIGM}"
        );
        println!(
            "{LFRT} {altat01} {LFRT} {altat02} {LFRT} {altat03} {LFRT} {altat04} {LFRT} {altat05} {LFRT} {altat06} {LFRT} {altat07} {LFRT} {altat08} {LFRT} {altat09} {LFRT} {altat10} {LFRT}"
        );
        println!(
            "{LEFM}{TOPBOTTOM}{BOTM}{TOPBOTTOM}{BOTM}{TOPBOTTOM}{BOTM}{TOPBOTTOM}{BOTM}{TOPBOTTOM}{BOTM}{TOPBOTTOM}{BOTM}{TOPBOTTOM}{BOTM}{TOPBOTTOM}{MIDD}{TOPBOTTOM}{MIDD}{TOPBOTTOM}{RIGM}"
        );
        println!(
            "{LFRT}                                                                                               {LFRT} {d} {LFRT} {g} {LFRT}"
        );
        println!(
            "{BOTL}{TOPBOTTOM}{TPBT}{TOPBOTTOM}{TPBT}{TOPBOTTOM}{TPBT}{TOPBOTTOM}{TPBT}{TOPBOTTOM}{TPBT}{TOPBOTTOM}{TPBT}{TOPBOTTOM}{TPBT}{TOPBOTTOM}{BOTM}{TOPBOTTOM}{BOTM}{TOPBOTTOM}{BOTR}"
        );
    }

    pub fn update_settings(&mut self) {
        match self.screen {
            FrontendScreen::Menu => {
                print!("\x1b[4A");
                std::io::stdout().flush().unwrap();
            }
            FrontendScreen::Settings => {
                print!("\x1b[7A");
                std::io::stdout().flush().unwrap();
            }
            _ => (),
        }
        self.screen = FrontendScreen::Settings;

        println!("{TOPL}{TOPBOTTOMREPM}{TOPR}");
        println!(
            "{LFRT}           R E S E T  {}  {LFRT}",
            if self.key_guide { "(Enter)" } else { "       " }
        );
        println!("{LEFM}{TOPBOTTOMREPM}{RIGM}");
        println!(
            "{LFRT}  Key Guide (=): {}           {LFRT}",
            if self.key_guide { "On " } else { "Off" }
        );
        println!("{LEFM}{TOPBOTTOMREPM}{RIGM}");
        println!(
            "{LFRT} {}: {} {LFRT}",
            if self.key_guide {
                "GUI Update (-)"
            } else {
                "    GUI Update"
            },
            if self.gui_update {
                "Wait for data"
            } else {
                "Instant      "
            }
        );
        println!("{BOTL}{TOPBOTTOMREPM}{BOTR}");
    }

    pub fn update_help(&mut self) {
        print!("\x1b[4A");
        std::io::stdout().flush().unwrap();
        self.screen = FrontendScreen::Help;

        println!("{TOPL}{TOPBOTTOMREPM}{TOPBOTTOMREPM}{TOPR}");
        println!("{LFRT} Change name:  1   2   3   4   5   6   7   8   9   0          {LFRT}");
        println!("{LFRT}       Power:  Q   W   E   R   T   Y   U   I   O   P          {LFRT}");
        println!("{LFRT}    Activate:  A   S   D   F   G   H   J   K   L   ;          {LFRT}");
        println!("{LFRT}   Alt. Act.:  Z   X   C   V   B   N   M   ,   .   /          {LFRT}");
        println!("{LFRT}        Door:  The Space button (trigger)                     {LFRT}");
        println!("{LFRT}     Garbage:  ' (apostraphe)                                 {LFRT}");
        println!("{LFRT}                                                              {LFRT}");
        println!("{LFRT} When the Key Guide setting is On, the control screen will    {LFRT}");
        println!("{LFRT} show P for Power, A for Activate, X for Alternate Activate,  {LFRT}");
        println!("{LFRT} D for Door, and G for Garbage.                               {LFRT}");
        println!("{BOTL}{TOPBOTTOMREPM}{TOPBOTTOMREPM}{BOTR}");
    }
}
