import { join } from "@tauri-apps/api/path";

export async function moveDirectory(path: string, file: string, setPath: React.Dispatch<React.SetStateAction<string>>, edit: boolean) {
  if(edit) return;

  const newPath = await join(path, file);
  setPath(newPath);
}