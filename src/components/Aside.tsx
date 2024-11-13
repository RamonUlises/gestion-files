import { invoke } from "@tauri-apps/api/core";
import { loadDirectory } from "../utils/loadDirectory";

export const Aside = ({
  path,
  nextPath,
  setNextPath,
  setPath,
  selector,
  setFiles,
  setRenember,
  setValueRenember,
}: {
  path: string;
  nextPath: string[];
  setNextPath: React.Dispatch<React.SetStateAction<string[]>>;
  setPath: React.Dispatch<React.SetStateAction<string>>;
  selector: string;
  setFiles: React.Dispatch<React.SetStateAction<{nombre: string; dir: boolean}[]>>;
  setRenember: React.Dispatch<React.SetStateAction<{ visible: boolean; folder: string | null }>>;
  setValueRenember: React.Dispatch<React.SetStateAction<string>>;
}) => {
  function copiPath() {
    navigator.clipboard.writeText(path);
  }

  function lastPathFunc() {
    if (path === selector) return;
    setNextPath([...nextPath, path]);
    setPath(path.slice(0, path.lastIndexOf(selector)));
  }

  function nextPathFun() {
    if (nextPath.length === 0) return;
    setPath(nextPath[nextPath.length - 1]);
    setNextPath(nextPath.slice(0, nextPath.length - 1));
  }

  async function crearCarpeta() {
    const res = (await invoke("crear_carpeta", { ruta: path })) as string;
    const [status, name] = res.split(":");
    if(status === "Carpeta creada") {
      loadDirectory(path, setPath, setFiles);
    }

    setRenember({ visible: true, folder: name });
    setValueRenember(name);
  }

  async function crearArchivo() {
    const res = (await invoke("crear_archivo", { ruta: path })) as string;
    const [status, name] = res.split(":");
    if(status === "Archivo creado") {
      loadDirectory(path, setPath, setFiles);
    }

    setRenember({ visible: true, folder: name });
    setValueRenember(name);
  }

  return (
    <aside >
      <div className="flex justify-evenly pt-2 gap-1 px-1">
        <button
          disabled={path === selector}
          onClick={lastPathFunc}
          className="bg-zinc-800 text-white w-8 h-8 flex justify-center items-center rounded disabled:bg-zinc-600"
        >
          {"<"}
        </button>
        <button
          disabled={nextPath.length === 0}
          onClick={nextPathFun}
          className="bg-zinc-800 text-white w-8 h-8 flex justify-center items-center rounded disabled:bg-zinc-600"
        >
          {">"}
        </button>
        <div className="bg-zinc-800 text-white flex justify-start items-center rounded w-full px-4 text-sm">
          {path}
        </div>

        <button
          onClick={copiPath}
          className="bg-zinc-800 text-white w-8 h-8 flex justify-center items-center rounded"
        >
          ⎘
        </button>
      </div>
      <div>
        <div className="my-1 w-full h-8 bg-zinc-800 mx-1 rounded-sm items-center flex px-4">
          <div className="dropdown relative inline-block">
            <button className="text-white text-sm">Nuevo</button>
            <div className="dropdown-content hidden flex-col absolute bg-slate-300 rounded-md overflow-hidden ">
              <button onClick={crearArchivo} className="text-black text-sm py-2 px-4 hover:bg-zinc-700 transition-colors duration-500 hover:text-white">Archivo</button>
              <button onClick={crearCarpeta} className="text-black text-sm py-2 px-4 hover:bg-zinc-700 transition-colors duration-500 hover:text-white">Carpeta</button>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
