import { app, auth, db } from "./firebase.js";

document.getElementById("fill-name").innerText = auth.currentUser.displayName;
// const auth = getAuth();
const user = auth.currentUser;

if (user) {
  const displayName = user.displayName;
  console.log("Logged-in User's Name:", displayName);
} else {
  console.log("No user is logged in.");
}