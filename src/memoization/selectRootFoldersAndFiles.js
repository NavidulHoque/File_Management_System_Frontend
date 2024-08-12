import { createSelector } from 'reselect';

const selectFolders = (state) => state.Folders.folders;
const selectFiles = (state) => state.Files.files;

export const selectRootFolders = createSelector(
  [selectFolders],
  (folders) => folders.filter(folder => folder.parent === "root")
);

export const selectRootFiles = createSelector(
  [selectFiles],
  (files) => files.filter(file => file.parent === "root")
);
