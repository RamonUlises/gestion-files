import { desktopDir, homeDir, documentDir, downloadDir, pictureDir, audioDir } from "@tauri-apps/api/path";
import { invoke } from "@tauri-apps/api/core";

export const Navbar = ({ path, setPath, selector }: { path: string; setPath: React.Dispatch<React.SetStateAction<string>>; selector: string}) => {
  return (
    <nav className="text-white bg-zinc-900 h-full overflow-y-auto w-40">
          <ul className="flex flex-col gap-2 py-6 text-sm">
            <li onClick={async () => setPath(await homeDir())} className={`hover:bg-zinc-800 px-8 py-2 cursor-pointer transition-colors duration-500 rounded-xl ${path.includes("home") && !path.includes("Desktop") && !path.includes("Documents") && !path.includes("Downloads") && !path.includes("Music")&& !path.includes("Pictures") &&  "bg-zinc-800"}`}>Home</li>
            <li onClick={async () => setPath(await desktopDir())} className={`hover:bg-zinc-800 px-8 py-2 cursor-pointer transition-colors duration-500 rounded-xl ${path.includes("Desktop") && "bg-zinc-800"}`}>Desktop</li>
            <li onClick={async () => setPath(await documentDir())} className={`hover:bg-zinc-800 px-8 py-2 cursor-pointer transition-colors duration-500 rounded-xl ${path.includes("Documents") && "bg-zinc-800"}`}>Documents</li>
            <li onClick={async () => setPath(await downloadDir())} className={`hover:bg-zinc-800 px-8 py-2 cursor-pointer transition-colors duration-500 rounded-xl ${path.includes("Downloads") && "bg-zinc-800"}`}>Downloads</li>
            <li onClick={async () => setPath(await audioDir())} className={`hover:bg-zinc-800 px-8 py-2 cursor-pointer transition-colors duration-500 rounded-xl ${path.includes("Music") && "bg-zinc-800"}`}>Music</li>
            <li onClick={async () => setPath(await pictureDir())} className={`hover:bg-zinc-800 px-8 py-2 cursor-pointer transition-colors duration-500 rounded-xl ${path.includes("Pictures") && "bg-zinc-800"}`}>Pictures</li>
          </ul>
          <h3 className="ml-3 text-sm">Drivers</h3>
          <ul className="flex flex-col gap-2 py-6 text-sm">
            <li onClick={async () => setPath(await invoke("get_root_path"))} className={`hover:bg-zinc-800 px-8 py-2 cursor-pointer transition-colors duration-500 rounded-xl ${path === selector && "bg-zinc-800"}`}>Computer</li>
          </ul>
        </nav>
  );
};
