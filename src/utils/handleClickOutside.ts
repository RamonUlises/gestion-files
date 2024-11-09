import { invoke } from "@tauri-apps/api/core";
import { loadDirectory } from "./loadDirectory";

import { getSelector } from "./getSelector";

const selector = await getSelector();

export const handleClickOutside = async (
  event: React.MouseEvent<HTMLElement, MouseEvent>,
  renember: { visible: boolean; folder: string | null },
  valueRenember: string,
  path: string,
  setPath: React.Dispatch<React.SetStateAction<string>>,
  setFiles: React.Dispatch<React.SetStateAction<string[]>>,
  setRenember: React.Dispatch<
    React.SetStateAction<{
      visible: boolean;
      folder: string | null;
    }>
  >,
  contextMenu: {
    visible: boolean;
    x: number;
    y: number;
    folder: string | null;
  },
  setContextMenu: React.Dispatch<
    React.SetStateAction<{
      visible: boolean;
      x: number;
      y: number;
      folder: string | null;
    }>>,
  folderSelected: string,
  setFolderSelected: React.Dispatch<React.SetStateAction<string>
  >
) => {
  if (renember.visible) {
    if (valueRenember === "") return;
    if ((event.target as HTMLElement).matches("#input-renember")) return;
    const lastPath = path + selector + renember.folder;
    const newPath = path + selector + valueRenember;
    const res = await invoke("update_name_file", {
      rutaActual: lastPath,
      nuevaRuta: newPath,
    });

    if (res === "Archivo renombrado") {
      loadDirectory(path, setPath, setFiles);
    }
    setRenember({ visible: false, folder: null });
  }

  if (contextMenu.visible) {
    setContextMenu({ visible: false, x: 0, y: 0, folder: null });
  }

  if (folderSelected !== "" && !((event.target as HTMLElement).matches(".folders") || (event.target as HTMLElement).matches(".folders *"))) {
    setFolderSelected("");
  }
};
