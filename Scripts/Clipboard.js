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
