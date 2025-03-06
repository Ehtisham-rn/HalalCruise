// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB7eXFp1NoYkcAj0t8MbTSX8X-ew_eFXeo",
  authDomain: "unilink-72197.firebaseapp.com",
  projectId: "unilink-72197",
  storageBucket: "unilink-72197.appspot.com",
  messagingSenderId: "48354191648",
  appId: "1:48354191648:web:3941a10274a1e6a5584f45",
  measurementId: "G-0JGNEXPR2F",
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_STORAGE = getStorage(FIREBASE_APP);

// You can now use FIREBASE_STORAGE to interact with Firebase Storage
// For example:
// const storageRef = ref(FIREBASE_STORAGE, 'path/to/file');
// const downloadUrl = await getDownloadURL(storageRef);
