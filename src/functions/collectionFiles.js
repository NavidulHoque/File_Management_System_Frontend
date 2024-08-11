import { collection } from "firebase/firestore";
import { db } from "../database/firebaseConfig";

export default function collectionFiles() {
    return collection(db, "files")
}