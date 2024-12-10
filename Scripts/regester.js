// Firebase configuration (replace with your actual config)
const firebaseConfig = {
  apiKey: "AIzaSyA6Vhr8XE6aeBZJpsLtV1qi0xaYw9PpYZk",
  authDomain: "kurosaw-88c68.firebaseapp.com",
  databaseURL: "https://kurosaw-88c68-default-rtdb.firebaseio.com",
  projectId: "kurosaw-88c68",
  storageBucket: "kurosaw-88c68.appspot.com",
  messagingSenderId: "524642879718",
  appId: "1:524642879718:web:02c73576a25b6cfd375327",
  measurementId: "G-0QHJXCRCSW",
};
// Import Firebase modules using full paths
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-analytics.js";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import {
  getFirestore,
  doc,
  getDoc,
  getDocs,
  setDoc,
  collection,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";
import {
  getStorage,
  ref,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-storage.js";
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);
const storage = getStorage(app);


import { Goback } from "./main.js";
import { User_space, fetchGenres } from "./preview.js";
// import { addListener } from "./process";

//! ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~#
// Sign-in with Google functionality
const GoogleSignin = function () {
  const Login_gg_btn = document.getElementById("Login_gg_btn");
  Login_gg_btn
    ? (Login_gg_btn.onclick = function () {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
          .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const user = result.user;
            console.log(`The user ${user.displayName} successfully logged in with Google:`);
            // user ? Goback() : "";
          })
          .catch((error) => {
            console.error(
              "Sorry, there was an error signing in with Google:",
              error,
            );
          });
      })
    : "";
};

// FacebookSignin
const FacebookSignin = function () {
  const Login_fc_btn = document.getElementById("Login_fc_btn");
  Login_fc_btn
    ? (Login_fc_btn.onclick = function () {
        const provider = new FacebookAuthProvider();
        signInWithPopup(auth, provider)
          .then((result) => {
            const credential =
              FacebookAuthProvider.credentialFromResult(result);
            const user = result.user;
            console.log("The user successfully logged in with Facebook:", user);
          })
          .catch((error) => {
            console.error(
              "Sorry, there was an error signing in with Facebook:",
              error,
            );
          });
      })
    : "";
};
// Login // Register Functions
const loginUser = async function () {
  const email = document.getElementById("user-name")
    ? document.getElementById("user-name").value
    : "";
  const password = document.getElementById("user-password")
    ? document.getElementById("user-password").value
    : "";
  const LoginBtn = document.getElementById("LoginBtn")
    ? document.getElementById("LoginBtn")
    : "";
  LoginBtn
    ? (LoginBtn.onclick = async function () {
        try {
          // Log in the user with Firebase Authentication
          const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password,
          );
          const user = userCredential.user;
          window.location.href = "index.html";
        } catch (error) {
          console.error("user name or password is an correct?:", error);
          return { success: false, error: error.message };
        }
      })
    : "";
};
const registerUser = async function () {
  const email = document.getElementById("user-email")
    ? document.getElementById("user-email").value
    : "";
  const password = document.getElementById("user-password")
    ? document.getElementById("user-password").value
    : "";
  const name = document.getElementById("user-name")
    ? document.getElementById("user-name").value
    : "";
  const SingUpBtn = document.getElementById("SingUpBtn");
  SingUpBtn
    ? (SingUpBtn.onclic = async function () {
        try {
          // Register the user with Firebase Authentication
          const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password,
          );
          const user = userCredential.user;
          window.location.href = "index.html";
          // Save user data to Firestore
          await setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            email: user.email,
            name: name,
          });
          console.log("User data saved to Firestore.");
          return { success: true, user };
        } catch (error) {
          console.error(
            `Error registering ghe user: [${errorCode}] ${errorMessage}`,
          );
          return { success: false, error: errorMessage };
        }
      })
    : "";
};
// logout function
export function logoutUser(logout_btn) {
  logout_btn
    ? (logout_btn.onclick = function () {
        signOut(auth)
          .then(() => {
            console.log("User successfully logged out.");
          })
          .catch((error) => {
            console.error("Error logging out:", error);
          });
      })
    : "";
}
const logout_btn = document.querySelector(".logout_btn");
logoutUser(logout_btn);
// Calling the singning functions.Methods
GoogleSignin();
FacebookSignin();
loginUser();
registerUser();
