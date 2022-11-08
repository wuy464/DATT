
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
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
const listCuration = document.querySelector('.c-curation__list');

// get data 
const firebase = initializeApp(firebaseConfig);
const db = getFirestore(firebase);
  const singerRef = collection(db, "singer");
  const singersSnap = await getDocs(singerRef);
  singersSnap.forEach((doc) => {
    console.log(doc.data())
    const singerData = doc.data();
    renderSinger(singerData);
});

// render SingItem
function renderSinger(item) {
    const template = ` <li class="c-curation__item">
    <div class="c-curation__img">
    <img src="${item.image}" alt="">
  </div>
    <span class="c-curation__tooltip">${item.name}</span>
  </li>`
  listCuration.insertAdjacentHTML("beforeend", template);
}







 

