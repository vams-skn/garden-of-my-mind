import { app, auth, db, collection, doc, setDoc, getDocs, getDoc, signInWithEmailAndPassword, createUserWithEmailAndPassword, setPersistence, browserLocalPersistence, onAuthStateChanged } from './firebase.js';

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User is logged in:", user.uid);

    const fetchPlants = async () => {
        const user = auth.currentUser;
    
        if (!user) {
            console.error("No user is logged in.");
            return;
        }
    
        try {
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);
    
            if (docSnap.exists()) {
                const plantList = docSnap.data().plants || [];
                console.log("Plant List:", plantList);
            } else {
                console.error("No document found for the current user.");
            }
        } catch (error) {
            console.error("Error fetching current user plants:", error);
        }
    };
    
    fetchPlants();
  } else {
    console.log("No user is logged in.");
  }
});