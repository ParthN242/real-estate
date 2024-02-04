// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-9f5b2.firebaseapp.com",
  projectId: "real-estate-9f5b2",
  storageBucket: "real-estate-9f5b2.appspot.com",
  messagingSenderId: "249094455048",
  appId: "1:249094455048:web:57117ff03f6608bd2ab6bd",
  measurementId: "G-ZMJK18NC4P",
};

// Initialize Firebase
export default initializeApp(firebaseConfig);
