import { collection } from "firebase/firestore";
import { db } from "../database/firebaseConfig";

export default function collectionFolders() {
    return collection(db, "folders")
}