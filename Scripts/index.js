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
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {
  getFirestore,
  doc,
  addDoc,
  setDoc,
  collection,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// Local Importing
//? ################### Start Save Animes to Collection Function ##############
const SaveReactedArrays = async function (arrayName) {
  try {
    await setDoc(doc(db, "Collections", "Reactedarrays", arrayName), {
      name: arrayName,
    });
    prompt("Array created successfully!");
  } catch (error) {
    console.error(error);
  }
};
const attitudesToggling = function (btn) {
  const LikedAnimes = [];
  const savedAnimes = [];
  const Animeid = btn.getAttribute("data-parent-id");
  btn.addEventListener("click", () => {
    if (btn.classList.contains("like-btn")) {
      btn.classList.toggle("liked-btn");
      if (btn.classList.contains("liked-btn")) {
        LikedAnimes.push(Animeid);
      } else if (!btn.classList.contains("liked-btn")) {
        const animeIndex = LikedAnimes.indexOf(Animeid);
        LikedAnimes.splice(animeIndex, 1);
      }
    } else if (btn.classList.contains("save-btn")) {
      btn.classList.toggle("saved-btn");
      if (btn.classList.contains("saved-btn")) {
        savedAnimes.push(Animeid);
      } else if (!btn.classList.contains("saved-btn")) {
        const animeIndex = savedAnimes.indexOf(Animeid);
        savedAnimes.splice(animeIndex, 1);
      }
    }
    console.log(`Liked Anime Array ${LikedAnimes}`);
    console.log(`Saved Anime Array ${savedAnimes}`);
  });
  SaveReactedArrays(LikedAnimes);
  SaveReactedArrays(savedAnimes);
};
const Attitude_btns = document.querySelectorAll(".attitude");
Attitude_btns.forEach((btn) => {
  attitudesToggling(btn);
});
//? ################### End Save Animes to Collection Function ##############
