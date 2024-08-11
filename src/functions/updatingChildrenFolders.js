import { doc, updateDoc } from "firebase/firestore";
import { updateFolder } from "../features/slices/folderSlice";
import { db } from "../database/firebaseConfig";

//when creating a folder
export default async function updatingChildrenFolders(folderInfo, folders, dispatch) {

    let parentFolder = folders.find(folder => folder.folderID === folderInfo.parent)

    while (parentFolder) {

        const updatedParentFolder = {
            ...parentFolder,
            childrenFolders: [...parentFolder.childrenFolders, folderInfo.folderID]
        };

        //updating in the firebase
        const folderRef = doc(db, 'folders', updatedParentFolder.folderID);

        await updateDoc(folderRef, {
            childrenFolders: [...parentFolder.childrenFolders, folderInfo.folderID]
        })

        dispatch(updateFolder(updatedParentFolder))

        parentFolder = folders.find(folder => folder.folderID === parentFolder.parent)
    }
}

