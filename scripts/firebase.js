import { initializeApp, getApps } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, setPersistence, browserLocalPersistence, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import { getFirestore, doc, collection, setDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCoQWXZivElKOajt5XEzlhQ5-eXhX68-5Y",
  authDomain: "garden-of-my-mind.firebaseapp.com",
  projectId: "garden-of-my-mind",
  storageBucket: "garden-of-my-mind.firebasestorage.app",
  messagingSenderId: "671312451400",
  appId: "1:671312451400:web:731c7d7e68a66278e2c57d",
  measurementId: "G-Q0SR3B4LER"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const db = getFirestore(app);

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User is logged in:", user.uid);
    fetchCurrentUserPlants(user.uid);
  } else {
    console.log("No user is logged in.");
  }
});

setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log("Persistence set to local storage.");
  })
  .catch((error) => {
    console.error("Error setting persistence:", error);
  });

export { app, auth, db, collection, doc, setDoc, getDocs, signInWithEmailAndPassword, createUserWithEmailAndPassword };