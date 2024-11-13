import { getSelector } from "./getSelector";


export const cortarFunc = async (file: string, path: string, setFileCortar: React.Dispatch<React.SetStateAction<string>>, setCortar: React.Dispatch<React.SetStateAction<boolean>>) => {
  const selector = await getSelector();
  const rute = path + selector + file;
  setFileCortar(rute);
  setCortar(true);
}
