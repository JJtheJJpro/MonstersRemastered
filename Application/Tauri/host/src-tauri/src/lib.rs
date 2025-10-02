use serial2::SerialPort;
use std::sync::mpsc::{self, Sender};
use tauri::{Builder, Manager, State};

struct AppData {
    sp: Option<SerialPort>,
    tx: Option<Sender<String>>,
}

#[tauri::command]
fn frontend_loaded(state: State<'_, AppData>) {

}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    Builder::default()
        .setup(|app| {
            let (tx, rx) = mpsc::channel();

            app.manage(AppData { sp: None, tx: Some(tx) });

            match rx.recv() {
                Ok(v) => {
                    
                }
                Err(e) => {

                }
            }

            Ok(())
        })
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![frontend_loaded])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
