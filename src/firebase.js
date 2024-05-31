// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "connectifynz-14eab.firebaseapp.com",
  projectId: "connectifynz-14eab",
  storageBucket: "connectifynz-14eab.appspot.com",
  messagingSenderId: "471396027962",
  appId: "1:471396027962:web:0868c9058117c140de2f03",
  measurementId: "G-36S2FPQ585",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, analytics, db, auth, storage };
