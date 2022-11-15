function convertSnapshortToArray(snapshot) {
  let result = [];
  snapshot.forEach(function (snap) {
    result.push({ id: snap.id, ...snap.data() });
  });
  return result;
}

// const mainAudio = $(".c-player__audio audio");




console.log(mainAudio);
console.dir(mainAudio);


function randomPlay() {
  random.toggleClass('is-random')
}

random.click(randomPlay)


