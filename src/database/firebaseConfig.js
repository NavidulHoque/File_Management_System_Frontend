/* eslint-disable no-unused-vars */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCDcyLf3z6l2fpeW9ZEUiuY_7kI7xBNOkU",
  authDomain: "file-management-system-dd605.firebaseapp.com",
  projectId: "file-management-system-dd605",
  storageBucket: "file-management-system-dd605.appspot.com",
  messagingSenderId: "666451241210",
  appId: "1:666451241210:web:a91ac2efbf09ab40e10143"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default firebaseConfig