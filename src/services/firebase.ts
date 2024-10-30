// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCNJadd5xrlEDyxdTRBnXGAH4K95N-R5hk",
  authDomain: "task-list-app-935cb.firebaseapp.com",
  projectId: "task-list-app-935cb",
  storageBucket: "task-list-app-935cb.appspot.com",
  messagingSenderId: "291574937518",
  appId: "1:291574937518:web:a828989976c47b37327a3f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);