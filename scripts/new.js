import { app, auth, db, collection, doc, setDoc, getDocs, getDoc, signInWithEmailAndPassword, createUserWithEmailAndPassword, setPersistence, browserLocalPersistence, onAuthStateChanged } from './firebase.js';

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
          buttons.forEach(btn => btn.classList.remove('selected'));
      
          e.target.classList.add('selected');
          selectedVirtue = e.target.dataset.virtue;
        }
      });
      
      submitBtn.addEventListener('click', async () => {
        const entryText = newEntry.value;
      
        if (!entryText || !selectedVirtue) {
          alert('Please fill in the journal entry and select a virtue.');
          return;
        }
      
        try {
          const user = auth.currentUser;
          if (!user) {
            alert('No user is logged in. Please log in to continue.');
            return;
          }
      
          const userDocRef = doc(db, 'users', user.uid);
          const userDocSnap = await getDoc(userDocRef);
      
          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            const currentEntries = userData.entries || [];
      
            const newEntry = {
              date: new Date().toISOString(),
              text: entryText,
              virtue: selectedVirtue
            };
            currentEntries.push(newEntry);
      
            await setDoc(userDocRef, { entries: currentEntries }, { merge: true });
            alert('Entry submitted successfully!');
          } else {
            // Create a new document for the user
            const newUserData = {
              entries: [
                {
                  date: new Date().toISOString(),
                  text: entryText,
                  virtue: selectedVirtue
                }
              ]
            };
            await setDoc(userDocRef, newUserData);
            alert('Entry submitted successfully!');
          }
      
          // Clear inputs
          newEntry.value = '';
          selectedVirtue = null;
          document.querySelectorAll('.virtue-btn').forEach(btn => btn.classList.remove('selected'));
        } catch (error) {
          console.error('Error submitting entry:', error);
          alert('Error submitting entry. Please try again.');
        }
      });
      
  }
  
  else {
    console.log("No user is logged in.");
  }
});