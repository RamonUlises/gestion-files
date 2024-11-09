export const optionsFolder = (
  e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  folderName: string,
  foldersRef: React.MutableRefObject<Record<string, HTMLDivElement | null>>,
  setContextMenu: React.Dispatch<
    React.SetStateAction<{
      visible: boolean;
      x: number;
      y: number;
      folder: string | null;
    }>
  >,
  folderSelected: string,
  setFolderSelected: React.Dispatch<React.SetStateAction<string>>
) => {
  e.preventDefault();
  e.stopPropagation();

  if (!foldersRef.current || !foldersRef.current[folderName]) return;

  const folderElement = foldersRef.current[folderName];

  if (!folderElement) return;

  const { nameFolder } = folderElement.dataset;
  
  if (!nameFolder) return;

  setFolderSelected(nameFolder);

  if(folderSelected !== folderName) return;

  setContextMenu({
    visible: true,
    x: 254,
    y: 56,
    folder: folderName,
  });
};
