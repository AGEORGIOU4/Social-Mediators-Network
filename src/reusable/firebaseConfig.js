// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAllKF7nZnDeKqbOqvb3hIlHvn6OKG4KBE",
  authDomain: "dev-iclaim.firebaseapp.com",
  databaseURL: "https://dev-iclaim-default-rtdb.firebaseio.com",
  projectId: "dev-iclaim",
  storageBucket: "dev-iclaim.appspot.com",
  messagingSenderId: "957478376950",
  appId: "1:957478376950:web:58ce24bffe4c846726a3d7"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseDB = getFirestore(firebaseApp);
