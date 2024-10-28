import firebase from './firebase/app';
import 'firebaseauth';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDZok_WgqUha5O0zjbZbMwTGVma0WM38RQ",
    authDomain: "pharma-28f84.firebaseapp.com",
    projectId: "pharma-28f84",
    storageBucket: "pharma-28f84.appspot.com",
    messagingSenderId: "682071014272",
    appId: "1:682071014272:web:84123a5c2cf8b73baa9f65",
    measurementId: "G-LT7XYC3P23"
  };

export const firebaseApp = firebase.initializeApp(firebaseConfig);