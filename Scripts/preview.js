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
import { createPopper } from "@popperjs/core";

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
import { isAnimeinColl, defaultColl, TMDB, fetchAnimes } from "./App_api.js";
toggleCollections_lab(); // the btns withen inside
function getMainAnime(id, path) {
  fetch(`${path}&api_key=03760268c2411e2d785ed677c960080d&with_genres=16`)
    .then((response) => response.json())
    .then((res) => {
      const data = res.results;
      if (data) {
        data.forEach((el) => {
          if (el.id == id) {
            const {
              adult,
              backdrop_path,
              genre_ids,
              id,
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
            } = el;
            fetchGenres(genre_ids ? genre_ids : "");
            defaultColl.map((coll) => {
              isAnimeinColl(id, coll);
            });
            const backdropCover = document.querySelector(
              ".hero-backdropCover img",
            );
            backdropCover.src = TMDB.img_url + backdrop_path;
            defaultColl.forEach((Coll) => {
              isAnimeinColl(id, Coll);
            });
            // Create anime card
            const Card = document.createElement("div");
            Card.classList.add(
              "hero-body_inner",
              "flex",
              "align-items-center",
              "gap-5",
            );
            Card.innerHTML = `
              <div class="animeCover">
                <img
                  src="${TMDB.img_url + poster_path}"
                  alt=""
                  id="main-img"
                />
              </div>
              <div class="hero-content">
                <h1 class="h1 animeTitle my-3 fw-bolder" id="mainAnimeTitle">
                  ${title}
                </h1>
                <div
                  class="anime-dethails d-flex align-items-center gap-2 flex-wrap"
                >
                  <span class="anime-data anime-rate">${vote_average} (${vote_count})</span>
                  <span class="anime-data anime-date">${release_date}</span>
                  <span class="anime-data anime-type">Movie</span>
                </div>
                <div
                  class="anime-genres d-flex align-items-center my-2 gap-2 flex-wrap"
                >
                  <span class="anime-genre special-btn">Family</span>
                  <span class="anime-genre special-btn">Animation</span>
                  <span class="anime-genre special-btn">Science Fiction</span>
                </div>
                <p class="anime-overview fw-400 w-50 line-clamp">${overview}</p>
                <div class="hero-buttons">
                  <div class="hero-buttons_inner d-flex align-items-center">
                    <button
                      data-anime-id="${id}"
                     data-collection-name="LikedAnimes"
                      type="button"
                      title="btn"
                      class="item-status like-btn"
                    >
                    <i class="fa-solid fa-heart"></i>
                      Like
                    </button>
                    <button
                      data-anime-id="${id}"
                     data-collection-name="SavedAnimes"
                      type="button"
                      title="btn"
                      class="item-status  save-btn"
                    >
                    <i class="fa-solid fa-bookmark"></i>
                      Save
                    </button>
                    <button
                      data-anime-id="${id}"
                     data-collection-name="WatchLaterAnimes"
                      type="button"
                      title="btn"
                      class="item-status watch-later-btn"
                    >
                    <i class="fa-solid fa-clock"></i>
                      Watch later
                    </button>
                    <button
                      data-anime-id="${id}"
                     data-collection-name=""
                      type="button"
                      title="btn"
                      class="btn btn-light createNewColl-btn"
                    >
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
          }
        });
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}
const url = new URL(window.location.href);
const params = new URLSearchParams(url.search);
const id = params.get("id");
const path = params.get("path");
const page = params.get("page");
id && path ? getMainAnime(id, path) : "";
// Display Anime Genresa
export function fetchGenres(genres) {
  fetch(
    `https://api.themoviedb.org/3/genre/movie/list?language=en&api_key=${TMDB.api_key}`,
  )
    .then((response) => response.json())
    .then((res) => {
      let Genres = res.genres;
      Genres.forEach((G) => {
        genres.forEach((g) => {
          if (G.id === g) {
            let gr = document.createElement("span");
            gr.classList.add("anime-genre", "special-btn");
            gr.innerHTML = `${G.name}`;
            let placeholder = document.querySelector(".anime-genres");
            if (placeholder) {
              placeholder.innerHTML = "";
              placeholder.append(gr);
            }
          }
        });
      });
    });
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
const special_holder = document.querySelector(
  ".SpecialSection .carousel-cards-holder",
);
special_holder ? fetchAnimes(TMDB.Disc_api, special_holder) : "";

similar();
export function User_space(user_name, user_email) {
  let userName = document.querySelector(".user-name");
  let userEmail = document.querySelector(".user-email_in");
  userName ? (userName.innerHTML = "") : "";
  userName ? (userName.innerHTML = user_name) : "";
  userEmail ? (userEmail.innerHTML = "") : "";
  userEmail ? (userEmail.innerHTML = user_email) : "";
}

const sections_btns = document.querySelectorAll(".preview-toggle-btn");
sections_btns.forEach((btn) => {
  btn.addEventListener("click", () => {
    toggleSections(btn);
  });
});
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
