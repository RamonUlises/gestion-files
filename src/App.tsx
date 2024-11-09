import { useEffect, useRef, useState } from "react";

import { Aside } from "./components/Aside";
import { FolderIcon } from "./components/FolderIcon";
import { Navbar } from "./components/Navbar";

import { loadDesktopDirectory } from "./utils/loadDesktop";
import { moveDirectory } from "./utils/moveDirectory";
import { selectedFolder } from "./utils/selectedFolders";
import { loadDirectory } from "./utils/loadDirectory";

import "./App.css";
import { optionsFolder } from "./utils/optionsFolder";
import { handleClickOutside } from "./utils/handleClickOutside";
import { activeRenember } from "./utils/activeRenember";
import { invoke } from "@tauri-apps/api/core";
import { pegarFunc } from "./utils/pegarFunc";
import { copiarFunc } from "./utils/copiarFunc";
import { borrarFunc } from "./utils/borrarFunc";
import { cortarFunc } from "./utils/cortarFunc";

function App() {
  const [path, setPath] = useState<string>("");
  const [files, setFiles] = useState<string[]>([]);
  const [Folders, setFolders] = useState<string[]>([]);
  const [nextPath, setNextPath] = useState<string[]>([]);

  const [contextMenu, setContextMenu] = useState<{ visible: boolean, x: number, y: number, folder: string | null}>({ visible: false, x: 0, y: 0, folder: null });

  const [renember, setRenember] = useState<{ visible: boolean, folder: string | null }>({ visible: false, folder: null });
  const [valueRenember, setValueRenember] = useState<string>("");

  const foldersRef = useRef<Record<string, HTMLDivElement | null>>({});

  const [folderSelected, setFolderSelected] = useState<string>("");

  const [selector, setSelector] = useState<string>("");

  const [fileCortar, setFileCortar] = useState<string>("");
  const [cortar, setCortar] = useState<boolean>(false);

  useEffect(() => {
    loadDesktopDirectory(setPath, setFiles);
    selectedFolder(files, setFolders);

    const fetchSelector = async () => {
      const res: string[] = await invoke("obtener_selector");
      setSelector(res[0]);
    };

    fetchSelector();
  }, []);

  useEffect(() => {
    loadDirectory(path, setPath, setFiles);
    setFolderSelected("");
  }, [path]);

  useEffect(() => {
    selectedFolder(files, setFolders);
    setFolderSelected("");
  }, [files]);

  useEffect(() => {
    const handleKeyDown = async (event: KeyboardEvent) => {
      if(event.ctrlKey && event.key === "c") {
        event.preventDefault();
        await copiarFunc(folderSelected, path, selector, setCortar);
      }
      
      if(event.ctrlKey && event.key === "v") {
        event.preventDefault();
        if(cortar || fileCortar !== "") {
          await cortarPegarFunc();
        } else {
          await pegarFunc(path, setPath, setFiles);
        }
      }

      if(event.ctrlKey && event.key === "x") {
        event.preventDefault();
        cortarFunc(folderSelected, path, setFileCortar, setCortar);
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    }
  }, [folderSelected]);

  async function cortarPegarFunc() {
    const response = await invoke("cortar_archivo_carpeta", { rutaOrigen: fileCortar, rutaDestino: path });

    if(response === "Archivo cortado") {
      await loadDirectory(path, setPath, setFiles);
      setCortar(false);
      setFileCortar("");
    }
  }

  return (
    <main onClick={(event) => handleClickOutside(event, renember, valueRenember, path, setPath, setFiles, setRenember, contextMenu, setContextMenu, folderSelected, setFolderSelected)} className="bg-gradient-to-tr to-slate-900 from-black w-screen h-screen m-0 p-0 overflow-hidden">
      <Aside setNextPath={setNextPath} nextPath={nextPath} path={path} setPath={setPath} selector={selector} />
      <section className="flex w-full h-full">
        <Navbar  path={path} setPath={setPath} selector="selector" />
        <div className="grid-res pt-4 pb-12 px-2 gap-2 w-full overflow-y-auto">
          {Folders.map((file) => {
            const text = file.length > 8 ? file.slice(0, 8) + "..." : file;
            return (
              <div
                data-name-folder={file}
                onClick={() => setFolderSelected(file)}
                onContextMenu={(e) => optionsFolder(e, file, foldersRef, setContextMenu, folderSelected, setFolderSelected)}
                onDoubleClick={() => moveDirectory(path, file, setPath, renember.visible)}
                key={file}
                ref={(element) => (foldersRef.current[file] = element!)}
                className={`folders flex flex-col justify-center items-start rounded p-2 w-full max-w-24 h-full max-h-24 cursor-pointer relative ${folderSelected === file && "bg-zinc-800"}`}
              >
                <FolderIcon />
                {
                  renember.visible && renember.folder === file ? (
                    <input
                      id="input-renember"
                      type="text"
                      value={valueRenember}
                      onChange={(e) => setValueRenember(e.target.value)}
                      className="w-full bg-white valid:text-black text-sm z-20 outline-none px-2"
                    />
                  ) : (
                    <p className="text-[12px] text-center w-full text-white">
                      {text}
                    </p>
                  )
                }
                {contextMenu.visible && contextMenu.folder === file && (
              <div
                className="flex flex-col bg-zinc-800 text-white absolute rounded-md overflow-hidden z-20"
                style={{ top: contextMenu.y - 20, left: contextMenu.x - 180 }}
              >
                <button onClick={() => activeRenember(file, setRenember, setValueRenember)} className="px-4 py-1 hover:bg-zinc-700 w-full text-start text-sm transition-colors duration-300 pr-12">
                  Renombrar
                </button>
                <button onClick={async () => await pegarFunc(path, setPath, setFiles)} className="px-4 py-1 hover:bg-zinc-700 w-full text-start text-sm transition-colors duration-300">
                  Pegar
                </button>
                <button onClick={async () => copiarFunc(folderSelected, path, selector, setCortar)} className="px-4 py-1 hover:bg-zinc-700 w-full text-start text-sm transition-colors duration-300">
                  Copiar
                </button>
                <button onClick={() => cortarFunc(file, path, setFileCortar, setCortar)} className="px-4 py-1 hover:bg-zinc-700 w-full text-start text-sm transition-colors duration-300">
                  Cortar
                </button>
                <button onClick={() => borrarFunc(file, path, selector, setPath, setFiles)} className="px-4 py-1 hover:bg-zinc-700 w-full text-start text-sm transition-colors duration-300">
                  Borrar
                </button>
              </div>
            )}
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}

export default App;
