export function selectedFolder(files: string[], setFolders: React.Dispatch<React.SetStateAction<string[]>>) {
  const folders = files.filter((file) => {
    return file.indexOf(".") === -1;
  });

  setFolders(folders);
}