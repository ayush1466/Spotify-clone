/***** GLOBALS *****/
let songs        = [];
let currentIndex = 0;
let isPlaying    = false;
const audio      = new Audio();

/***** DOM ELEMENTS *****/
const playPauseBtn  = document.getElementById("playpause");
const songInfo      = document.getElementById("songinfo-text");
const prevBtn       = document.getElementById("prev");
const nextBtn       = document.getElementById("next");
const currentTimeEl = document.getElementById("current");
const durationEl    = document.getElementById("duration");
const progressBar = document.getElementById("progress");

/***** FETCH PLAYLIST + RENDER LIBRARY *****/
fetch("songs.json")
  .then(r => r.json())
  .then(data => {
    songs = data;
    const library = document.getElementById("library-songs");

    songs.forEach((song, idx) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <span>${song.title}</span>
        <img src="play.svg" class="play-icon" data-index="${idx}" />
      `;
      library.appendChild(li);
    });

    // Play buttons inside the library
    document.querySelectorAll(".play-icon").forEach(btn =>
      btn.addEventListener("click", () =>
        playSong(+btn.dataset.index)
      )
    );

    // Optional: play buttons on cards
    document.querySelectorAll(".card .play").forEach((btn, idx) =>
      btn.addEventListener("click", () => playSong(idx))
    );
  });

/***** CORE FUNCTIONS *****/
function playSong(index) {
  currentIndex = index;
  const song   = songs[currentIndex];
  audio.src    = song.url;
  audio.play();
  isPlaying = true;
  updateUI(song);
}

function updateUI(song) {
  songInfo.textContent = `${song.title} — ${song.artist}`;
  playPauseBtn.src     = "pause.svg";
}

/***** PLAY / PAUSE TOGGLE *****/
playPauseBtn.addEventListener("click", () => {
  if (!audio.src) return;                // no track loaded yet
  if (isPlaying) {
    audio.pause();
    playPauseBtn.src = "play.svg";
  } else {
    audio.play();
    playPauseBtn.src = "pause.svg";
  }
  isPlaying = !isPlaying;
});

/***** PREVIOUS & NEXT *****/
prevBtn.addEventListener("click", () => {
  playSong((currentIndex - 1 + songs.length) % songs.length);
});
nextBtn.addEventListener("click", () => {
  playSong((currentIndex + 1) % songs.length);
});

/***** TIME & DURATION HANDLING *****/
audio.addEventListener("loadedmetadata", () => {
  durationEl.textContent = formatTime(audio.duration);
});

audio.addEventListener("timeupdate", () => {
  currentTimeEl.textContent = formatTime(audio.currentTime);
});

/***** UTIL: FORMAT mm:ss *****/
function formatTime(sec) {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

audio.addEventListener("timeupdate", () => {
  const percent = (audio.currentTime / audio.duration) * 100;
  progressBar.value = percent || 0;
  currentTimeEl.textContent = formatTime(audio.currentTime);
});

progressBar.addEventListener("input", () => {
  const seekTime = (progressBar.value / 100) * audio.duration;
  audio.currentTime = seekTime;
});










