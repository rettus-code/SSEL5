# SSEL5
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCIdUZeSVeBOvo3pk1n7FzLUNACrvqRrSI",
  authDomain: "brewfinder-c2df7.firebaseapp.com",
  projectId: "brewfinder-c2df7",
  storageBucket: "brewfinder-c2df7.appspot.com",
  messagingSenderId: "24661740017",
  appId: "1:24661740017:web:9330af5ec1511fbdbf5c50",
  measurementId: "G-JR0N70DFFM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);