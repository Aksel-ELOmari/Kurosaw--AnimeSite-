import firebase from './firebase/app';
import {assignClick,inistializeNavButtons} from './utitlise.js';
import {googleSigning,facebookSigning,signOut} from '../firebaseAutontication.js';
inistializeNavButtons();
assignClick('google-btn',googleSigning);
assignClick('facebook-btn',facebookSigning);
assignClick('singout-btn',signOut);




























// // Import the functions you need from the SDKs you need
// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
// import { getDatabase,ref,set,get,child } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-analytics.js";
// const firebaseConfig = {
//     apiKey: "AIzaSyDZok_WgqUha5O0zjbZbMwTGVma0WM38RQ",
//     authDomain: "pharma-28f84.firebaseapp.com",
//     projectId: "pharma-28f84",
//     storageBucket: "pharma-28f84.appspot.com",
//     messagingSenderId: "682071014272",
//     appId: "1:682071014272:web:84123a5c2cf8b73baa9f65",
//     measurementId: "G-LT7XYC3P23"
// };
// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// // get the ref from the database service
// const db = getDatabase(app);
// const submit_btn = document.getElementById('submit-btn');
// submit_btn.addEventListener('click',(e)=>{
//     e.preventDefault();
//     set(ref(db,'Users/' + document.getElementById('name ').value + document.getElementById('lastName').value),
//     {
//        userName:document.getElementById('name').value,
//        userlastName:document.getElementById('lastName').value,
//        userEmail:document.getElementById('userEmail').value,
//        userPhone:document.getElementById('userPhone').value, 
//        userMessage:document.getElementById('ContactText').value, // User Message
//     })
//     set(ref(db,'Emails/' + document.getElementById('name').value),
//     {
//        userName:document.getElementById('name').value,
//        userEmail:document.getElementById('userEmail').value
//     })
//     prompt('the data was sent successfully !!!!');
// })