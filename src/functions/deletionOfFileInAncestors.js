import { doc, updateDoc } from "firebase/firestore";
import { db } from "../database/firebaseConfig";
import { updateFolder } from "../features/slices/folderSlice";

//this function is used for only deletion of one file
export default async function deletionOfFileInAncestors(file, folders, dispatch) {

    let parentFolder = folders.find(folder => folder.folderID === file.parent)

    while (parentFolder !== undefined) {

        const updatedParentFolder = {
            ...parentFolder,
            childrenFiles: parentFolder.childrenFiles.filter(fileID => fileID !== file.fileID)
        };

        //updating in the firebase
        const folderRef = doc(db, 'folders', updatedParentFolder.folderID);

        await updateDoc(folderRef, {
            childrenFiles: parentFolder.childrenFiles.filter(fileID => fileID !== file.fileID)
        })

        dispatch(updateFolder(updatedParentFolder))

        //if updatedParentFolder.parent is root then find method will return undefined
        parentFolder = folders.find(folder => folder.folderID === updatedParentFolder.parent)
    }
}