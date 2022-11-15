
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  setDoc,
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

const list = document.querySelector('#customers')




// get data 
const firebase = initializeApp(firebaseConfig);
const db = getFirestore(firebase);
  const musicRef = collection(db, "music");
  const musicsSnap = await getDocs(musicRef);
  
    musicsSnap.forEach((doc) => {
      renderMusic({ id: doc.id, ...doc.data() });
      console.log({ id: doc.id, ...doc.data() })
    });
   
    // const musicsArr = convertSnapshortToArray(musicsSnap);
   

// render MusicItem
function renderMusic(item) {
    const template = `
   <tr class="item" data-song-id='${item.id}'>
   <td><input class='input-author' type="text" value='${item.author}'disabled></td>
   <td><input class='input-name' type="text" value='${item.name}'disabled></td>
   <td><img src="${item.image}" alt=""></td>
   <td><input class='input-url' type="text" value='${item.url}'disabled></td>
   <td class='setting'>
               <span class='add'> <ion-icon name="add-circle-outline"></ion-icon></span>
               <span data-bs-toggle="modal" data-bs-target="#exampleModal" class='delete'> <ion-icon name="trash-outline"></ion-icon></span>
               <span class='update'> <ion-icon name="build-outline"></ion-icon></ion-icon></span>
            </td>
   <td class='done'>
               <span class='add'><ion-icon name="checkmark-done-outline"></ion-icon></span>
               
            </td>
   </tr>
  `
  list.insertAdjacentHTML("beforeend", template);
}
const formAdd = document.querySelector('.c-admin__add')
const formUpdate = document.querySelector('.c-admin__update')
const updateBtn =document.querySelectorAll('.update')
const deleteBtn = document.querySelectorAll('.delete')
const addBtn = document.querySelectorAll('.add')
const buttonAdd = document.querySelector('.button-add')
const buttonUpdate = document.querySelector('.button-update')
const itemMusic = document.querySelectorAll('.item');
const authorInput = document.querySelector('.c-admin__author1');
const nameInput = document.querySelector('.c-admin__name1');
const imageInput = document.querySelector('.c-admin__image1');
const urlInput = document.querySelector('.c-admin__url1');
const settingAuthor = document.querySelector('.input-author');
const settingName = document.querySelector('.input-name');
const settingUrl = document.querySelector('.input-url');
const closeDelete = document.querySelector('.closeDelete');
const doneDelete = document.querySelector('.doneDelete');



let idSong;


updateBtn.forEach(item => {
    item.addEventListener('click', function() {
      formUpdate.style.display = 'flex'
      formAdd.style.display = 'none'
         let parent = item.parentElement;
         let parentItem = parent.parentElement //item
         console.log(parentItem)
         idSong = parentItem.getAttribute('data-song-id')
         console.log(idSong)
        const inputAuthor =  parentItem.children[0].children
        const inputName =  parentItem.children[1].children
        const inputImage =  parentItem.children[2].children
        const inputURL =  parentItem.children[3].children
        console.log(inputAuthor[0], inputImage[0], inputName[0], inputURL[0])
        console.log(authorInput)
        authorInput.value = inputAuthor[0].value
        nameInput.value = inputName[0].value
        imageInput.value = inputImage[0].src
        urlInput.value = inputURL[0].value
    })
})

deleteBtn.forEach(item => {
  item.addEventListener('click', function() {
       let parent = item.parentElement;
       let parentItem = parent.parentElement //item
       console.log(parentItem)
       idSong = parentItem.getAttribute('data-song-id')
       console.log(idSong)
  })
})
doneDelete.addEventListener('click', function() {
  deleteData(idSong)
})

addBtn.forEach(item => {
  item.addEventListener('click', function() {
    formUpdate.style.display = 'none'
    formAdd.style.display = 'flex'
  })
})
//






formAdd.addEventListener("submit", function (e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log(formData);
    const author = formData.get("author");
    const name = formData.get("name");
    const image = formData.get("image");
    const url = formData.get("url");

    if(author == '' || name == '' || image == '' || url == '') {
      alert('Data empty')
        return false;
    }else {
      let data = {author, name, image, url}
      addData(data)
    }
  });

formUpdate.addEventListener("submit", function (e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log(formData);
    const author = formData.get("author");
    const name = formData.get("name");
    const image = formData.get("image");
    const url = formData.get("url");
    if(author == '' || name == '' || image == '' || url == '') {
      alert('Data empty')
        return false;
    }else {
      let data = {author, name, image, url}
      updateData(data)
    }
  });



  function addData(data) {
    addDoc(musicRef, data)
    .then(docRef => {
        alert("Document has been added successfully");
        location.reload();
    })
    .catch(error => {
        alert(error);
    })
}
function updateData(data) {
  const docRef = doc(db, "music", idSong); 
  setDoc(docRef, data)
  .then(docRef => {
      alert("Update music is success");
      location.reload();
  })
  .catch(error => {
      alert(error);
  })
}

function deleteData(id){
const docRef = doc(db, "music", id);

deleteDoc(docRef)
.then(() => {
    alert("Deleted successfully.")
    location.reload();
})
.catch(error => {
    console.log(error);
})
}



// phantrang

  







 
