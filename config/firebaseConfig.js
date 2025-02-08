// config/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBJ7pPYY59zlWQrxDRvo2k99Vmb_HXnVBE",
    authDomain: "auth-sna.firebaseapp.com",
    projectId: "auth-sna",
    storageBucket: "auth-sna.firebasestorage.app",
    messagingSenderId: "136081837897",
    appId: "1:136081837897:web:b02bf016e7273470cd9498",
    measurementId: "G-MX027S1BB4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();