import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore"


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDpD8ry5MlyuObSplWE9je5dTOen4gt2H4",
  authDomain: "react-firebase-crud-39292.firebaseapp.com",
  projectId: "react-firebase-crud-39292",
  storageBucket: "react-firebase-crud-39292.appspot.com",
  messagingSenderId: "82567565515",
  appId: "1:82567565515:web:b60f05bcb373f43ca08b4e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
