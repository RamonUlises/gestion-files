import { activeRenember } from "../utils/activeRenember";
import { borrarFunc } from "../utils/borrarFunc";
import { copiarFunc } from "../utils/copiarFunc";
import { cortarFunc } from "../utils/cortarFunc";
import { pegarFunc } from "../utils/pegarFunc";

export const MostrarFolders = ({
  contextMenu,
  setRenember,
  setValueRenember,
  file,
  path,
  setPath,
  setFiles,
  folderSelected,
  selector,
  setCortar,
  setFileCortar,
}: {
  contextMenu: { x: number; y: number };
  setRenember: React.Dispatch<React.SetStateAction<{ visible: boolean; folder: string | null }>>;
  setValueRenember: React.Dispatch<React.SetStateAction<string>>;
  file: string;
  path: string;
  setPath: React.Dispatch<React.SetStateAction<string>>;
  setFiles: React.Dispatch<React.SetStateAction<{ nombre: string; dir: boolean }[]>>;
  folderSelected: string;
  selector: string;
  setCortar: React.Dispatch<React.SetStateAction<boolean>>;
  setFileCortar: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <>
      <div
        className="flex flex-col bg-zinc-800 text-white absolute rounded-md overflow-hidden z-20"
        style={{ top: contextMenu.y - 20, left: contextMenu.x - 180 }}
      >
        <button
          onClick={() => activeRenember(file, setRenember, setValueRenember)}
          className="px-4 py-1 hover:bg-zinc-700 w-full text-start text-sm transition-colors duration-300 pr-12"
        >
          Renombrar
        </button>
        <button
          onClick={async () => await pegarFunc(path, setPath, setFiles)}
          className="px-4 py-1 hover:bg-zinc-700 w-full text-start text-sm transition-colors duration-300"
        >
          Pegar
        </button>
        <button
          onClick={async () =>
            copiarFunc(folderSelected, path, selector, setCortar)
          }
          className="px-4 py-1 hover:bg-zinc-700 w-full text-start text-sm transition-colors duration-300"
        >
          Copiar
        </button>
        <button
          onClick={() => cortarFunc(file, path, setFileCortar, setCortar)}
          className="px-4 py-1 hover:bg-zinc-700 w-full text-start text-sm transition-colors duration-300"
        >
          Cortar
        </button>
        <button
          onClick={() => borrarFunc(file, path, selector, setPath, setFiles)}
          className="px-4 py-1 hover:bg-zinc-700 w-full text-start text-sm transition-colors duration-300"
        >
          Borrar
        </button>
      </div>
    </>
  );
};
