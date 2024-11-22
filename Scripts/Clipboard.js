// install fontawesome Globaly
// in terminal run => npm install -g @fortawesome/fontawesome-free
//Way 1 : import '@fortawesome/fontawesome-free/css/all.min.css'; 
//Way 2 : Link the global installation of Font Awesome in your HTML file
// Replace "path/to/global/" with the actual path to your global node_modules directory.
// <link rel="stylesheet" href="path/to/global/node_modules/@fortawesome/fontawesome-free/css/all.min.css">


// ! Getting Coments
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


// Function to fetch arrays from Firebase
const fetchReactedAnimes = async function (arrayName) {
  try {
    const docRef = doc(db, "Collections", arrayName);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data().ids; // Return the array of anime IDs
    } else {
      console.log("No such document!");
      return [];
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

//   Use Anime IDs to Fetch Data from TMDB API
const fetchAnimeDetails = async function (animeIds) {
  const animeDetails = [];
  for (const id of animeIds) {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/anime/23?api_key=03760268c2411e2d785ed677c960080d&with_genres=16`,
      );
      const data = await response.json();
      animeDetails.push(data); // Push each anime's details into the array
    } catch (error) {
      console.error("Error fetching anime details:", error);
    }
  }

  return animeDetails;
};

//   Render Anime Cards in HTML
const displayAnimeCards = function (animeDetails, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = ""; // Clear previous content
  animeDetails.forEach((anime) => {
    // Create card HTML structure
    const card = document.createElement("div");
    card.classList.add("anime-card");

    card.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w500${anime.poster_path}" alt="${anime.title}" class="anime-poster" />
      <h3 class="anime-title">${anime.title}</h3>
      <p class="anime-description">${anime.overview}</p>
      <!-- Add like/save buttons if needed -->
    `;

    container.appendChild(card); // Add each card to the container
  });
};

// Fetch and display Liked Animes
const loadLikedAnimes = async function () {
  const likedAnimeIds = await fetchReactedAnimes("LikedAnimes");
  const likedAnimeDetails = await fetchAnimeDetails(likedAnimeIds);
  displayAnimeCards(likedAnimeDetails, "liked-anime-cards-container");
};
// Fetch and display Saved Animes
const loadSavedAnimes = async function () {
  const savedAnimeIds = await fetchReactedAnimes("savedAnimes");
  const savedAnimeDetails = await fetchAnimeDetails(savedAnimeIds);
  displayAnimeCards(savedAnimeDetails, "saved-anime-cards-container");
};
// Call the functions on page load
window.addEventListener("DOMContentLoaded", () => {
  loadLikedAnimes();
  loadSavedAnimes();
});

//! ____________________________________________________________________________________________________________________________
// Edite a comment
function editComment(commentId) {
  const commentElement = document.getElementById(commentId);
  const newComment = prompt("Edit your comment:", commentElement.textContent);
  if (newComment !== null) {
    commentElement.textContent = newComment;
  }
}

// Delet a comment
function deleteComment(commentId) {
  const commentElement = document.getElementById(commentId);
  if (confirm("Are you sure you want to delete this comment?")) {
    commentElement.remove();
  }
}

// Display the media acourding to it's type and value
function displayMedia(filePath) {
  const mediaContainer = document.getElementById("mediaContainer");
  const fileExtension = filePath.split(".").pop().toLowerCase();

  mediaContainer.innerHTML = ""; // Clear previous content

  if (["jpg", "jpeg", "png", "gif", "bmp", "webp"].includes(fileExtension)) {
    // Display image
    const img = document.createElement("img");
    img.src = filePath;
    img.alt = "Uploaded Image";
    img.style.maxWidth = "100%";
    mediaContainer.appendChild(img);
  } else if (["mp4", "webm", "ogg"].includes(fileExtension)) {
    // Display video
    const video = document.createElement("video");
    video.src = filePath;
    video.controls = true;
    video.style.maxWidth = "100%";
    mediaContainer.appendChild(video);
  } else {
    // Unsupported file type
    mediaContainer.textContent = "Unsupported media type.";
  }
}
