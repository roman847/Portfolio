class VideoPlayer {
  constructor() {
    this.vidWrapper = document.querySelector("div.player");
    this.grap = false;
    this.drag = false;
  }

  //events
  clickMyVid() {
    document
      .querySelector(".main-video")
      .addEventListener("click", this.toggleVideo.bind(this));
  }

  clickPlay() {
    document
      .querySelector(".player__button")
      .addEventListener("click", this.toggleVideo.bind(this));
    document
      .querySelector(".play")
      .addEventListener("click", this.toggleVideo.bind(this));
  }

  changeVolume() {
    document
      .querySelector('.player__slider[name="volume"]')
      .addEventListener("change", this.updateVol);
  }

  toggleScreen() {
    document
      .querySelector(".player__fullscreen")
      .addEventListener("click", this.goFullScreen);
  }

  changeProgress() {
    let drag;
    let grap;
    let controlProgress = document.querySelector(".progress");
    controlProgress.addEventListener("mouseover", function () {
      drag = true;
    });
    controlProgress.addEventListener("mouseout", function () {
      drag = false;
      grap = false;
    });
    controlProgress.addEventListener("mousedown", function () {
      grap = drag;
    });
    controlProgress.addEventListener("mouseup", function () {
      grap = false;
    });
    controlProgress.addEventListener("click", this.updateCurrentPos);
    controlProgress.addEventListener("mousemove", function (e) {
      if (drag && grap) {
        this.updateCurrentPos(e);
      }
    });
  }
  skipProgress() {
    let controlSkip = this.vidWrapper.querySelectorAll(
      ".player__button[data-skip]"
    );

    controlSkip.forEach((control) =>
      control.addEventListener("click", this.forward)
    );
  }

  clickStop() {
    document.querySelector(".stop").addEventListener("click", this.stopVideo);
  }

  clickSound() {
    document
      .querySelector(".sound")
      .addEventListener("click", this.toggleSound);
  }
  //functions
  toggleVideo() {
    let myVid = document.querySelector(".main-video");
    let progression = 0;
    let playBtn = document.querySelector(".play");
    if (myVid.paused) {
      playBtn.style.display = "none";
      myVid.play();
      document
        .querySelector(".player-toggle")
        .setAttribute("src", "./assets/svg/music-pause-svgrepo-com.svg");
      this.updateProgress();
      progression = window.setInterval(this.updateProgress, 200);
      this.stopAllSliders();
    } else {
      playBtn.style.display = "block";
      myVid.pause();
      document
        .querySelector(".player-toggle")
        .setAttribute("src", "./assets/svg/music-play-svgrepo-com.svg");
      clearInterval(progression);
    }
  }

  updateProgress(video) {
    let myVid = document.querySelector("video.player__video");
    let progress = myVid.currentTime / myVid.duration;
    let progressBar = document.querySelector(".progress__filled");
    progressBar.style.flexBasis = Math.floor(progress * 1000) / 10 + "%";
  }

  updateVol() {
    let myVid = document.querySelector("video.player__video");
    let controlVol = document.querySelector('.player__slider[name="volume"]');
    let volume = this.value;
    let soundBtn = document.querySelector(".img-sound");
    myVid.volume = volume;
    if (volume > 0) {
      controlVol.style.background =
        "linear-gradient(90deg,rgb(189, 174, 130)" +
        volume * 100 +
        "%, rgb(214,214,214)" +
        volume * 100 +
        "%)";
      soundBtn.src = "./assets/svg/music-on.svg";
    } else {
      controlVol.style.background =
        "linear-gradient(90deg,rgb(189, 174, 130)" +
        volume * 100 +
        "%, rgb(214,214,214)" +
        volume * 100 +
        "%)";
      soundBtn.src = "./assets/svg/no-music.svg";
    }
  }

  toggleSound() {
    let controlVol = document.querySelector('.player__slider[name="volume"]');
    let myVid = document.querySelector("video.player__video");
    let soundBtn = document.querySelector(".img-sound");
    if (myVid.volume > 0) {
      myVid.volume = 0;
      soundBtn.src = "./assets/svg/no-music.svg";
    } else {
      myVid.volume = controlVol.value;
      soundBtn.src = "./assets/svg/music-on.svg";
    }
  }

  goFullScreen() {
    let myVid = document.querySelector("video.player__video");
    console.dir(myVid);
    if (myVid.webkitSupportsFullscreen) myVid.webkitEnterFullScreen();
  }

  updateCurrentPos(e) {
    //   offset of the progress bar / video wrapper width
    let vidWrapper = document.querySelector("div.player");
    let newProgress =
      (e.clientX - vidWrapper.offsetLeft) / vidWrapper.clientWidth;
    let myVid = document.querySelector("video.player__video");
    let progressBar = document.querySelector(".progress__filled");
    progressBar.style.flexBasis = Math.floor(newProgress * 1000) / 10 + "%";
    myVid.currentTime = newProgress * myVid.duration;
  }

  forward() {
    let myVid = document.querySelector("video.player__video");
    let value = Number(this.dataset.skip);
    myVid.currentTime = myVid.currentTime + value;
  }

  stopVideo() {
    let myVid = document.querySelector("video.player__video");
    // let value = Number(this.dataset.skip);
    myVid.currentTime = 0;
    myVid.pause();
    document
      .querySelector(".player-toggle")
      .setAttribute("src", "./assets/svg/music-play-svgrepo-com.svg");
  }

  stopAllSliders() {
    document.querySelectorAll(".video-slider").forEach((el) => {
      el.pause();
    });
  }
}

export default VideoPlayer;
