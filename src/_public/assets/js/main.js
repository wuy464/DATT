const playbtn = document.querySelector('.c-header__play');
const pausebtn = document.querySelector('.c-header__pause');
const audio = document.querySelector('audio');
playbtn.addEventListener('click', function(e) {
    audio.play();
    let songTime = audio.duration
  
})
pausebtn.addEventListener('click', function(e) {
    audio.pause();
});



