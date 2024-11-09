import { getSelector } from "./getSelector";

const selector = await getSelector();

export const cortarFunc = (file: string, path: string, setFileCortar: React.Dispatch<React.SetStateAction<string>>, setCortar: React.Dispatch<React.SetStateAction<boolean>>) => {
  const rute = path + selector + file;
  setFileCortar(rute);
  setCortar(true);
}
