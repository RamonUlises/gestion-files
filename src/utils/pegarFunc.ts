import { invoke } from "@tauri-apps/api/core";
import { loadDirectory } from "./loadDirectory";

export async function pegarFunc(
  path: string,
  setPath: React.Dispatch<React.SetStateAction<string>>,
  setFiles: React.Dispatch<React.SetStateAction<string[]>>
) {
  const rute = await navigator.clipboard.readText();

  if (rute == null) return;

  const result = await invoke("pegar_archivo_carpeta", {
    rutaActual: rute,
    nuevaRuta: path,
  });

  if (result === "Carpeta copiada") {
    loadDirectory(path, setPath, setFiles);
  }
}
