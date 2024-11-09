import { invoke } from "@tauri-apps/api/core";

export const getSelector = async () => {
  const res: string[] = await invoke("obtener_selector");
  return res[0];
}