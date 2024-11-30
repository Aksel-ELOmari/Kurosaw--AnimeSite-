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
  uploadBytes,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-storage.js";
import {
  onAuthStateChanged,
  getAuth,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth();
//! _______________________________________________________________________________________________________________________
import {
  toggleElement,
  addAnimeToCollection,
  remove_from_coll,
} from "./main.js";
import { toggleCollections_lab } from "./Collections.js";
import { isAnimeinColl, defaultColl, TMDB, fetchAnimes, } from "./App_api.js";
toggleCollections_lab(); // the btns withen inside
async function getMainAnime(id, api_key) {
  try {
    // Construct the API URL
    const One = `https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}`;
    // Fetch the data
    const response = await fetch(One);

    // Check if the response is okay
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    // Parse the JSON data
    const Anime = await response.json();
    // Destructure the response
    const {
      adult,
      backdrop_path,
      genres,
      original_language,
      original_title,
      overview,
      popularity,
      poster_path,
      release_date,
      title,
      video,
      vote_average,
      vote_count,
    } = Anime;
    
    // Call necessary functions (ensure these functions are defined elsewhere in your code)
    similar();
    AnimeStatus();
    SeactionsCards();
    DisplaySpecialContent();
    genres?fetchGenres(genres):"";
    const backdropCover = document.querySelector(".hero-backdropCover img");
    if (backdropCover) {
      backdrop_path?backdropCover.src = TMDB.img_url + backdrop_path: TMDB.img_url +  TMDB.DefaultBackdrop;
    }
    // Check if anime is in default collections
    defaultColl.forEach((Coll) => {
      isAnimeinColl(id, Coll);
    });
    // Create anime card
    const Card = document.createElement("div");
    Card.id = id;
    Card.classList.add("hero-body_inner", "flex", "align-items-center", "gap-5");
    Card.innerHTML = `
      <div class="animeCover">
        <img src="https://image.tmdb.org/t/p/original/${poster_path?poster_path:TMDB.DefaultCover}" alt="" id="main-img" />
      </div>
      <div class="hero-content">
        <h1 class="h1 animeTitle my-3 fw-bolder" id="mainAnimeTitle">${title}</h1>
        <div class="anime-dethails d-flex align-items-center gap-2 flex-wrap">
          <span class="anime-data anime-rate">${vote_average} (${vote_count})</span>
          <span class="anime-data anime-date">${release_date}</span>
          <span class="anime-data anime-type">Movie</span>
        </div>
        <div class="anime-genres d-flex align-items-center my-2 gap-2 flex-wrap"></div>
        <p class="anime-overview fw-400 w-50 line-clamp">${overview}</p>
        <div class="hero-buttons">
          <div class="hero-buttons_inner d-flex align-items-center">
            <button data-anime-id="${id}" data-collection-name="LikedAnimes" type="button" title="btn" class="item-status like-btn">
              <i class="fa-solid fa-heart"></i> Like
            </button>
            <button data-anime-id="${id}" data-collection-name="SavedAnimes" type="button" title="btn" class="item-status save-btn">
              <i class="fa-solid fa-bookmark"></i> Save
            </button>
            <button data-anime-id="${id}" data-collection-name="WatchLaterAnimes" type="button" title="btn" class="item-status watch-later-btn">
              <i class="fa-solid fa-clock"></i> Watch later
            </button>
            <button data-anime-id="${id}" data-collection-name="" type="button" title="btn" class="btn btn-light createNewColl-btn">
              Add To Collection
            </button>
          </div>
        </div>
      </div>
    `;
    // Insert anime card into placeholder
    const placeholder = document.getElementById("MainAnimeHolder");
    if (placeholder) {
      placeholder.innerHTML = "";
      placeholder.append(Card);
    }
  } catch (error) {
    console.error(`Error fetching the item: ${error.message}`);
  }
}
const url = new URL(window.location.href);
const params = new URLSearchParams(url.search);
const id = params.get("id");
const page = params.get("page");
id?getMainAnime(id, TMDB.api_key):'';

// Anime Status
function AnimeStatus(){
    let Status_btns = document.querySelectorAll(".item-status");
    Status_btns.forEach((btn) => {
      btn.classList.contains("active")
        ? addAnimeToCollection(btn)
        : remove_from_coll(btn);
      btn.addEventListener("click", () => {
        const id = btn.getAttribute('data-anime-id');
        const coll_name = btn.getAttribute('data-collection-name');
        isAnimeinColl(id, coll_name)?true:btn.classList.remove('active');
      });
    });
}
// Display Anime Genres
export function fetchGenres(genres) {
  genres.forEach(g =>{
     const {id,name} = g;
     let gr = document.createElement("span");
     gr.classList.add("anime-genre", "special-btn");
     gr.innerHTML = `${name}`;
     gr.setAttribute('data-id',id);
     let placeholder = document.querySelector(".anime-genres");
     placeholder?placeholder.append(gr):'';
  })
}
// Display similar Content
export function similar() {
  const placeholder = document.querySelector(
    ".SimilarSection .carousel-cards-holder",
  );
  const URL = `https://api.themoviedb.org/3/movie/${id ? id : 2}/similar?language=en-US&page=${page ? page : 1}&api_key=${TMDB.api_key}`;
  fetchAnimes(URL, placeholder);
}
// Display Special Section
export function DisplaySpecialContent(){
    const special_holder = document.querySelector(
      ".SpecialSection .carousel-cards-holder",
    );
    special_holder ? fetchAnimes(TMDB.Disc_api, special_holder) : "";
}
export function User_space(user_name, user_email) {
  let userName = document.querySelector(".user-name");
  let userEmail = document.querySelector(".user-email_in");
  userName ? (userName.innerHTML = "") : "";
  userName ? (userName.innerHTML = user_name) : "";
  userEmail ? (userEmail.innerHTML = "") : "";
  userEmail ? (userEmail.innerHTML = user_email) : "";
}
function SeactionsCards(){
  const sections_btns = document.querySelectorAll(".preview-toggle-btn");
  sections_btns?sections_btns.forEach((btn) => {
    btn.addEventListener("click", () => {
      toggleSections(btn);
    });
  }):'';
}
export function toggleSections(btn) {
  const btn_target = btn.getAttribute("data-target");
  const allTargets = document.querySelectorAll(".PreviewSection");
  allTargets.forEach((target) => {
    const targetName = target.getAttribute("data-name");
    if (targetName && targetName == btn_target) {
      allTargets.forEach((target) => target.classList.add("d-none"));
      target.classList.remove("d-none");
    }
  });
}
// Toggle the review section
const toggleElements_btns = ["write-review-btn", "reviews-exbtn"];
toggleElements_btns.map((el) => {
  const btn = document.querySelector(`.${el}`);
  btn ? (btn.onclick = () => toggleElement(btn)) : "";
});
// User Comments functions
export const UserReview = function () {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      const user_name = user.displayName;
      const user_email = user.email;
      const userReviewInput = document.querySelector("#user_review_holder");
      // Comment content
      const commentText = userReviewInput ? userReviewInput.value : "";
      const sendReview_btn = document.querySelector(".sendReview-btn");
      sendReview_btn
        ? (sendReview_btn.onclick = async function uploadReview(
            uid,
            commentText,
          ) {
            const comment = {
              userId: uid,
              user_name,
              user_name,
              user_email: user_email,
              commentText: commentText,
              timestamp: new Date().toISOString(),
            };
            const fileInput = document.getElementById("review_media");
            if (fileInput && fileInput.files.length > 0) {
              const file = fileInput.files[0];
              const storageRef = ref(storage, "chat-media/" + file.name);
              await uploadBytes(storageRef, file);
              const fileURL = await getDownloadURL(storageRef);
              comment.fileURL = fileURL;
            }
            const commentsRef = collection(db, "comments");
            await setDoc(doc(commentsRef), comment);
            document
              .querySelector(".ReviewsOffcanvas")
              ?.classList.add("d-none");
          })
        : "";
    } else {
      alert("sing up first");
    }
  });
};
UserReview();



