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
const db = getFirestore(firebase);
const auth = getAuth();
const userRef = collection(db, "user");

function createUserDB(data) {
  console.log(data);
  addDoc(userRef, {
    email: data.email,
    firstname: data.firstname,
    lastname: data.lastname,
  })
    .then((docRef) => {
      console.log("Document has been added successfully");
        window.location.href = './login.html'
    })
    .catch((error) => {
      console.log(error);
    });
}

function createUserAuth(data) {
  console.log(data);
  createUserWithEmailAndPassword(auth, data.email, data.password)
    .then((userCredential) => {
      // Signed in
      console.log(userCredential.user);
      createUserDB(data);
      //   localStorage("token", userCredential.uid);
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
      // ..
    });
}
const registerForm = document.querySelector(".c-register__form");

registerForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const firstname = formData.get("firstname");
  const lastname = formData.get("lastname");
  const email = formData.get("email");
  const password = formData.get("password");
  createUserAuth({ firstname, lastname, email, password });
  console.log(formData)
});

// function logOut() {
//   signOut(auth)
//     .then(() => {
//       // Sign-out successful.
//     })
//     .catch((error) => {
//       // An error happened.
//     });
// }
// function Login(data) {
//   createUserWithEmailAndPassword(data.email, data.password)
//     .then((userCredential) => {
//       // Signed in
//       var user = userCredential.user;
//       // ...
//     })
//     .catch((error) => {
//       var errorCode = error.code;
//       var errorMessage = error.message;
//       // ..
//     });
// }

// formlogin.addEventListener("submit", function (e) {
//   e.preventDefault();
//   const formData = new FormData(e.target);
//   console.log(formData);
//   const email = formData.get("email");
//   const pass = formData.get("password");
//   console.log(email);
//   Login(email, pass);
// });
// onAuthStateChanged(auth, (user) => {
//   if (user) {
//     // User is signed in, see docs for a list of available properties
//     // https://firebase.google.com/docs/reference/js/firebase.User
//     window.location.href = "/";
//     // ...
//   } else {
//     // User is signed out
//     // ...
//   }
// });
