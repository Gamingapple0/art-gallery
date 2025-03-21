// Import the functions you need from the SDKs you need
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDtul5_tehDhP3t9jUexDKMM6vQ74H86XQ",
  authDomain: "art-gallery-57973.firebaseapp.com",
  projectId: "art-gallery-57973",
  storageBucket: "art-gallery-57973.firebasestorage.app",
  messagingSenderId: "883717001390",
  appId: "1:883717001390:web:d58ea3483ec84307865d3f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); 
export const db = getFirestore(app)
