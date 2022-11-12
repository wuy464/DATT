function convertSnapshortToArray(snapshot) {
  let result = [];
  snapshot.forEach(function (snap) {
    result.push({ id: snap.id, ...snap.data() });
  });
  return result;
}

const mainAudio = $(".c-player__audio audio");
const playbtn = $(".play");
const pausebtn = $(".pause");
const modalImg = $(".c-player__img img");
const modalTitle = $(".c-player__namesong");
const modalAuthor = $(".c-player__nameauthor");
const random = $(".random");


console.log(mainAudio);
console.dir(mainAudio);
function playAudio() {
  mainAudio[0].play();
  playbtn.css('display', 'none');
  pausebtn.css('display', 'block');
}
function pauseAudio() {
  console.log("pasue");
    mainAudio[0].pause();
    pausebtn.css('display', 'none');
    playbtn.css('display', 'block');
}

function randomPlay() {
  random.toggleClass('is-random')
}

random.click(randomPlay)
playbtn.click(playAudio);
pausebtn.click(pauseAudio);


