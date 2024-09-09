// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyChidKqts1fBqiMkY5WqpmRPQJH42GmcXk",
  authDomain: "portfolio-fanny-carlier.firebaseapp.com",
  projectId: "portfolio-fanny-carlier",
  storageBucket: "portfolio-fanny-carlier.appspot.com",
  messagingSenderId: "519770383113",
  appId: "1:519770383113:web:9e8ff244fdddce636969d8",
  measurementId: "G-Y041V99SM4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// Initialiser Firebase Storage
const storage = getStorage(app);

export { storage };
