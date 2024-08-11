import { doc, updateDoc } from "firebase/firestore";
import { updateFolder } from "../features/slices/folderSlice";
import { db } from "../database/firebaseConfig";

//when creating a file
export default async function updatingChildrenFiles(fileInfo, folders, dispatch) {

    let parentFolder = folders.find(folder => folder.folderID === fileInfo.parent)

    while (parentFolder) {

        const updatedParentFolder = {
            ...parentFolder,
            childrenFiles: [...parentFolder.childrenFiles, fileInfo.fileID]
        };

        //updating in the firebase
        const folderRef = doc(db, 'folders', updatedParentFolder.folderID);

        await updateDoc(folderRef, {
            childrenFiles: [...parentFolder.childrenFiles, fileInfo.fileID]
        })

        dispatch(updateFolder(updatedParentFolder))

        parentFolder = folders.find(folder => folder.folderID === parentFolder.parent)
    }
}