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
import { toggleElement } from "./main.js";
import { MainURL } from "./App_api.js";
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
    alert(`the Collection ${collectionName} created successfully!`);
  } catch (error) {
    console.error("Error creating collection:", error);
  }
}
const NewColl_card = document.getElementById("newCollection-form");
if (NewColl_card) {
  NewColl_card.addEventListener("submit", (e) => {
    e.preventDefault();
    createCollection();
    toggleCollections_lab();
  });
}

async function getAllDocs() {
  const querySnapshot = await getDocs(collection(db, "Collections"));
  const parentCollection = document.querySelector(".CollectionCountainer");
  querySnapshot.forEach((doc) => {
    const { ids: Animes_ids, name: Coll_name } = doc.data();
    if(Animes_ids.lenght>0){
 
    const Coll_id = doc.id;
    const CollectionCovers = Animes_ids.slice(0, 3);
    const collection_card = document.createElement("div");
    collection_card.className = "collection-card p-3 col-lg-3";
    collection_card.dataset.collectionName = Coll_name;
    collection_card.dataset.collectionId = Coll_id;
    collection_card.innerHTML = `
      <h5 class="collection-title text-center">${Coll_name}</h5>
      <div class="Cards"></div>
    `;
    parentCollection?parentCollection.appendChild(collection_card):'';
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
  });
}
getAllDocs();
async function ColumnCollection() {
  const querySnapshot = await getDocs(collection(db, "Collections"));
  const parentCollection = document.querySelector(".collections-cards");
  querySnapshot.forEach((doc) => {
    const { ids: Animes_ids, name: Coll_name } = doc.data();
    const Coll_id = doc.id;
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
    parentCollection?parentCollection.appendChild(collection_card):'';
    fetch(`${MainURL}`)
      .then((response) => response.json())
      .then((res) => {
        const data = res.results;
        const collectionCover =
          collection_card.querySelector(".collection-cover");
        data.forEach((el) => {
          if (Cover_id == el.id) {
            collectionCover.src = `https://image.tmdb.org/t/p/original/${el.poster_path}`;
            console.log(el.poster_path);
          }
        });
      });
  });
}
ColumnCollection();

// local functions to toglle the sections
const Coll_lab_exbtn = document.querySelector(".createNewColl-btn");
Coll_lab_exbtn ? toggleElement(Coll_lab_exbtn) : "";

// butuns and ther functionality
// .createNewColl-btn => show the .Collections_lab
//  .ex-Coll-btn => hides the .Collections_lab
// .go_back_btn => toggle the elemts withen the .Collections_lab (.NewCollections_lab/.SaveCollections_lab)
//? #newCollection-btn => create the new collection and hide the .Collections_lab || instead we traked the function when creating the new collection;
// .OpenNewCollLab (inside .SaveCollections_lab ) => open .NewCollections_lab withen the collections_lab
//! #showMoreColl-btn => shows more collections (Only with Api);

export function toggleCollections_lab() {
  const Collections_lab = document.querySelector(".Collections_lab");
  Collections_lab?Collections_lab.classList.toggle("d-none"):'';
  const createNewColl_btn = document.querySelector(".createNewColl-btn");
  createNewColl_btn
    ? (createNewColl_btn.onclick = () =>
        Collections_lab.classList.toggle("d-none"))
    : "";
  const ex_Coll_btn = document.querySelector(".ex-Coll-btn ");
  ex_Coll_btn
    ? (ex_Coll_btn.onclick = () => Collections_lab.classList.toggle("d-none"))
    : "";
}

const go_back_btn = document.querySelector(".go_back_btn");
go_back_btn ? (go_back_btn.onclick = () => LabCardsToggler()) : "";
const OpenNewCollLab = document.querySelector(".OpenNewCollLab");
OpenNewCollLab?OpenNewCollLab.onclick = () => LabCardsToggler():'';
function LabCardsToggler() {
  let save_c = document.querySelector(".SaveCollections_lab");
  let create_c = document.querySelector(".NewCollections_lab");
  save_c ? save_c.classList.toggle("d-none") : "";
  create_c ? create_c.classList.toggle("d-none") : "";
}
