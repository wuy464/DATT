
const rankTableAPI = 'https://mp3.zing.vn/xhr/chart-realtime?songId=0&videoId=0&albumId=0&chart=song&time=-1'
const listSong = document.querySelector(".c-modal__menu2");
const mainAudio = $(".c-player__audio audio");
const audio = document.querySelector('audio')
const playerImg = $(".c-player__img");
const playbtn = $(".play");
const pausebtn = $(".pause");
const nextbtn = $(".next");
const prevbtn = $(".prev");
const modalImg = $(".c-player__img img");
const modalTitle = $(".c-player__namesong");
const modalAuthor = $(".c-player__nameauthor");
const rangeBar = $(".c-player__progress input");
const volBar = $(".c-player__vol input");
const random = $(".random");
const startTime = $('.c-player__start');
const endTime = $('.c-player__end');
const unMute = $(".c-player__volmedium");
const mute = $(".c-player__mute");
const repeatbtn = $(".loop");
const iconPause = $('.icon-pause');
const iconPlay = $('.icon-play');



let indexSong = 1;
let music;
let timer;
let isRepeat = false;
displayTimer();

playbtn.click(playAudio);
pausebtn.click(pauseAudio);

function renderSongs(item) {
    const template = `<div class="c-modal__songitem" data-music-id=${item.id}>
      <span class="c-modal__number"></span>
      <img class="c-modal__image" src="${item.thumbnail}" alt="">
      <div class="c-modal__info">
        <span class="c-modal__song">${item.name}</span>
        <span class="c-modal__author">${item.artists_names}</span>
      </div>
     
      <span class="c-modal__icon icon-play">
        <ion-icon name="play-circle-outline"></ion-icon>
      </span>
      
    </div>`;
    listSong.insertAdjacentHTML("beforeend", template);
  }

  let data;
  let songUrl;
  let songID;
async function getApiSong(url = rankTableAPI) {
    const res = await fetch(url);
    const json = await res.json()
    data = json.data.song;
    console.log(data)
    listSong.innerHTML = '';
    data.forEach((item) => {
        renderSongs(item)
    });
}
getApiSong()

listSong.addEventListener('click', function(e) {
    console.log(e.target)
    songID = e.target.getAttribute('data-music-id');
    console.log(songID)
    music = data.find(item => item.id === songID)
 
    console.log(music)
    indexSong = data.indexOf(music);
    songUrl = `http://api.mp3.zing.vn/api/streaming/audio/${songID}/320`
    $(mainAudio[0]).attr('src', songUrl)
    localStorage.setItem("currentSong", songID);
   
    loadSong()
    playAudio()
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
    pausebtn.css('color', '#fcc5c1')
    pausebtn.css('display', 'none');
    clearInterval(timer)
  }



  function loadSong() {
    music = data[indexSong]
    modalTitle.text(music.name);
    modalAuthor.text(music.artists_names);
    modalImg.attr("src", `${music.thumbnail}`);
    songID = music.id
    songUrl = `http://api.mp3.zing.vn/api/streaming/audio/${songID}/320`
    $(mainAudio[0]).attr("src", songUrl);
    const active = $('.c-modal__songitem')[indexSong];
    $('.c-modal__songitem').removeClass('is-active')
    $(active).addClass('is-active');
   
  }


  nextbtn.click(function() {
    indexSong++
    indexSong > data.length ? indexSong = 0 : indexSong = indexSong;
    loadSong()
    playAudio()
     
  })
  prevbtn.click(function() {
    indexSong--;
    indexSong < 0 ? indexSong = data.length : indexSong = indexSong;
    loadSong()
    playAudio()
  })

  
// hien thi thoi gian
function displayTimer() {
    const duration = mainAudio[0].duration;
    const currentTime = mainAudio[0].currentTime;
    const vol = mainAudio[0].volume * 100;
    rangeBar[0].value = currentTime
    rangeBar[0].max = duration
    volBar[0].value = vol
  
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
function changeVolPlayer() {
   vol = volBar.value
  }
  volBar.change(changeVolPlayer)
  
  unMute.click(toggleMuteVol)
  mute.click(toggleMuteVol)
  let volMute = false
function toggleMuteVol() {
  if(volMute == false) {
    volMute = true;
    console.log(volMute)
    unMute.css('display', 'none');
    mute.css('display', 'block');
    mainAudio[0].volume = 0;
  } else {
    volMute = false;
    unMute.css('display', 'block');
    mute.css('display', 'none');
    mainAudio[0].volume = 1;
  }
}

audio.addEventListener('ended', endedAudio)
function endedAudio() {
  if(isRepeat) {
    indexSong = indexSong
    loadSong()
    playAudio()
  }else {
    indexSong++;
    loadSong()
    playAudio()
    indexSong > data.length ? indexSong = 0 : indexSong = indexSong
  }
}
repeatbtn.click(function() {
if(isRepeat) {
  isRepeat = false
  repeatbtn.css('color', '#fff')
}else {
  isRepeat = true
  repeatbtn.css('color', '#fcc5c1')
}
})

