import { invoke } from "@tauri-apps/api/core";
import { loadDirectory } from "./loadDirectory";

export async function cortarPegarFunc(fileCortar: string, path: string, setCortar: React.Dispatch<React.SetStateAction<boolean>>, setFileCortar: React.Dispatch<React.SetStateAction<string>>, setPath: React.Dispatch<React.SetStateAction<string>>, setFiles: React.Dispatch<React.SetStateAction<{nombre: string, dir: boolean}[]>>) {
  const response = await invoke("cortar_archivo_carpeta", { rutaOrigen: fileCortar, rutaDestino: path });

  if(response === "Archivo cortado") {
    await loadDirectory(path, setPath, setFiles);
    setCortar(false);
    setFileCortar("");
  }
}