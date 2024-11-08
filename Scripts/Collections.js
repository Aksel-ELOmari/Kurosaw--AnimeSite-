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
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-analytics.js";
import {
  getFirestore,
  doc,
  getDoc,
  getDocs,
  setDoc,
  collection,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// imports Localy

//! ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~#

// fetch Collections from fire store by entring the collection name/path.
export const getAllCollections = async function (path) {
  try {
    const querySnapshot = await getDocs(collection(db, path));
    querySnapshot.forEach((doc) => {
      const Anime = doc.data();
      //    CollectionsMainContainer(Anime);
    });
  } catch (error) {
    console.error(error);
  }
};
getAllCollections("Collection01");

function CollectionsMainContainer(Anime) {
  const { id, animeCover, rateScore, name, animeDate } = Anime;
  const placeholder = document.querySelector(".collection-card");
  // console.log(data);
  // if(data.lenght%3 ==0){
  //     console.log('is double 3')
  // }else{
  //     console.log('Even 3')
  // }

  // function createCards(){
  //     let Cards = document.createElement('div');
  //     Cards.classList.add('Cards');
  //     Cards.innerHTML +=
  //     `
  //         <div class="Card" card-id="${id}">
  //             <img
  //             src="${animeCover}"
  //             height="10rem"
  //             width="2rem"
  //             alt=""
  //             class="card-cover"
  //             />
  //         </div>
  //     `;placeholder.append(Cards);
  // }
}

// Create NEW Collection Functions;
async function CreateCollection() {
  try {
    // Retrieve data from the form fields
    const CollectionName = document.getElementById("Collection-name").value;
    const CollectionDesc = document.getElementById("collection-desc").value;
    const CollectionStatus = document.getElementById("collecton-check").checked;
    await setDoc(doc(db, "Collections", CollectionName), {
      name: CollectionName,
      desc: CollectionDesc,
      isPrivet: CollectionStatus,
    });
    prompt("Collection created successfully!");
  } catch (error) {
    console.error(error);
  }
}

export const ShoosenCollection = function () {
  const All_Colls = document.querySelectorAll(".collection");
  All_Colls.forEach((coll) => {
    coll.classList.remove("active");
    coll.addEventListener("click", () => {
      return coll.classList.add("active");
    });
  });
};
