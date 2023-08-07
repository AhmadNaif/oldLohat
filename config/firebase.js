// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDa77ftY1S5WGdtYVylh9xjkvgvBvxEtNY",
  authDomain: "lohatksa-3c0e2.firebaseapp.com",
  projectId: "lohatksa-3c0e2",
  storageBucket: "lohatksa-3c0e2.appspot.com",
  messagingSenderId: "781984904501",
  appId: "1:781984904501:web:88d396d94d03f7b592087c",
  measurementId: "G-2EB9BR9S2G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);