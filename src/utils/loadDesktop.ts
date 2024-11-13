import { invoke } from "@tauri-apps/api/core";
import { desktopDir } from "@tauri-apps/api/path";

export async function loadDesktopDirectory(setPath: React.Dispatch<React.SetStateAction<string>>, setFiles: React.Dispatch<React.SetStateAction<{nombre: string, dir: boolean}[]>>) {
  const desktopPath = await desktopDir();
  setPath(desktopPath);

  const filesDir: {nombre: string, dir: boolean}[] = await invoke("list_directory_contents", {
    path: desktopPath,
  });

  setFiles(filesDir);
}