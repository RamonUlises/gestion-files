import { invoke } from "@tauri-apps/api/core";

export async function loadDirectory(path: string, setPath: React.Dispatch<React.SetStateAction<string>>, setFiles: React.Dispatch<React.SetStateAction<string[]>>) {
  if(path === "") return setPath(await invoke("get_root_path"));

  const filesDir: string[] = await invoke("list_directory_contents", {
    path,
  });

  setFiles(filesDir);
}