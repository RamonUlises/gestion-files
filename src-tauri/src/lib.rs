// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
mod commands;
mod utils;
use std::env;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
    .plugin(tauri_plugin_shell::init())
    .invoke_handler(tauri::generate_handler![
        commands::list_directory_contents,
        commands::get_root_path,
        commands::update_name_file,
        commands::obtener_selector,
        commands::pegar_archivo_carpeta,
        commands::eliminar_archivo_carpeta,
        commands::cortar_archivo_carpeta,
    ])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
