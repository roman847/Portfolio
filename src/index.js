// import "./style/swiper.sccs";

import CreateImages from "./images.js";
import Popup from "./navPopup.js";
import PageOptions from "./OptionsClass";
import i18Obj from "./translate.js";
import VideoPlayer from "./video.js";

import Swiper from "swiper/bundle";
import "swiper/css/bundle";

import "animate.css";
import "./style/index.scss";
import "./style/video.scss";
import "./style/swiper.scss";

const setImages = new CreateImages();
setImages.pushImages();

const setPage = new PageOptions();
setPage.changeLang();
setPage.changeColor();

const setBurgerMenu = new Popup();
setBurgerMenu.openBurgerMenu();

//VideoPlayer
const Video = new VideoPlayer();
Video.clickMyVid();
Video.clickPlay();
Video.changeVolume();
Video.toggleScreen();
Video.changeProgress();
Video.skipProgress();
Video.clickStop();
Video.clickSound();

//Video-slider
var galleryTop = new Swiper(".gallery-top", {
  spaceBetween: 10,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    // dynamicBullets: true,
  },

  loop: true,
  loopedSlides: 4,
  slidesPerView: 3,
});

//Add link main video
function videoSlider(link, poster) {
  document.querySelector(".player__video").src = link;
  document.querySelector(".player__video").poster = poster;
}

//Interaction with slides
document.querySelectorAll(".video-slider").forEach((el) => {
  el.addEventListener("click", (e) => {
    if (e.target.paused) {
      stopAll();
      videoSlider(e.target.src, e.target.poster);

      e.target.play();
    } else {
      e.target.pause();
      videoSlider(e.target.src, e.target.poster);
    }
  });
});

//Main video shows active slide
function showActiveSlide() {
  let activeSlide = document.querySelector(".swiper-slide-active");
  let activeVideo = activeSlide.querySelector("video");
  document.querySelector(".main-video").src = activeVideo.src;
  document.querySelector(".main-video").poster = activeVideo.poster;
}

document
  .querySelector(".swiper-container")
  .addEventListener("mouseup", showActiveSlide);

document
  .querySelector(".swiper-container")
  .addEventListener("touchend", showActiveSlide);

document.querySelectorAll(".swiper-button").forEach((button) => {
  button.addEventListener("click", () => {
    showActiveSlide();
  });
});
document.querySelector(".swiper-pagination").addEventListener("click", (e) => {
  if (e.target.tagName == "SPAN") {
    showActiveSlide();
  }
});
//Stop playing all slides
function stopAll() {
  document.querySelectorAll(".video-slider").forEach((el) => {
    el.pause();
  });
}

//LocalStorage
function workLocalStorage() {
  function saveOptions() {
    function setLocalStorage() {
      localStorage.setItem("options", JSON.stringify(setPage.options));
      localStorage.setItem("options", JSON.stringify(setPage.options));
    }
    window.addEventListener("beforeunload", setLocalStorage);
  }
  saveOptions();

  function getOptions() {
    function getLocalStorage() {
      let res = JSON.parse(localStorage.getItem("options"));

      if (res.color == "black") {
        setPage.options.color = "black";
        const changeColorBtn = document.querySelector(".switch-color");
        const changeColorSections = document.querySelectorAll(
          '[data-color = "white"]'
        );
        const btnPortfolio = document.querySelectorAll(".btn-portfolio");
        changeColorSections.forEach((el) => {
          el.style.backgroundColor = "white";
          el.style.color = "black";

          btnPortfolio.forEach((btn) => {
            btn.classList.add("light-theme");
          });
        });
      } else {
        setPage.options.color = "white";
      }

      if (res.lang == "ru") {
        setPage.options.lang = "ru";
        this.translateBlocks = document.querySelectorAll("[data-i18]");

        this.translateBlocks.forEach((el) => {
          el.textContent = i18Obj.ru[el.dataset.i18];
        });

        setPage.changeBtnActive();
        document.querySelector(".ru").classList.add("active");
      }
    }
    window.addEventListener("load", getLocalStorage);
  }
  getOptions();
}
workLocalStorage();
