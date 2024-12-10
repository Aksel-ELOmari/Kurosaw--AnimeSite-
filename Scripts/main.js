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
import { defaultColl, MainURL, TMDB } from "./App_api.js";

//! ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~#
const MainHeroCard = function () {
  fetch(`${MainURL}`)
    .then((response) => response.json())
    .then((res) => {
      const results = res.total_results;
      console.log(results);
      const Mainid = Math.floor(Math.random() * results) + 1;
      Mainid ? fetchMainAnime(Mainid) : MainHeroCard;
      console.log(`the randome anime id is : ${Mainid}`);
    });
  function fetchMainAnime(id) {
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${TMDB.api_key}`)
      .then((response) => response.json())
      .then((res) => {
        const main_anime = res;
        if (main_anime) {
          const {
            adult,
            backdrop_path,
            belongs_to_collection,
            budget,
            genres,
            homepage,
            id,
            imdb_id,
            origin_country,
            original_language,
            original_title,
            overview,
            popularity,
            poster_path,
            production_companies,
            production_countries,
            release_date,
            revenue,
            runtime,
            spoken_languages,
            status,
            tagline,
            video,
            vote_average,
            vote_count,
          } = main_anime;
          genres ? fetchGenres(genres) : "";
          let MainCard = document.createElement("div");
          MainCard.innerHTML = `
              <div class="hero-Cover">
                <img src="https://image.tmdb.org/t/p/original/${backdrop_path}" alt="" id="HeaderCover" />
              </div>
              <div class="hero-card mt-5">
                <h1 class="hero-title w-auto">${original_title}</h1>
                <div class="anime-genres d-flex align-items-center my-2 gap-2 flex-wrap">
                  <span class="anime-genre special-btn" data-id="00000001">Drama</span>
                </div>
                <p class="hero-preview line-clamp">${overview}</p>
                <div class="her-btns">
                  <a href="./preview.html?id=${id}" title="CLICK TO WATCH" class="text-decoration-none mx-2 btn btn-dark">
                    <i class="fa-solid fa-eye me-2"></i>
                    to watch
                  </a>
                  <a href="${homepage ? homepage : "#"}" class="text-decoration-none mx-2 btn btn-dark">
                    <i class="fa-regular fa-bookmark me-2"></i>
                    Learn More
                  </a>
                </div>
              </div>
              `;
          const placeholder = document.getElementById("main_card_holder");
          placeholder.innerHTML = "";
          placeholder.append(MainCard);
        }
      });
  }
};
if (document.location.href == "./index.html") {
  setInterval(() => {
    MainHeroCard();
  }, 20000); // 300000 milliseconds = 5 minutes
}

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
          console.error("Sorry we could not find the item !!!");
        }
      })
    : "";
}
export function toggleTwoElements(el1, el2) {
  el1.classList.toggle("d-none");
  el2.classList.toggle("d-none");
}
export function toggleSections(btn) {
  const btn_target = btn.getAttribute("data-target");
  const allTargets = document.querySelectorAll(".ToggledSection");
  allTargets.forEach((target) => {
    const targetName = target.getAttribute("data-name");
    if (targetName && targetName == btn_target) {
      allTargets.forEach((target) => target.classList.add("d-none"));
      target.classList.remove("d-none");
    }
  });
}
export function btn_active_function(btn,func){
   btn?btn.onclick = _ => func:'';
}
// Calling this func to make changes when the user is in;
export function isUserIn() {
  let corner_btns = document.querySelector(".corner-btns");
  let corner_profile = document.querySelector(".corner-profile");
  onAuthStateChanged(
    auth,
    (user) =>
      async function () {
        if (user) {
          toggleLogout_btns(user);
          console.log(user.displayName);
          const uid = user.uid;
          const user_name = user.displayName;
          const user_email = user.email;
          const photoURL = user.photoURL; // Get the user's Google account profile photo URL
          try {
            const firebasePhotoURL =
              await uploadProfilePhotoToStorage(photoURL);
            const userProfile = document.querySelectorAll(
              ".user-profile",
              ".top-user-cover",
            );
            userProfile
              ? userProfile.forEach((img) => {
                  img.src = firebasePhotoURL;
                })
              : "";
          } catch (error) {
            console.error("Error processing profile photo:", error);
          }
          User_space(user_name, user_email);
          console.log("the user loged in ");
          corner_profile ? corner_profile.classList.remove("d-none") : "";
          corner_btns ? corner_btns.classList.add("d-none") : "";
        } else {
          console.log("No User loged in !!!");
          corner_btns ? corner_btns.classList.remove("d-none") : "";
          corner_profile ? corner_profile.classList.add("d-none") : "";
        }
      },
  );
}
isUserIn();
export function toggleLogout_btns(user) {
  const LogOut_btns = document.querySelectorAll(".Logout_btn");
  if (user) {
    LogOut_btns.forEach((btn) => {
      btn.classList.toggle("d-none");
    });
  }
}
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
export async function addAnimeToCollection(btn) {
  const collectionName = btn.getAttribute("data-collection-name");
  const animeId = btn.getAttribute("data-parent-id");
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
export async function remove_from_coll(btn) {
  const collectionName = btn.getAttribute("data-collection-name");
  const animeId = btn.getAttribute("data-parent-id");
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
