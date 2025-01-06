import { app, auth, db, collection, doc, setDoc, getDocs, getDoc, signInWithEmailAndPassword, createUserWithEmailAndPassword, setPersistence, browserLocalPersistence, onAuthStateChanged, updateDoc, arrayUnion } from './firebase.js';

const gardenInsert = document.getElementById("garden");

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User is logged in:", user.uid);

    const fetchPlants = async () => {
        const user = auth.currentUser;
    
        try {
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);
    
            if (docSnap.exists()) {
                var flowers = docSnap.data().plants || [];
                console.log("Plant List:", flowers);

                flowers = [...flowers];
                flowers.forEach(flower => {
                  var img = `<img src="../assets/images/${flower}.png" class="img-fluid m-4 mb-1" alt="${flower}" width="70" loading="lazy">`;
                  gardenInsert.innerHTML += img;
                });

            } else {
                console.error("No document found for the current user.");
            }
        } catch (error) {
            console.error("Error fetching current user plants:", error);
        }
    };
    
    fetchPlants();
  }
  
  else {
    console.log("No user is logged in.");
  }
});