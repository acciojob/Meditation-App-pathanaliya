const song = document.querySelector(".song");
const play = document.querySelector(".play");
const outline = document.querySelector(".moving-outline circle");
const video = document.querySelector(".vid-container video");

const timeDisplay = document.querySelector(".time-display");
const timeSelect = document.querySelectorAll("#time-select button");
const soundPicker = document.querySelectorAll(".sound-picker button");

const outlineLength = outline.getTotalLength();
outline.style.strokeDasharray = outlineLength;
outline.style.strokeDashoffset = outlineLength;

let fakeDuration = 600; // Default 10 minutes

// Play / Pause function
play.addEventListener("click", () => {
  if (song.paused) {
    song.play();
    video.play();
    play.classList.add("pause");
  } else {
    song.pause();
    video.pause();
    play.classList.remove("pause");
  }
});

// Change sound & video
soundPicker.forEach(option => {
  option.addEventListener("click", function () {
    const soundSrc = this.getAttribute("data-sound");
    const videoSrc = this.getAttribute("data-video");
    song.src = soundSrc;
    video.src = videoSrc;
    checkPlaying(song);
  });
});

// Time selection buttons
timeSelect.forEach(option => {
  option.addEventListener("click", function () {
    if (this.id === "smaller-mins") fakeDuration = 120;
    if (this.id === "medium-mins") fakeDuration = 300;
    if (this.id === "long-mins") fakeDuration = 600;
    timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:0`;
  });
});

// Update circle + countdown
song.ontimeupdate = () => {
  let currentTime = song.currentTime;
  let elapsed = fakeDuration - currentTime;
  let minutes = Math.floor(elapsed / 60);
  let seconds = Math.floor(elapsed % 60);
  timeDisplay.textContent = `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;

  let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
  outline.style.strokeDashoffset = progress;

  if (currentTime >= fakeDuration) {
    song.pause();
    song.currentTime = 0;
    video.pause();
    play.classList.remove("pause");
  }
};

function checkPlaying(song) {
  if (!song.paused) {
    song.play();
    video.play();
  }
}
