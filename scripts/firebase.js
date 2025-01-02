import { initializeApp, getApps } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

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

const submitButton = document.getElementById("submit");
const signupButton = document.getElementById("sign-up");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const main = document.getElementById("main");
const createacct = document.getElementById("create-acct")

const signupEmailIn = document.getElementById("email-signup");
const signupPasswordIn = document.getElementById("password-signup");
const confirmSignUpPasswordIn = document.getElementById("confirm-password-signup");
const createacctbtn = document.getElementById("create-acct-btn");

const returnBtn = document.getElementById("return-btn");

var email, password, signupEmail, signupPassword, confirmSignUpPassword;

createacctbtn.addEventListener("click", function () {
  let isVerified = true;

  signupEmail = signupEmailIn.value;
  signupPassword = signupPasswordIn.value;
  confirmSignUpPassword = confirmSignUpPasswordIn.value;

  if (signupPassword !== confirmSignUpPassword) {
    window.alert("Password fields do not match. Try again.");
    isVerified = false;
  }

  if (!signupEmail || !signupPassword || !confirmSignUpPassword) {
    window.alert("Please fill out all required fields.");
    isVerified = false;
  }

  if (isVerified) {
    createUserWithEmailAndPassword(auth, signupEmail, signupPassword)
      .then((userCredential) => {
        const user = userCredential.user;
        const uid = user.uid;

        // Create a new Firestore document for the user
        const usersDocRef = doc(db, "users", uid);

        setDoc(usersDocRef, {
          plants: ["wisdom"],
        })
          .then(() => {
            console.log("User document created successfully!");
          })
          .catch((error) => {
            console.error("Error creating user document:", error);
            window.alert("Error occurred while creating user document.");
          });

        window.alert("Success! Account created.");
      })
      .catch((error) => {
        const errorMessage = error.message;
        window.alert("Error occurred while creating user account: " + errorMessage);
      });
  }
});

submitButton.addEventListener("click", function() {
  email = emailInput.value;
  password = passwordInput.value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      window.location.href = "./sites/home.html";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      window.alert("Error occurred. Try again.");
    });
});

signupButton.addEventListener("click", function() {
    main.style.display = "none";
    createacct.style.display = "block";
});

returnBtn.addEventListener("click", function() {
    main.style.display = "block";
    createacct.style.display = "none";
});

const user = auth.currentUser;

if (user) {
  const displayName = user.displayName;
  console.log("Logged-in User's Name:", displayName);
} else {
  console.log("No user is logged in.");
}

export { app, auth, db};