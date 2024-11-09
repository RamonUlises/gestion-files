export const activeRenember = (folder: string, setRenember: React.Dispatch<React.SetStateAction<{
  visible: boolean;
  folder: string | null;
}>>, setValueRenember: React.Dispatch<React.SetStateAction<string>>) => {
  setRenember({ visible: true, folder: folder });
  setValueRenember(folder);
};