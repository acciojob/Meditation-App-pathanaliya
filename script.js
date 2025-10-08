const playBtn = document.querySelector(".play");
const timeDisplay = document.querySelector(".time-display");
const video = document.querySelector(".vid-container video");
const outline = document.querySelector(".moving-outline circle");
const audio = document.querySelector(".sound");

const outlineLength = outline.getTotalLength();
outline.style.strokeDasharray = outlineLength;
outline.style.strokeDashoffset = outlineLength;

// Default 10 mins
let fakeDuration = 600;
timeDisplay.textContent = "10:0"; // Match test expected format

// Play / Pause
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

// Time buttons
document.querySelector(".smaller-mins").addEventListener("click", () => {
  fakeDuration = 120;
  timeDisplay.textContent = "2:0";
});
document.querySelector(".medium-mins").addEventListener("click", () => {
  fakeDuration = 300;
  timeDisplay.textContent = "5:0";
});
document.querySelector(".long-mins").addEventListener("click", () => {
  fakeDuration = 600;
  timeDisplay.textContent = "10:0";
});

// Change sounds/videos
document.querySelectorAll(".sound-picker button").forEach(btn => {
  btn.addEventListener("click", function () {
    const sound = this.getAttribute("data-sound");
    const vid = this.getAttribute("data-video");
    audio.src = sound;
    video.src = vid;
    if (playBtn.textContent === "⏸") {
      audio.play();
      video.play();
    }
  });
});

// Animate Circle
audio.ontimeupdate = () => {
  let currentTime = audio.currentTime;
  let elapsed = fakeDuration - currentTime;
  let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;

  outline.style.strokeDashoffset = progress;

  // Reduce time every second
  let mins = Math.floor(elapsed / 60);
  let secs = Math.floor(elapsed % 60);
  timeDisplay.textContent = `${mins}:${secs}`;

  if (currentTime >= fakeDuration) {
    audio.pause();
    video.pause();
    playBtn.textContent = "▶";
    audio.currentTime = 0;
    outline.style.strokeDashoffset = outlineLength;
    timeDisplay.textContent = "10:0";
  }
};
