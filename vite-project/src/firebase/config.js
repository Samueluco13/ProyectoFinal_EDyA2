import {getAuth, GoogleAuthProvider} from 'firebase/auth'
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAPNnKK-CK1WDumRHg_b4Ycu05lW_2ChHQ",
    authDomain: "prueba-1-da21a.firebaseapp.com",
    projectId: "prueba-1-da21a",
    storageBucket: "prueba-1-da21a.firebasestorage.app",
    messagingSenderId: "523391849954",
    appId: "1:523391849954:web:1c1c9ece7db3c000af55bb",
    measurementId: "G-299MQF51HL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
const auth = getAuth();
const db = getFirestore(app);


export {app, auth, provider, db};