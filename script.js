fetch('songs.json')
  .then(res => res.json())
  .then(data => {
    console.log("Fetched songs:", data);
    // access like: data[0].title or data[0].url
  })
  .catch(err => console.error("Error fetching songs.json", err));

const audio = new Audio();

fetch('songs.json')
  .then(res => res.json())
  .then(data => {
    const firstSong = data[0];
    if (firstSong) {
      audio.src = firstSong.url;
      audio.play();
      console.log("Now playing:", firstSong.title);
    }
  })
  .catch(err => console.error("Error fetching or playing song:", err));
