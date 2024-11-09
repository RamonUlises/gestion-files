export const Aside = ({ path, nextPath, setNextPath, setPath, selector } : { path: string, nextPath: string[]; setNextPath: React.Dispatch<React.SetStateAction<string[]>>; setPath: React.Dispatch<React.SetStateAction<string>>; selector: string }) => {

  function copiPath() {
    navigator.clipboard.writeText(path);
  }

  function lastPathFunc() {
    if(path === selector) return;
    setNextPath([...nextPath, path]);
    setPath(path.slice(0, path.lastIndexOf(selector)));
  }

  function nextPathFun() {
    if(nextPath.length === 0) return;
    setPath(nextPath[nextPath.length - 1]);
    setNextPath(nextPath.slice(0, nextPath.length - 1));
  }

  return (
    <aside className="flex justify-evenly pt-2 gap-1 px-1">
        <button disabled={path === selector} onClick={lastPathFunc} className="bg-zinc-800 text-white w-8 h-8 flex justify-center items-center rounded disabled:bg-zinc-600">
          {"<"}
        </button>
        <button disabled={nextPath.length === 0} onClick={nextPathFun} className="bg-zinc-800 text-white w-8 h-8 flex justify-center items-center rounded disabled:bg-zinc-600">
          {">"}
        </button>
        <div className="bg-zinc-800 text-white flex justify-start items-center rounded w-full px-4 text-sm">
          {path}
        </div>

        <button onClick={copiPath} className="bg-zinc-800 text-white w-8 h-8 flex justify-center items-center rounded">
          ⎘
        </button>
      </aside>
  );
};