 let videoContainer = document.getElementById('videoContainer');
let iframe = document.getElementById('vimeoPlayer');
let holdTimer = null;
let currentSpeed = 1;

function playVideo(url) {
  iframe.src = url;
  videoContainer.style.display = 'flex';
  document.getElementById("playPauseIcon").classList.replace("fa-pause-circle", "fa-play-circle");
}

function pausePlay() {
  const player = new Vimeo.Player(iframe);
  const icon = document.getElementById('playPauseIcon');

  player.getPaused().then(paused => {
    if (paused) {
      player.play();
      icon.classList.replace("fa-play-circle", "fa-pause-circle");
    } else {
      player.pause();
      icon.classList.replace("fa-pause-circle", "fa-play-circle");
    }
  });
}

function rotateScreen() {
  if (screen.orientation) {
    screen.orientation.lock("landscape").catch(err => alert("Rotation not supported"));
  } else {
    alert("Screen orientation API not supported");
  }
}

function goBack() {
  videoContainer.style.display = 'none';
  iframe.src = ''; // stop video
}

// Long press for 2x speed
iframe.addEventListener('touchstart', () => {
  const player = new Vimeo.Player(iframe);
  holdTimer = setTimeout(() => {
    currentSpeed = 2;
    player.setPlaybackRate(currentSpeed);
  }, 800);
});

iframe.addEventListener('touchend', () => {
  clearTimeout(holdTimer);
  const player = new Vimeo.Player(iframe);
  currentSpeed = 1;
  player.setPlaybackRate(currentSpeed);
});

function playVideo(videoUrl) {
  const videoPlayer = document.createElement('div');
  videoPlayer.classList.add('video-overlay');
  videoPlayer.innerHTML = `
    <div class="video-container">
      <button class="close-btn" onclick="this.parentElement.parentElement.remove()">×</button>
      <iframe src="${videoUrl}" frameborder="0" allowfullscreen></iframe>
    </div>
  `;
  document.body.appendChild(videoPlayer);
}

// play video function
function playVideo(videoUrl) {
    const videoContainer = document.getElementById("videoContainer");
    const vimeoPlayer = document.getElementById("vimeoPlayer");

    // Show the video container
    videoContainer.style.display = "block";

    // Hide main content
    document.querySelector(".lectures").style.display = "none";
    document.querySelector(".tab-buttons").style.display = "none";
    document.querySelector(".header").style.display = "none";

    // Set video URL
    vimeoPlayer.src = videoUrl;
}

// go back function
function goBack() {
    const videoContainer = document.getElementById("videoContainer");
    const vimeoPlayer = document.getElementById("vimeoPlayer");

    // Hide video container
    videoContainer.style.display = "none";

    // Show main content
    document.querySelector(".lectures").style.display = "block";
    document.querySelector(".tab-buttons").style.display = "flex";
    document.querySelector(".header").style.display = "block";

    // Stop video playback
    vimeoPlayer.src = "";
}
