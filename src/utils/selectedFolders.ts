export function selectedFolder(files: {nombre: string, dir: boolean}[], setFolders: React.Dispatch<React.SetStateAction<string[]>>, setArchivos: React.Dispatch<React.SetStateAction<string[]>>) {
  const folders = files.filter(file => file.dir).map(file => file.nombre);
  const archivos = files.filter(file => !file.dir).map(file => file.nombre);

  setFolders(folders);
  setArchivos(archivos);
}