//your JS code here. If required.
const playBtn = document.querySelector(".play");
const timeDisplay = document.querySelector(".time-display");
const video = document.querySelector(".vid-container video");
const outline = document.querySelector(".moving-outline circle");

// Audio setup
let audio = new Audio("./Sounds/beach.mp3");

// Circle setup
const outlineLength = outline.getTotalLength();
outline.style.strokeDasharray = outlineLength;
outline.style.strokeDashoffset = outlineLength;

// Default duration (10 mins)
let fakeDuration = 600;

// Update display initially
timeDisplay.textContent = formatTime(fakeDuration);

// Format helper
function formatTime(sec) {
  const mins = Math.floor(sec / 60);
  const secs = Math.floor(sec % 60);
  return `${mins}:${secs < 10 ? "0" + secs : secs}`;
}

// Play / Pause toggle
playBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    video.play();
    playBtn.textContent = "⏸";
  } else {
    audio.pause();
    video.pause();
    playBtn.textContent = "▶";
  }
});

// Time Select
document.getElementById("smaller-mins").addEventListener("click", () => {
  fakeDuration = 120;
  timeDisplay.textContent = formatTime(fakeDuration);
});

document.getElementById("medium-mins").addEventListener("click", () => {
  fakeDuration = 300;
  timeDisplay.textContent = formatTime(fakeDuration);
});

document.getElementById("long-mins").addEventListener("click", () => {
  fakeDuration = 600;
  timeDisplay.textContent = formatTime(fakeDuration);
});

// Switch sounds/videos
document.querySelectorAll(".sound-picker button").forEach(btn => {
  btn.addEventListener("click", function () {
    const sound = this.getAttribute("data-sound");
    const vid = this.getAttribute("data-video");

    audio.pause();
    video.pause();

    audio = new Audio(sound);
    video.src = vid;

    if (playBtn.textContent === "⏸") {
      audio.play();
      video.play();
    }
  });
});

// Animate Circle & Timer
audio.ontimeupdate = () => {
  let currentTime = audio.currentTime;
  let elapsed = fakeDuration - currentTime;
  let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;

  outline.style.strokeDashoffset = progress;
  timeDisplay.textContent = formatTime(elapsed);

  if (currentTime >= fakeDuration) {
    audio.pause();
    video.pause();
    playBtn.textContent = "▶";
    audio.currentTime = 0;
    outline.style.strokeDashoffset = outlineLength;
    timeDisplay.textContent = formatTime(fakeDuration);
  }
};