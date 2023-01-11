// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCjAaXOnT5bM8TvMIyAv7TY-i6amDZZqzY",
  authDomain: "auth-v2-bc914.firebaseapp.com",
  projectId: "auth-v2-bc914",
  storageBucket: "auth-v2-bc914.appspot.com",
  messagingSenderId: "462199004516",
  appId: "1:462199004516:web:c97ade8e97bdbc7b59ae71"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db =getFirestore(app);
export const auth = getAuth(app);
