import { query, where, getDocs } from "firebase/firestore";
import collectionFiles from './../../functions/collectionFiles';

export default async function fetchFileAPIs(userID) {

    const q = query(collectionFiles(), where("userID", "==", userID))
    const querySnapshot = await getDocs(q)
    const files = []
    let data = ''

    querySnapshot.forEach((doc) => {

        data = doc.data()
        data.fileID = doc.id
        files.push(data)
    })

    return files
} 