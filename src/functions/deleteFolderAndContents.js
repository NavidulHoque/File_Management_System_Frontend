import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../database/firebaseConfig";
import { deleteFile } from "../features/slices/fileSlice";
import { deleteFolder, updateFolder } from "../features/slices/folderSlice";

const foldersToBeDeleted = []
const filesToBeDeleted = []

export default async function deleteFolderAndContents(folderToBeDeleted, allFolders, dispatch) {

    // Delete all child files
    for (const fileID of folderToBeDeleted.childrenFiles) {

        filesToBeDeleted.push(fileID)

        await deleteDoc(doc(db, "files", fileID));

        dispatch(deleteFile(fileID))
    }

    //delete all child folders
    for (const folderID of folderToBeDeleted.childrenFolders) {

        foldersToBeDeleted.push(folderID)

        await deleteDoc(doc(db, "folders", folderID));

        dispatch(deleteFolder(folderID));
    }

    //finally delete the parent folder

    foldersToBeDeleted.push(folderToBeDeleted.folderID)

    await deleteDoc(doc(db, "folders", folderToBeDeleted.folderID))

    dispatch(deleteFolder(folderToBeDeleted.folderID))

    deletionOfFilesInAncestors(folderToBeDeleted, allFolders, dispatch)

    deletionOfFoldersInAncestors(folderToBeDeleted, allFolders, dispatch)
}

async function deletionOfFilesInAncestors(folderToBeDeleted, allFolders, dispatch) {

    let parentFolder = allFolders.find(folder => folder.folderID === folderToBeDeleted.parent)

    while (parentFolder !== undefined) {

        let childrenFiles = parentFolder.childrenFiles

        for (const fileID of filesToBeDeleted) {
            
            childrenFiles = childrenFiles.filter(fileId => fileId !== fileID)
        }

        const updatedParentFolder = {
            ...parentFolder,
            childrenFiles: childrenFiles
        };

        //updating in the firebase
        const folderRef = doc(db, 'folders', updatedParentFolder.folderID);

        await updateDoc(folderRef, {
            childrenFiles: childrenFiles
        })

        dispatch(updateFolder(updatedParentFolder))

        //if updatedParentFolder.parent is root then find method will return undefined
        parentFolder = allFolders.find(folder => folder.folderID === updatedParentFolder.parent)
    }
}

async function deletionOfFoldersInAncestors(folderToBeDeleted, allFolders, dispatch) {

    let parentFolder = allFolders.find(folder => folder.folderID === folderToBeDeleted.parent)

    while (parentFolder !== undefined) {

        let childrenFolders = parentFolder.childrenFolders

        for (const folderID of foldersToBeDeleted) {
            
            childrenFolders = childrenFolders.filter(folderId => folderId !== folderID)
        }

        const updatedParentFolder = {
            ...parentFolder,
            childrenFolders: childrenFolders
        };

        //updating in the firebase
        const folderRef = doc(db, 'folders', updatedParentFolder.folderID);

        await updateDoc(folderRef, {
            childrenFolders: childrenFolders
        })

        dispatch(updateFolder(updatedParentFolder))

        //if updatedParentFolder.parent is root then find method will return undefined
        parentFolder = allFolders.find(folder => folder.folderID === updatedParentFolder.parent)
    }
}