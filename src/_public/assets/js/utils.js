function convertSnapshortToArray(snapshot) {
  let result = [];
  snapshot.forEach(function (snap) {
    result.push({ id: snap.id, ...snap.data() });
  });
  return result;
}

const mainAudio = $(".c-player__audio audio");
const modalImg = $(".c-player__img img");
const modalTitle = $(".c-player__namesong");
const modalAuthor = $(".c-player__nameauthor");
const random = $(".random");
const startTime = $('.c-player__start');
const endTime = $('.c-player__end');


console.log(mainAudio);
console.dir(mainAudio);


function randomPlay() {
  random.toggleClass('is-random')
}

random.click(randomPlay)


