import { createSelector } from 'reselect';

const selectFolders = (state) => state.Folders.folders;
const selectFiles = (state) => state.Files.files;
const selectCurrentFolder = (state) => state.Folders.currentFolder

export const selectFoldersOfCurrentFolder = createSelector(
  [selectFolders, selectCurrentFolder],
  (folders, currentFolder) => folders.filter(folder => folder.parent === currentFolder)
);

export const selectFilesOfCurrentFolder = createSelector(
  [selectFiles, selectCurrentFolder],
  (files, currentFolder) => files.filter(file => file.parent === currentFolder)
);
