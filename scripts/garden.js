import { app, auth, db, collection, doc, setDoc, getDocs, signInWithEmailAndPassword, createUserWithEmailAndPassword } from './firebase.js';

async function fetchCurrentUserPlants() {
    try {
      // Get the currently logged-in user's UID
      const user = auth.currentUser;
      if (!user) {
        console.error("No user is logged in.");
        return;
      }
  
      const uid = user.uid; // Get the logged-in user's UID
  
      // Reference to the user's document in Firestore
      const userDocRef = doc(db, 'users', uid);
  
      // Fetch the document
      const userDocSnap = await getDoc(userDocRef);
  
      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        console.log('Current user plants:', userData.plants); // Logs the plants for this user
      } else {
        console.error('No such document for the current user.');
      }
    } catch (error) {
      console.error('Error fetching current user plants:', error.message);
    }
  }
  
  // Call the function (or attach it to an event)
  fetchCurrentUserPlants();