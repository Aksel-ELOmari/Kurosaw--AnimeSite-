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
  DefaultBackdrop:'https://images.unsplash.com/photo-1524712245354-2c4e5e7121c0?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  DefaultCover:'https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
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
// import items from other files 
// Main Url
export const MainURL = TMDB.Disc_api;
export var page = 1;

export function fetchAnimes(url, placeholder, page = 1) {
  function fetchContent(path) {
    fetch(path)
      .then((response) => response.json())
      .then((res) => {
        const data = res.results;
        if (data) {
          data.forEach((el) => {
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
              if (!genre_ids.includes(TMDB.genre)) return;
              defaultColl.map((Coll) => {isAnimeinColl(id, Coll);});
              const Card = document.createElement("a");
              Card.classList.add("Card");
              Card.href = `./preview.html?id=${id}&page=${page}&path=${encodeURIComponent(path)}`;
              Card.id = id;
              Card.innerHTML = `
                <span class="rate-score">${vote_average} <i class="fa-solid fa-star"></i></span>
                <img src="https://image.tmdb.org/t/p/original/${poster_path?poster_path:TMDB.DefaultCover}" alt="" class="AnimeCover" />
                <h5 class="AnimeTitle">${title}</h5>
                <p><i class="AnimeDate">${release_date}</i>,</p>
                <div class="after-card">
                  <img src="https://image.tmdb.org/t/p/original/${backdrop_path?backdrop_path:TMDB.DefaultBackdrop}" alt="" class="Anime Back drop Cover" />
                  <div class="attitudes d-flex align-center justify-content-between">
                    <span class="like-btn item-status" data-collection-name="LikedAnimes" data-parent-id="${id}">
                      <i class="fa-solid fa-heart"></i>
                    </span>
                    <span class="save-btn item-status" data-collection-name="SavedAnimes" data-parent-id="${id}">
                      <i class="fa-solid fa-bookmark"></i>
                    </span>
                  </div>
                </div>
              `;
              placeholder ? placeholder.append(Card) : "";
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }
  const path = `${url}&page=${page}`;
  fetchContent(path);
  scrollBehavier();
}
export function scrollBehavier() {
    const Scroll_btns = document.querySelectorAll(
      ".fa-arrow-left, .fa-arrow-right"
    );
    Scroll_btns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const carouName = btn.getAttribute("data-parentName");
        const carousel_parent = document.querySelector(
          `.${carouName} .carousel-cards-holder`,
        );
        const direction = btn.classList.contains("fa-arrow-right") ? 1 : -1;
        const scrollAmount = 400 * direction;
        carousel_parent.scrollBy({ left: scrollAmount, behavior: "smooth" });
        const page = btn.classList.contains("fa-arrow-right") ? 1 : -1;
        if (carouName == "special-section") {
          fetchAnimes(TMDB.Disc_api, carousel_parent, page);
        } else if (carouName == "trending-section") {
          fetchAnimes(TMDB.Top_api, carousel_parent, page);
        }
      });
    });
    const ShowMore_btns = document.querySelectorAll(".show-more-btn");
    ShowMore_btns.forEach((btn) =>{
        btn?btn.onclick = function(){
            const carouName = btn.getAttribute("data-parentName");
            const carousel_parent = document.querySelector(`.${carouName} .cards-holder`);
            const currentPath = btn.getAttribute('data-navigate-path');
            fetchAnimes(currentPath, carousel_parent, page++);
        }:'';
    });
}
export const defaultColl = [
  "SavedAnimes",
  "LikedAnimes",
  "WatchLaterAnimes",
  "WatchedAnimes",
];

const checkColl = async function (id, coll_name) {
    const querySnapshot = await getDocs(collection(db, "Collections"));
    querySnapshot.forEach((doc) => {
      const Coll = doc.data();
      const { ids: Animes_ids, name: Coll_name } = Coll;
      if(Animes_ids.includes(id) && Coll_name==coll_name){
        const status = document.querySelector(`[data-collection-name="${coll_name}"]`);
        console.log(status);
         status.classList.add('.active');
      }
    });
};
// ##### Lighting up each card btns ######
export const isAnimeinColl = function(){
   const allAnimesStatus = document.querySelectorAll('.Card .item-status');
    allAnimesStatus.forEach(status =>{
      const id = status.getAttribute('data-parent-id');
      const coll_name = status.getAttribute('data-collection-name');
      id&&coll_name?checkColl(id, coll_name):'';
    });
}
isAnimeinColl();
