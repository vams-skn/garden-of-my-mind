import { app, auth, db, collection, doc, setDoc, getDocs, getDoc, signInWithEmailAndPassword, createUserWithEmailAndPassword, setPersistence, browserLocalPersistence, onAuthStateChanged, updateDoc, arrayUnion } from './firebase.js';

const newEntry = document.getElementById('journal-entry');
const virtuesContainer = document.getElementById('virtues-container');
const submitBtn = document.getElementById('submit-btn');

let selectedVirtue = null;

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User is logged in:", user.uid);

    virtuesContainer.addEventListener('click', (e) => {
      if (e.target.classList.contains('virtue-btn')) {
        const buttons = document.querySelectorAll('.virtue-btn');
        buttons.forEach((btn) => btn.classList.remove('selected'));

        e.target.classList.add('selected');
        selectedVirtue = e.target.dataset.virtue;
      }
    });

    submitBtn.addEventListener('click', async () => {
      if (!selectedVirtue) {
        alert('Please select a virtue.');
        return;
      }

      try {
        const user = auth.currentUser;
        if (!user) {
          alert('No user is logged in. Please log in to continue.');
          return;
        }

        const userDocRef = doc(db, 'users', user.uid);
        try {
          const userSnapshot = await getDoc(userDocRef);
          const currentPlants = userSnapshot.data().plants;

          const updatedPlants = [...currentPlants, selectedVirtue];
          await updateDoc(userDocRef, {
            plants: updatedPlants,
          });

          console.log('Virtue added successfully!');
        } catch (error) {
          console.error('Error adding virtue:', error);
        }

        alert(`View your new flower in your garden!`);

        selectedVirtue = null;
        document.querySelectorAll('.virtue-btn').forEach((btn) => btn.classList.remove('selected'));
      } catch (error) {
        console.error('Error adding virtue:', error);
        alert('Error adding virtue. Please try again.');
      }
    });
  }

  else {
    console.log("No user is logged in.");
  }
});