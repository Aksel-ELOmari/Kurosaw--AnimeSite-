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
//! ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~#
// Calling this func to make changes whene the user is in;
export default function isUserIn() {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      console.log("the user loged in ", uid);
    } else {
      console.log("the user is singned out", uid);
    }
  });
}
export function CreateCard(item, placeholder) {
  const Card = document.createElement("div");
  Card.classList.add("Card");
  // Card.setAttribute('data-id',);
  Card.innerHTML = `
        <span class="rate-score">8.4 <i class="fa-solid fa-star"></i></span>
        <img src="./imgs/home/popular/Kaguya-smaLoveiswar.jpeg" alt="" class="AnimeCover" />
        <h5 class="AnimeTitle">Kaguya-sama Love is war</h5>
        <span class="AnimeDate">2022,Comedy</span>
  `;
  placeholder.append(Card);
}
//? ################### Start Save Animes to Firebase Collections ##############
export async function SaveToCollection(anime_id, CollName) {
  console.log("Save anime to collection exported from main.js");
  const item = document.getElementById("anime_id");
  const animeName = item.querySelector(".AnimeTitle").innerText;
  const AnimeDate = item.querySelector(".AnimeDate").innerText;
  const rateScore = item.querySelector(".rate-score").innerText;
  const animeCover = document.querySelector(".AnimeCover").src;
  try {
    const item = {
      id: anime_id,
      name: animeName,
      AnimeDate: AnimeDate,
      rateScore: rateScore,
      animeCover: animeCover,
    };
    await addDoc(collection(db, CollName), item);
    console.log(`${animeName} added to collection successfully!`);
  } catch (error) {
    console.error(error);
  }
}
//? ################### End Save Animes to Firebase Collections ##############
