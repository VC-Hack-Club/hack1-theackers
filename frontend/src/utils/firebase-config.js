// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAMW3w7aQXrB-EiJ6ZTkGqhKLnGvuOxFBE",
  authDomain: "homeless-8b5fa.firebaseapp.com",
  databaseURL: "https://homeless-8b5fa-default-rtdb.firebaseio.com",
  projectId: "homeless-8b5fa",
  storageBucket: "homeless-8b5fa.appspot.com",
  messagingSenderId: "141224564960",
  appId: "1:141224564960:web:50c36f7eb42ccf02655885",
  measurementId: "G-17NL6XP0BJ"
};

const app = initializeApp(firebaseConfig);
export default app;