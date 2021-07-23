const music = document.querySelector("audio");
const img = document.querySelector("img");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const play = document.getElementById("play");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
let Progress = document.getElementById("progress");
const CurrentTime = document.getElementById("current_time");
let Duration = document.getElementById("duration");
let ProgressDiv = document.getElementById("progress_div");

let isPlay = false;
// play functionality
const playMusic = () => {
  isPlay = true;
  music.play();
  play.classList.replace("fa-play", "fa-pause");
  img.classList.add("rotating");
  setInterval(createBubbleAnimation, 600);
};
// pause functionality
const pauseMusic = () => {
  isPlay = false;
  music.pause();
  play.classList.replace("fa-pause", "fa-play");
  img.classList.remove("rotating");
};
play.addEventListener("click", () => {
  isPlay ? pauseMusic() : playMusic();
});
// changing the music data
const songs = [
  {
    name: "first",
    title: "Sajna",
    artist: "Ishpreet Singh",
  },
  {
    name: "second",
    title: "O Likh Di",
    artist: "Sachet Parampara",
  },
  {
    name: "third",
    title: "Teri Meri",
    artist: "Rahat",
  },
];

const loadSong = (songs) => {
  title.textContent = songs.title;
  artist.textContent = songs.artist;
  music.src = `music/${songs.name}.mp3`;
  img.src = `images/${songs.name}.jpg`;
};

let songIndex = 0;
const nextSong = () => {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songs[songIndex]);
  playMusic();
};
const prevSong = () => {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songs[songIndex]);
  playMusic();
};

// progress functionality
music.addEventListener("timeupdate", (event) => {
  const { currentTime, duration } = event.srcElement;
  let progress_time = (currentTime / duration) * 100;
  Progress.style.width = `${progress_time}%`;

  //  music duration update
  let min_duration = Math.floor(duration / 60);
  let sec_duration = Math.floor(duration % 60);
  Durations = `${min_duration}:${sec_duration}`;
  if (duration) {
    Duration.textContent = `${Durations}`;
  }
  //current time
  let min_currentTime = Math.floor(currentTime / 60);
  let sec_currentTime = Math.floor(currentTime % 60);
  if (sec_currentTime < 10) {
    sec_currentTime = `0${sec_currentTime}`;
  }
  CurrentTimes = `${min_currentTime}:${sec_currentTime}`;
  CurrentTime.textContent = `${CurrentTimes}`;
});
//progressdiv functionality
ProgressDiv.addEventListener("click", (event) => {
  const { duration } = music;
  let move_progress = (event.offsetX / event.srcElement.clientWidth) * duration;
  music.currentTime = move_progress;
});
//  if music end so call next song
music.addEventListener("ended", nextSong);
next.addEventListener("click", nextSong);
prev.addEventListener("click", prevSong);

//create bubble animation
function createBubbleAnimation() {
  const mainDiv = document.querySelector(".main_div");
  const createElement = document.createElement("span");
  var size = 42;
  createElement.style.width = 20 + size + "px";
  createElement.style.height = 20 + size + "px";
  createElement.style.top = Math.random() * innerWidth + "px";
  createElement.style.left = Math.random() * innerWidth + "px";

  mainDiv.appendChild(createElement);
  setTimeout(() => {
    createElement.remove();
  }, 4000);
}
