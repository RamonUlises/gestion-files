use std::fs;
use std::path::{Path, PathBuf, MAIN_SEPARATOR };

use crate::utils::copy_dir;

#[tauri::command]
pub fn list_directory_contents(path: String) -> Result<Vec<String>, String> {
    let path_buf = PathBuf::from(path);
    
    if path_buf.exists() && path_buf.is_dir() {
        let entries = fs::read_dir(path_buf)
            .map_err(|e| e.to_string())?
            .filter_map(|entry| entry.ok())
            .filter_map(|entry| entry.path().file_name().map(|name| name.to_string_lossy().to_string()))
            .collect();
        Ok(entries)
    } else {
        Err("Path does not exist".into())
    }
}

#[tauri::command]
pub fn get_root_path() -> String {
    if cfg!(target_os = "windows") {
        "C:\\".to_string()
    } else {
        "/".to_string()
    }
}

#[tauri::command]
pub fn update_name_file(ruta_actual: String, nueva_ruta: String) -> String {
    match fs::rename(ruta_actual, nueva_ruta) {
        Ok(_) => "Archivo renombrado".to_string(),
        Err(e) => e.to_string()   
    }
}

#[tauri::command]
pub fn obtener_selector() -> char {
    MAIN_SEPARATOR
}

#[tauri::command]
pub fn pegar_archivo_carpeta(ruta_actual: String, nueva_ruta: String) -> String {
    let path_origen = Path::new(&ruta_actual);
    let path_destino = Path::new(&nueva_ruta);

    if !path_origen.exists() {
        return "El archivo o carpeta no existe".to_string();
    }

    let mut destino_completo = PathBuf::from(path_destino);
    destino_completo.push(path_origen.file_name().unwrap());

    let mut contador = 1;

    while destino_completo.exists() {
        let mut new_name = destino_completo.clone();
        let file_stem = path_origen.file_stem().unwrap().to_str().unwrap();

        if path_origen.is_file() {
            let extension = path_origen.extension().unwrap_or_default();
            let new_name_string = format!("{} copia {}", file_stem, contador);
            new_name.set_file_name(format!("{}.{:?}", new_name_string, extension));
        } else {
            let new_name_string = format!("{} copia {}", file_stem, contador);
            new_name.set_file_name(new_name_string);
        }

        destino_completo = new_name;
        contador += 1;
    }

    if path_origen.is_file() {
        match fs::copy(path_origen, &destino_completo) {
            Ok(_) => "Archivo copiado".to_string(),
            Err(e) => e.to_string()
        }
    } else if path_origen.is_dir() {
        if let Err(e) = copy_dir(path_origen, &destino_completo) {
            e.to_string()
        } else {
            "Carpeta copiada".to_string()
        }
    } else {
        "No se pudo copiar".to_string()
    }
}

#[tauri::command]
pub fn eliminar_archivo_carpeta(ruta: String) -> bool {
    let path = Path::new(&ruta);

    if !path.exists() {
        return false;
    }

    if path.is_file() {
        match fs::remove_file(path) {
            Ok(_) => true,
            Err(e) => {
                eprintln!("{}", e);
                false
            }
        }
    } else if path.is_dir() {
        match fs::remove_dir_all(path) {
            Ok(_) => true,
            Err(e) => {
                eprintln!("{}", e);
                false
            }
        }
    } else {
        false
    }
}

#[tauri::command]
pub fn cortar_archivo_carpeta(ruta_origen: String, ruta_destino: String) -> String {
    print!("{} {}", ruta_origen, ruta_destino);
    let path_origen = Path::new(&ruta_origen);
    let path_destino = Path::new(&ruta_destino);

    if !path_origen.exists() {
        return "El archivo o carpeta no existe".to_string();
    }

    if !path_destino.exists() {
        return "La carpeta de destino no existe".to_string();
    }

    let mut destino_completo = PathBuf::from(path_destino);
    destino_completo.push(path_origen.file_name().unwrap());

    match fs::rename(path_origen, &destino_completo) {
        Ok(_) => "Archivo cortado".to_string(),
        Err(e) => {
            eprintln!("{}", e);
            e.to_string()
        }
        
    }
}