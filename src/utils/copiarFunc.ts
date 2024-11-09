export async function copiarFunc(folderSelected: string, path: string, selector: string, setCortar: React.Dispatch<React.SetStateAction<boolean>>) {
  if(folderSelected === "") return;
      
  setCortar(false);
  await navigator.clipboard.writeText(path + selector + folderSelected);
}