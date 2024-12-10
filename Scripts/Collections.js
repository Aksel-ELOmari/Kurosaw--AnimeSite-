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

// imports Localy
import { toggleElement, toggleTwoElements } from "./main.js";
import { MainURL, TMDB } from "./App_api.js";
//! ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~#

// Create NEW Collection Functions;
export async function createCollection() {
  try {
    const collectionName = document.getElementById("Collection-name").value;
    const collectionDesc = document.getElementById("collection-desc").value;
    const docRef = doc(db, "Collections", collectionName);
    await setDoc(docRef, {
      name: collectionName,
      ids: [],
      description: collectionDesc,
    });
    `the Collection ${collectionName} created successfully!`;
  } catch (error) {
    console.error("Error creating collection:", error);
  }
}
const NewColl_card = document.getElementById("newCollection-form");
if (NewColl_card) {
  NewColl_card.addEventListener("submit", (e) => {
    e.preventDefault();
    createCollection();
  });
}
// Display Collections
async function getAllDocs() {
  const querySnapshot = await getDocs(collection(db, "Collections"));
  querySnapshot.forEach((doc) => {
    const { ids: Animes_ids, name: Coll_name } = doc.data();
    const Coll_id = doc.id;
    if (Animes_ids.lenght > 0) {
      // RegularCollections(Animes_ids,Coll_name,Coll_id);
      // ColumnCollections(Animes_ids,Coll_name,Coll_id);
      findAnimeswithenCollections(Animes_ids);
    }
  });
}
getAllDocs();
function RegularCollections(Animes_ids, Coll_name, Coll_id) {
  const parentCollection = document.querySelector(".CollectionCountainer");
  const CollectionCovers = Animes_ids.slice(0, 3);
  const collection_card = document.createElement("div");
  collection_card.classList.add("collection-card", "p-3", "col-lg-3");
  collection_card.dataset.collectionName = Coll_name;
  collection_card.dataset.collectionId = Coll_id;
  collection_card.innerHTML = `
  <h5 class="collection-title text-center">${Coll_name}</h5>
  <div class="Cards"></div>
`;
  parentCollection ? parentCollection.appendChild(collection_card) : "";
  fetch(`${MainURL}`)
    .then((response) => response.json())
    .then((res) => {
      const data = res.results;
      const cardsContainer = collection_card.querySelector(".Cards");
      CollectionCovers.forEach((id) => {
        const match = data.find((el) => el.id === id);
        if (match) {
          const mini_card = document.createElement("div");
          mini_card.className = "Card";
          mini_card.innerHTML = `<img src="https://image.tmdb.org/t/p/original/${match.poster_path}" height="10rem" width="2rem" alt="${match.title}" class="card-cover" />`;
          cardsContainer.appendChild(mini_card);
        }
      });
    });
}
async function ColumnCollections(Animes_ids, Coll_name, Coll_id) {
  const parentCollection = document.querySelector(".collections-cards");
  const Cover_id = Animes_ids.slice(0, 1);
  const collection_card = document.createElement("div");
  collection_card.className =
    "collection flex-center justify-content-between w-100 my-2";
  collection_card.dataset.collectionName = Coll_name;
  collection_card.dataset.collectionId = Coll_id;
  collection_card.innerHTML = `
                    <div class="card-text">
                      <h5 class="fw-5 collection-title">${Coll_name}</h5>
                      <p class="items-count"><span>12</span> Titles</p>
                    </div>
                    <img src="" alt="" class="collection-cover mx-3" />
    `;
  parentCollection ? parentCollection.appendChild(collection_card) : "";
  fetch(`${MainURL}`)
    .then((response) => response.json())
    .then((res) => {
      const data = res.results;
      const collectionCover =
        collection_card.querySelector(".collection-cover");
      data.forEach((el) => {
        if (Cover_id == el.id) {
          collectionCover.src = `https://image.tmdb.org/t/p/original/${el.poster_path}`;
          // console.log(el.poster_path);
        }
      });
    });
}

async function findAnimeswithenCollections(Animes_ids) {
  const ids = Animes_ids.slice(0, 3);
  console.log(ids);

  // ids.forEach(id =>{
  //     const URL = `https://api.themoviedb.org/3/movie/${id}?api_key=${TMDB.api_key}`;
  //     fetch(URL)
  //     .then(response => response.json())
  //     .then(res =>{
  //         console.log(res);
  //     });
  // })
}