// // ! Getting Coments
// async function getReviews() {
//   const displayedComments = new Set();
//   const commentsRef = collection(db, "comments");
//   const querySnapshot = await getDocs(commentsRef);
//   const ReviewsHolder = document.querySelector(".Reviews-holder");

//   querySnapshot.forEach((doc) => {
//     const commentData = doc.data();
//     const userName = commentData.user_name; // Fixed variable to access user_name
//     const commentId = doc.id;
//     const commentText = commentData.commentText;
//     const fileURL = commentData.fileURL;
//     const timestamp = commentData.timestamp;
//     const date = new Date(timestamp);
//     const formattedDate = date.toLocaleDateString("en-GB", {
//       day: "2-digit",
//       month: "long",
//       year: "numeric",
//     });

//     if (!displayedComments.has(commentId)) {
//       displayedComments.add(commentId);
//       const userReview = document.createElement("div");
//       userReview.classList.add(
//         "user-review",
//         "flex",
//         "align-items-start",
//         "gap-3",
//         "mb-4"
//       );
//       userReview.innerHTML = `
//         <img src="./imgs/Profile/Profile-img.jpg" alt="" class="top-user-cover">
//         <div class="review-body">
//           <div class="review-header flex">
//             <h6 class="user-name h5 me-2">${userName}</h6>
//             <span class="released-date">${formattedDate}</span>
//           </div>
//           <p class="user-review-text me-2">${commentText}</p>
//           <div class="media-content"></div>
//         </div>
//       `;
//       ReviewsHolder?.appendChild(userReview);

//       const mediaContentDiv = userReview.querySelector(".media-content");
//       appendMediaContent(mediaContentDiv, fileURL);
//     }
//   });
// }
// async function appendMediaContent(container, url) {
//   if (!url) return; // Handle case where there's no fileURL

//   try {
//     const response = await fetch(url, { method: 'HEAD' });
//     const contentType = response.headers.get('Content-Type');

//     if (contentType.startsWith('image/')) {
//       let media = document.createElement("img");
//       media.src = url;
//       container.appendChild(media);
//     } else if (contentType.startsWith('video/')) {
//       let media = document.createElement("video");
//       media.src = url;
//       media.controls = true;
//       media.setAttribute("loop", "muted", "autoplay");
//       container.appendChild(media);
//     } else {
//       container.textContent = "Unsupported media type.";
//     }
//   } catch (error) {
//     console.error('Error fetching media type:', error);
//     container.textContent = "Error loading media.";
//   }
// }
// getReviews();

