import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBcS0QWgRbLsNtdKYiFpXceJsvLYy7aDJw",
  authDomain: "speak-on-4a07b.firebaseapp.com",
  projectId: "speak-on-4a07b",
  storageBucket: "speak-on-4a07b.firebasestorage.app",
  messagingSenderId: "597603593359",
  appId: "1:597603593359:web:d6bb8621edbb6c913e54fa",
  measurementId: "G-5N94FQEVWB"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };