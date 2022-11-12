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
  measurementId: "G-WBZEELBQSK",
};
// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const db = getFirestore(firebase);

const listSong = document.querySelector(".c-modal__menu2");
const nextbtn = $(".next");
const prevbtn = $(".prev");
const playbtn = $(".play");
const repeatbtn = $(".loop");
const pausebtn = $(".pause");
const rangeBar = $(".c-player__progress input");
const playerImg = $(".c-player__img");
const musicRef = collection(db, "music");
const musicsSnap = await getDocs(musicRef);
const audio = document.querySelector('audio')



let timer;
displayTimer();

// click player
playbtn.click(playAudio);
pausebtn.click(pauseAudio);
let isRepeat = false;




//render song
musicsSnap.forEach((doc) => {
  renderSongs({ id: doc.id, ...doc.data() });
});
const musicsArr = convertSnapshortToArray(musicsSnap);
function renderSongs(item) {
  const template = `<div class="c-modal__songitem " data-music-id=${item.id}>
  <div class="load-1">
    <div class="line"></div>
    <div class="line"></div>
    <div class="line"></div>
  </div>
    <span class="c-modal__number"></span>
    <img class="c-modal__image" src="${item.image}" alt="">
    <div class="c-modal__info">
      <span class="c-modal__song">${item.name}</span>
      <span class="c-modal__author">${item.author}</span>
    </div>
   
    <span class="c-modal__icon">
      <ion-icon name="play-circle-outline"></ion-icon>
    </span>
  </div>`;
  listSong.insertAdjacentHTML("beforeend", template);
}
let indexMusic = 0;
let music;
$('.c-modal__songitem').click(function () {
  const item = $(this)[0];
  const musicId = $(item).data("music-id");
  music = musicsArr.find((item) => item.id === musicId );
  indexMusic = musicsArr.indexOf(music);
  localStorage.setItem("currentSong", music.id);
  loadMusic();
  playAudio();
});
loadMusic()
//load next and prev song
function loadMusic() {
    music = musicsArr[indexMusic];
    modalTitle.text(music.name);
    modalAuthor.text(music.author);
    modalImg.attr("src", `${music.image}`);
    $(mainAudio).attr("src", `${music.url}`);
    const active = $('.c-modal__songitem')[indexMusic];
    $('.c-modal__songitem').removeClass('is-active')
    $(active).addClass('is-active');
    
   
}


//load localstorange
$(document).ready(function () {
  const musicID = localStorage.getItem("currentSong");
  console.log(musicID);
  if (musicID) {
    const music = musicsArr.find((item) => item.id === musicID);
    if (music) {
     let  indexSong = musicsArr.indexOf(music);
        let songLocal = musicsArr[indexSong];
        modalTitle.text(songLocal.name);
        modalAuthor.text(songLocal.author);
        modalImg.attr("src", `${songLocal.image}`);
        $(mainAudio).attr("src", `${songLocal.url}`);
        
    }
  }
});






nextbtn.click(function() {
    indexMusic++
    indexMusic > musicsArr.length ? indexMusic = 0 : indexMusic = indexMusic;
    loadMusic()
    playAudio()
     
  })
  prevbtn.click(function() {
    indexMusic--;
    indexMusic < 0 ? indexMusic = musicsArr.length : indexMusic = indexMusic;
    loadMusic()
    playAudio()
  })



// let isPlaying = true;
// function playPause() {
//   if(isPlaying) {
//    mainAudio[0].play()
//    playbtn.css('display', 'none');
//   pausebtn.css('display', 'block');
//     isPlaying = false;
//     timer = setInterval(displayTimer, 500)
//   }else {
//     mainAudio[0].pause();
//       pausebtn.css('display', 'none');
//   playbtn.css('display', 'block');
//     isPlaying = true;
//     clearInterval(timer)
  
//   }
// }

// hien thi thoi gian
function displayTimer() {
  const duration = mainAudio[0].duration;
  const currentTime = mainAudio[0].currentTime;
  rangeBar[0].value = currentTime
  rangeBar[0].max = duration
  if(!duration) {
    startTime.text('00:00')
  }else {
      endTime.text(formatTimer(duration))
      startTime.text(formatTimer(currentTime))
    }
}



//format time
function formatTimer(number) {
  const minutes = Math.floor(number / 60);
  const second = Math.floor(number - minutes * 60);
  return `${minutes}:${second < 10 ? `0${second}` : second}`
}


function changeBarPlayer() {
    mainAudio[0].currentTime =  rangeBar[0].value
}
rangeBar.change(changeBarPlayer)

audio.addEventListener('ended', endedAudio)
function endedAudio() {
  
  if(isRepeat) {
    indexMusic = indexMusic
    loadMusic()
    playAudio()
  }else {
    indexMusic++;
    loadMusic()
    playAudio()
    indexMusic > musicsArr.length ? indexMusic = 0 : indexMusic = indexMusic
  }
}

repeatbtn.click(function() {
if(isRepeat) {
  isRepeat = false
}else {
  isRepeat = true
}
  console.log(isRepeat)
})


function playAudio() {
  mainAudio[0].play();
  playerImg.addClass('is-playing')
  playbtn.css('display', 'none');
  pausebtn.css('display', 'block');
  
  timer = setInterval(displayTimer, 500)
}
function pauseAudio() {
  mainAudio[0].pause();
  playerImg.removeClass('is-playing')
  playbtn.css('display', 'block');
  pausebtn.css('display', 'none');
  clearInterval(timer)
}






//search


// const expand = () => {
//   searchBtn.classList.toggle("close");
//   input.classList.toggle("square");
// };

// searchBtn.addEventListener("click", expand);


// function updateCurrTime() {
//   nTime = new Date();
//   nTime = nTime.getTime();

//   if (!tFlag) {
//     tFlag = true;
//     trackTime.addClass("active");
//   }

//   curMinutes = Math.floor(audio.currentTime / 60);
//   curSeconds = Math.floor(audio.currentTime - curMinutes * 60);

//   durMinutes = Math.floor(audio.duration / 60);
//   durSeconds = Math.floor(audio.duration - durMinutes * 60);

//   playProgress = (audio.currentTime / audio.duration) * 100;

//   if (curMinutes < 10) curMinutes = "0" + curMinutes;
//   if (curSeconds < 10) curSeconds = "0" + curSeconds;

//   if (durMinutes < 10) durMinutes = "0" + durMinutes;
//   if (durSeconds < 10) durSeconds = "0" + durSeconds;

//   if (isNaN(curMinutes) || isNaN(curSeconds)) tProgress.text("00:00");
//   else tProgress.text(curMinutes + ":" + curSeconds);

//   if (isNaN(durMinutes) || isNaN(durSeconds)) tTime.text("00:00");
//   else tTime.text(durMinutes + ":" + durSeconds);

//   if (
//     isNaN(curMinutes) ||
//     isNaN(curSeconds) ||
//     isNaN(durMinutes) ||
//     isNaN(durSeconds)
//   )
//     trackTime.removeClass("active");
//   else trackTime.addClass("active");

//   seekBar.width(playProgress + "%");

//   if (playProgress == 100) {
//     i.attr("class", "fa fa-play");
//     seekBar.width(0);
//     tProgress.text("00:00");
//     albumArt.removeClass("buffering").removeClass("active");
//     clearInterval(buffInterval);
//   }
// }