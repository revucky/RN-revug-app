// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";
// TODO: додайте пакети SDK для продуктів Firebase, які ви хочете використовувати
// https://firebase.google.com/docs/web/setup#available-libraries

// Конфігурація Firebase вашого веб-програми
// Для Firebase JS SDK версії 7.20.0 і пізніших версій вимірювання Id є необов'язковим
const firebaseConfig = {
  apiKey: "AIzaSyClkcq2BgPODIcqjwR-Bao-czHubGHjbgE",
  authDomain: "firstpr-rn.firebaseapp.com",
  projectId: "firstpr-rn",
  storageBucket: "firstpr-rn.appspot.com",
  messagingSenderId: "226875722252",
  appId: "1:226875722252:web:54abf0f6646763011e7c29",
  measurementId: "G-T2NX3SNBWV",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
