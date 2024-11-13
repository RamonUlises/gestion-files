import { invoke } from "@tauri-apps/api/core";
import { loadDirectory } from "./loadDirectory";

export async function borrarFunc(file: string, path: string, selector: string, setPath: React.Dispatch<React.SetStateAction<string>>, setFiles: React.Dispatch<React.SetStateAction<{nombre: string, dir: boolean}[]>>) {
  const ruta = path + selector + file;
  const result = await invoke("eliminar_archivo_carpeta", { ruta });

  if(result === true) {
    loadDirectory(path, setPath, setFiles);
  }
}