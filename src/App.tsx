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
import { invoke } from "@tauri-apps/api/core";
import { pegarFunc } from "./utils/pegarFunc";
import { copiarFunc } from "./utils/copiarFunc";
import { cortarFunc } from "./utils/cortarFunc";
import { cortarPegarFunc } from "./utils/cortarPegarFunc";
import { MostrarFolders } from "./components/MostrarFolders";
import { GetIconExt } from "./components/GetIconExt";

function App() {
  const [path, setPath] = useState<string>("");
  const [files, setFiles] = useState<{nombre: string, dir: boolean}[]>([]);
  const [Folders, setFolders] = useState<string[]>([]);
  const [archivos, setArchivos] = useState<string[]>([]);
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
    selectedFolder(files, setFolders, setArchivos);

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
    selectedFolder(files, setFolders, setArchivos);
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
          await cortarPegarFunc(fileCortar, path, setCortar, setFileCortar, setPath, setFiles);
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

  return (
    <main onClick={(event) => handleClickOutside(event, renember, valueRenember, path, setPath, setFiles, setRenember, contextMenu, setContextMenu, folderSelected, setFolderSelected)} className="bg-gradient-to-tr to-slate-900 from-black w-screen h-screen m-0 p-0 overflow-hidden">
      <Aside setNextPath={setNextPath} nextPath={nextPath} path={path} setPath={setPath} selector={selector} setFiles={setFiles} setRenember={setRenember} setValueRenember={setValueRenember} />
      <section className="flex w-full h-full">
        <Navbar  path={path} setPath={setPath} selector="selector" />
        <div className="grid-res pt-4 pb-12 px-2 gap-2 w-full overflow-y-auto">
          {Folders.map((file) => {
            const text = file.length > 8 ? file.slice(0, 8) + "..." : file;
            return (
              <div
                data-name-folder={file}
                onClick={() => setFolderSelected(file)}
                onContextMenu={(e) => optionsFolder(e, file, foldersRef, setContextMenu, setFolderSelected)}
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
              <MostrarFolders contextMenu={contextMenu} setRenember={setRenember} setValueRenember={setValueRenember} file={file} path={path} setPath={setPath} setFiles={setFiles} folderSelected={folderSelected} selector={selector} setCortar={setCortar} setFileCortar={setFileCortar} />
            )}
              </div>
            );
          })}
          {archivos.map((file) => {
            const text = file.length > 8 ? file.slice(0, 8) + "..." : file;
            return (
              <div
                data-name-folder={file}
                onClick={() => setFolderSelected(file)}
                onContextMenu={(e) => optionsFolder(e, file, foldersRef, setContextMenu, setFolderSelected)}
                key={file}
                ref={(element) => (foldersRef.current[file] = element!)}
                className={`folders flex flex-col justify-center items-start rounded p-2 w-full max-w-24 h-full max-h-24 cursor-pointer relative ${folderSelected === file && "bg-zinc-800"}`}
              >
                <GetIconExt fileName={file} path={path} />
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
              <MostrarFolders contextMenu={contextMenu} setRenember={setRenember} setValueRenember={setValueRenember} file={file} path={path} setPath={setPath} setFiles={setFiles} folderSelected={folderSelected} selector={selector} setCortar={setCortar} setFileCortar={setFileCortar} />
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
