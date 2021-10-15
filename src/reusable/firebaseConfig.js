// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAmUQaKNNOG0N_20I8nh_o12EV3ouA94Z0",
  authDomain: "iclaim-firebase.firebaseapp.com",
  projectId: "iclaim-firebase",
  storageBucket: "iclaim-firebase.appspot.com",
  messagingSenderId: "93462340198",
  appId: "1:93462340198:web:90cf7921b33cf1f58d83a7",
  measurementId: "G-P38B3NMSV3"
};


// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseDB = getFirestore(firebaseApp);
export const analytics = getAnalytics(firebaseApp);
