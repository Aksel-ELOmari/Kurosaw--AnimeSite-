export const firebaseConfig = {
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
  uploadBytes,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-storage.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
const storage = getStorage(app);
// Import Local Files.
import { User_space, fetchGenres } from "./preview.js";
import { logoutUser } from "./regester.js";
import { defaultColl, MainURL, TMDB, isAnimeinColl } from "./App_api.js";
import { main } from "@popperjs/core/index.js";

//! ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~#
logoutUser();
// const MainHeroCard = function(){
//    fetch(`${MainURL}`)
//    .then(response => response.json())
//    .then(res =>{
//      const results = res.total_results;
//      console.log(results);
//      const Mainid =  Math.floor(Math.random() * results) + 1;
//      fetchMainAnime(Mainid);
//    })
//    function fetchMainAnime(id){
//       fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${TMDB.api_key}`)
//       .then(response => response.json())
//       .then(res =>{
//         const main_anime = res;
//        if(main_anime){
//             const {
//               adult,backdrop_path,belongs_to_collection,budget,genres,homepage,
//               id,imdb_id,origin_country,original_language,original_title,overview,
//               popularity,poster_path,production_companies,production_countries,release_date,
//               revenue,runtime,spoken_languages,status,tagline,video,vote_average,vote_count}
//               = main_anime;
//               // fetchGenres(genres);
//               let MainCard = document.createElement('div');
//               MainCard.innerHTML =
//               `
//               <div class="hero-Cover">
//                 <img src="https://image.tmdb.org/t/p/original/${backdrop_path}" alt="" id="HeaderCover" />
//               </div>
//               <div class="hero-card mt-5">
//                 <h1 class="hero-title">${title}</h1>
//                 <p class="hero-preview">${overview}</p>
//                 <div class="her-btns">
//                   <button type="button" class="btn mx-2 btn-dark Login-btn">
//                     <a href="./preview.html?id=${id}" target="_blanket" title="CLICK TO WATCH" class="text-decoration-none">Learn More</a>
//                   </button>
//                   <button type="button" class="btn mx-2 btn-light">
//                     <i class="fa-regular fa-bookmark"></i> to watch
//                   </button>
//                 </div>
//               </div>
//               `;
//               const placeholder = document.getElementById('main_card_holder');
//               placeholder.innerHTML = '';
//               placeholder.append(MainCard);
//        }
//       })
//    }
// }
// MainHeroCard();

export function Gofarther() {
  window.history.forward();
}
export function Goback() {
  window.history.back();
}
export function toggleElement(btn) {
  btn
    ? btn.addEventListener("click", () => {
        const el_class = btn.getAttribute("data-target");
        const el_target = document.querySelector(`.${el_class}`);
        if (el_target) {
          el_target.classList.toggle("d-none");
        } else {
          console.error("Sorrywe could not find the item !!!");
        }
      })
    : "";
}
// Calling this func to make changes when the user is in;
export function isUserIn() {
  let corner_btns = document.querySelector(".corner-btns");
  let corner_profile = document.querySelector(".corner-profile");
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      const user_name = user.displayName;
      const user_email = user.email;
      User_space(user_name, user_email);
      console.log("the user loged in ");
      corner_profile ? corner_profile.classList.remove("d-none") : "";
      corner_btns ? corner_btns.classList.toggle("d-none") : "";
    } else {
      console.log("the user is singned out");
      corner_btns ? corner_btns.classList.remove("d-none") : "";
      corner_profile ? corner_profile.classList.add("d-none") : "";
    }
  });
}
isUserIn();
// Import Firebase modules
async function uploadProfilePhotoToStorage(photoURL) {
  try {
    // Fetch the photo as a blob
    const response = await fetch(photoURL);
    const blob = await response.blob();
    // Define the storage reference
    const storageRef = ref(
      storage,
      `user_profiles/${auth.currentUser.uid}/profile_photo.jpg`,
    );
    // Upload the blob to Firebase Storage
    await uploadBytes(storageRef, blob);
    // Get the download URL
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    console.error("Error uploading profile photo:", error);
    throw error;
  }
}
// Authenticate user and upload profile picture
onAuthStateChanged(auth, async (user) => {
  if (user) {
    const photoURL = user.photoURL; // Get the user's Google account profile photo URL
    try {
      const firebasePhotoURL = await uploadProfilePhotoToStorage(photoURL);
      // console.log('Firebase Storage URL:', firebasePhotoURL);
      // Display the image
      const userProfile = document.querySelectorAll(".user-profile");
      userProfile
        ? userProfile.forEach((img) => {
            img.src = firebasePhotoURL;
          })
        : "";
      const NavProfile = document.querySelectorAll(".top-user-cover");
      NavProfile
        ? NavProfile.forEach((img) => {
            img.src = firebasePhotoURL;
          })
        : "";
    } catch (error) {
      console.error("Error processing profile photo:", error);
    }
  } else {
    console.log("No user is signed in.");
  }
});
export async function addAnimeToCollection(collectionName, animeId) {
  try {
    const docRef = doc(db, "Collections", collectionName);
    await updateDoc(docRef, {
      ids: arrayUnion(animeId),
    });
    console.log(
      `Anime ID ${animeId} added to the collection: ${collectionName}`,
    );
  } catch (error) {
    console.error("Error adding anime ID to collection:", error);
  }
}
// remove id widen a documwent object
export async function remove_from_coll(collectionName, animeId) {
  try {
    const docRef = doc(db, "Collections", collectionName);
    await updateDoc(docRef, {
      ids: arrayRemove(animeId),
    });

    console.log(
      `Anime ID ${animeId} removed from the collection: ${collectionName}`,
    );
  } catch (error) {
    console.error("Error removing anime ID from collection:", error);
  }
}
export const getOneDoc = async function (coll_name) {
  try {
    const docRef = doc(db, "Collections", coll_name);
    const docSnapshot = await getDoc(docRef);
    if (docSnapshot.exists()) {
      const Animes_ids = docSnapshot.data().ids;
      console.log(Animes_ids);
      return Animes_ids;
    } else {
      console.log("No such document found in the Collections collection.");
    }
  } catch (error) {
    console.error("Error fetching document: ", error);
  }
};
const Toggling_btns = [
  "Add_tocoll-btn",
  "hide-creater-section",
  "tobackColl",
  "createNewColl-btn",
  "OpenCollCreater-btn",
];
Toggling_btns.map((el) => {
  const btn = document.querySelector(`.${el}`);
  toggleElement(btn);
});
