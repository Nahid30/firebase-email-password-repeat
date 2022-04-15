// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBtSlA4_6cApnqj-AHlbRWqgNobOlIcLHc",
  authDomain: "email-password-auth-repeat.firebaseapp.com",
  projectId: "email-password-auth-repeat",
  storageBucket: "email-password-auth-repeat.appspot.com",
  messagingSenderId: "329136269315",
  appId: "1:329136269315:web:a5ce427ea2c148346dc636"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;