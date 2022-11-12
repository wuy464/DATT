import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  addDoc,
  query,
  where,
  onSnapshot,
  deleteDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/9.13.0/firebase-firestore.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.13.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyBEfx9rt1YvEofHI3yVK2nyoM8kkkrscKo",
    authDomain: "music-788d2.firebaseapp.com",
    projectId: "music-788d2",
    storageBucket: "music-788d2.appspot.com",
    messagingSenderId: "311341090811",
    appId: "1:311341090811:web:af6d9a767b3431e82ced5e",
    measurementId: "G-WBZEELBQSK"
  };

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const auth = getAuth();



const loginForm = document.querySelector(".c-login__form");




function Login(email, pass) {
  signInWithEmailAndPassword(auth, email, pass)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      console.log(user.uid);
      localStorage.setItem("token", user.uid);
      window.location.href = "/";
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
      // ..
    });
}

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  console.log(formData);
  const email = formData.get("email");
  const password = formData.get("password");
  console.log(email);
  console.log(password);
  Login(email, password);
});

