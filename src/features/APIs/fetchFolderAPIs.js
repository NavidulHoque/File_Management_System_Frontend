import { query, where, getDocs } from "firebase/firestore";
import collectionFolders from './../../functions/collectionFolders';

export default async function fetchFolderAPIs(userID) {

    const q = query(collectionFolders(), where("userID", "==", userID))
    const querySnapshot = await getDocs(q)
    const folders = []
    let data = ''

    querySnapshot.forEach((doc) => {

        data = doc.data()
        data.folderID = doc.id
        folders.push(data)

    })

    return folders
} 