let songs        = [];
let currentIndex = 0;
const audio      = new Audio();

const playBtnIco = document.getElementById('playpause'); 
const playBtn    = document.querySelector('.playbtn');   
const nextBtn    = document.getElementById('next');
const prevBtn    = document.getElementById('prev');
const infoBox    = document.querySelector('.songinfo');

let isPlaying = false;

// load playlist
fetch('songs.json')
  .then(res => res.json())
  .then(list => {
    songs = list;
    if (songs.length) loadSong(0);      
  })
  .catch(err => console.error('songs.json?', err));


function loadSong(index) {
  currentIndex = (index + songs.length) % songs.length; 
  audio.src    = songs[currentIndex].url;
  infoBox.textContent = songs[currentIndex].title || 'Unknown';
}

// play and pause
playBtn.addEventListener('click', async () => {
  if (!audio.src) return;

  if (isPlaying) {
    audio.pause();
    playBtnIco.src = 'play.svg';
  } else {
    await audio.play();
    playBtnIco.src = 'pause.svg';
  }
  isPlaying = !isPlaying;
});

// next and previous
nextBtn.addEventListener('click', () => {
  if (!songs.length) return;
  loadSong(currentIndex + 1);  
  audio.play();                 
  playBtnIco.src = 'pause.svg';
  isPlaying = true;
});

prevBtn.addEventListener('click', () => {
  if (!songs.length) return;
  loadSong(currentIndex - 1);   // move backward
  audio.play();
  playBtnIco.src = 'pause.svg';
  isPlaying = true;
});

// Auto‑advance when a track ends /
audio.addEventListener('ended', () => nextBtn.click());







