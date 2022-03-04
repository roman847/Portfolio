import "./swiper.scss";
import Swiper from "swiper/bundle";
import "swiper/css/bundle";

var galleryTop = new Swiper(".gallery-top", {
  spaceBetween: 10,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  loop: true,
  loopedSlides: 4,
  slidesPerView: 1,
});
// var galleryThumbs = new Swiper(".gallery-thumbs", {
//   spaceBetween: 10,
//   centeredSlides: true,
//   slidesPerView: "auto",
//   touchRatio: 0.2,
//   slideToClickedSlide: true,
//   loop: true,
//   loopedSlides: 4,
// });
// galleryTop.controller.control = galleryThumbs;
// galleryThumbs.controller.control = galleryTop;
