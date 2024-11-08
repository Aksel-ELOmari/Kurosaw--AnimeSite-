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
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

//! ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~#
// Sign-in with Google functionality
const GoogleSignin = function () {
  const Login_gg_btn = document.getElementById("Login_gg_btn");
  Login_gg_btn.onclick = function () {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const user = result.user;
        console.log("The user successfully logged in with Google:", user);
      })
      .catch((error) => {
        console.error(
          "Sorry, there was an error signing in with Google:",
          error,
        );
      });
  };
};
// Sign-in with facebook functionality
const FacebookSignin = function () {
  const Login_fc_btn = document.getElementById("Login_fc_btn");
  Login_fc_btn.onclick = function () {
    const provider = new FacebookAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const user = result.user;
        console.log("The user successfully logged in with Facebook:", user);
      })
      .catch((error) => {
        console.error(
          "Sorry, there was an error signing in with Facebook:",
          error,
        );
      });
  };
};
// Login // Register Functions
const loginUser = async function () {
  const email = document.getElementById("user-name").value;
  const password = document.getElementById("user-password").value;
  const LoginBtn = document.getElementById("LoginBtn");
  LoginBtn.onclic = async function () {
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
  };
};
const registerUser = async function () {
  const email = document.getElementById("user-email").value;
  const password = document.getElementById("user-password").value;
  const name = document.getElementById("user-name").value;
  const SingUpBtn = document.getElementById("SingUpBtn");
  SingUpBtn.onclic = async function () {
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
  };
};
// Calling the singning functions.Methods
GoogleSignin();
FacebookSignin();
loginUser();
registerUser();
