let songs = [];
let currentIndex = 0;
const audio = new Audio();
const playBtn = document.querySelector('.playbtn img');
let isPlaying = false;

// Load songs.json
fetch('songs.json')
  .then(res => res.json())
  .then(data => {
    songs = data;
    console.log("Fetched songs:", songs);
    if (songs.length > 0) {
      audio.src = songs[currentIndex].url;
    }
  })
  .catch(err => console.error("Error fetching songs.json", err));

// Play/Pause logic
document.querySelector('.playbtn').addEventListener('click', () => {
  if (!audio.src) return;

  if (isPlaying) {
    audio.pause();
    playBtn.src = 'play.svg';
  } else {
    audio.play();
    playBtn.src = 'pause.svg';
  }
  isPlaying = !isPlaying;
});





