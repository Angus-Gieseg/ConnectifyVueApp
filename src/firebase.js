// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "inhouse-games.firebaseapp.com",
  projectId: "inhouse-games",
  storageBucket: "inhouse-games.appspot.com",
  messagingSenderId: "719347735782",
  appId: "1:719347735782:web:07351ef1516191e67c2f27",
  measurementId: "G-65SMJN4WJ1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, analytics, db, auth, storage };
