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
const logout = document.querySelector('.logout');
onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = './login.html'
    localStorage.removeItem('token')
  } else {
  }
});
function logOut() {
    signOut(auth)
      .then(() => {
        console.log('Sign-out successful.')

      })
      .catch((error) => {
       console.log(error)
      });
  }
 
// logout-click
logout.addEventListener('click', function(e) {
    console.log(e)
    logOut();
})