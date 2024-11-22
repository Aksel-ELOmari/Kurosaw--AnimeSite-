export const TMDB = {
  api_key: "03760268c2411e2d785ed677c960080d",
  base_Url: "https://api.themoviedb.org/3/",
  img_url: "https://image.tmdb.org/t/p/original/",
  page: 1,
  genre: 16,
  Disc_api: `https://api.themoviedb.org/3/discover/movie?language=en-US&api_key=03760268c2411e2d785ed677c960080d&with_genres=16`,
  Pop_api: `https://api.themoviedb.org/3/movie/popular?language=en-US&api_key=03760268c2411e2d785ed677c960080d&with_genres=16`,
  Top_api: `https://api.themoviedb.org/3/movie/top_rated?language=en-US&api_key=03760268c2411e2d785ed677c960080d&with_genres=16`,
  Lat_api: `https://api.themoviedb.org/3/movie/latest?language=en-US&api_key=03760268c2411e2d785ed677c960080d&with_genres=16`,
};
import {
  getFirestore,
  doc,
  getDoc,
  getDocs,
  setDoc,
  collection,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
// import { firebaseConfig } from "./main.js";
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// Main Url
export const MainURL = TMDB.Disc_api;
export function fetchAnimes(url, placeholder, page = 1) {
    const path = `${url}&page=${page}`
    fetch(path)
    .then((response) => response.json())
    .then((res) => {
      const data = res.results;
      data
        ? data.forEach((el) => {
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
            if(!genre_ids.includes(TMDB.genre))return;
            defaultColl.map((Coll) => {
              isAnimeinColl(id, Coll);
            });
            const Card = document.createElement("a");
            Card.classList.add("Card");
            Card.href = `./preview.html?id=${id}&page=${page}&path=${encodeURIComponent(path)}`;
            Card.setAttribute("data-id", id);
            Card.id = id;
            Card.innerHTML = `
                    <span class="rate-score">${vote_average} <i class="fa-solid fa-star"></i></span>
                    <img src="https://image.tmdb.org/t/p/original/${poster_path}" alt="" class="AnimeCover" />
                    <h5 class="AnimeTitle">${title}</h5>
                    <p><i class="AnimeDate">${release_date}</i>,</p>
                     <div class="after-card">
                         <img src="https://image.tmdb.org/t/p/original/${backdrop_path}" alt="" class="Anime Back drop Cover" />
                          <div class="attitudes d-flex align-center justify-content-between" >
                            <span class="like-btn item-status" data-collection-name="LikedAnimes" data-parent-id="${id}" data-class="like-btn" data-styled-class="liked-btn">
                                <i class="fa-solid fa-heart"></i ></span>
                            <span class="save-btn item-status" data-collection-name="SavedAnimes" data-parent-id="${id}" data-class="save-btn" data-styled-class="saved-btn">
                                 <i class="fa-solid fa-bookmark"></i>
                            </span>
                          </div>
                     </div>
              `;
              placeholder?placeholder.append(Card):'';
          })
        : "";
    });
    scrollBehavier();
}
export function scrollBehavier(){
  const Scroll_btns = document.querySelectorAll('.fa-arrow-left, .fa-arrow-right');
  Scroll_btns.forEach(btn => {
    btn.addEventListener('click',()=>{
        const carouName = btn.getAttribute('data-parentname');
        const carousel_parent = document.querySelector(`.${carouName} .carousel-cards-holder`);
        const direction = btn.classList.contains('fa-arrow-right') ? 1 : -1;
        const scrollAmount = 400 * direction;
        carousel_parent.scrollBy({ left: scrollAmount, behavior: 'smooth'});
    })
  })
}
export const defaultColl = ["SavedAnimes", "LikedAnimes", "WatchLaterAnimes","WatchedAnimes"];
export const isAnimeinColl = async function (id, coll_name) {
  try {
    const docRef = doc(db, "Collections", coll_name);
    const docSnapshot = await getDoc(docRef);
    if (docSnapshot.exists()) {
      const Animes_ids = docSnapshot.data().ids;
      if (Animes_ids.includes(id)) {
        const Anime = document.getElementById(id);
        if (Anime && coll_name == "LikedAnimes") {
           console.log(`this anime (${id}) is bellongs to this collection : ${coll_name}`);
          Anime.querySelector(".like-btn.item-status").classList.add('active');
        } else if (Anime && coll_name == "SavedAnimes") {
           console.log(`this anime (${id}) is bellongs to this collection : ${coll_name}`);
          Anime.querySelector(".save-btn.item-status").classList.add('active');
        } else if (Anime && coll_name == "WatchLaterAnimes") {
           console.log(`this anime (${id}) is bellongs to this collection : ${coll_name}`);
          Anime.querySelector(".watch-later-btn.item-status").classList.add('active');
        } else {
          console.log(`this anime (${id}) dos not bellonge to the ${coll_name}`);
        }
      }
    } else {
      console.log("No such document found in the Collections collection.");
    }
  } catch (error) {
    console.error("Error fetching document: ", error);
  }
};
