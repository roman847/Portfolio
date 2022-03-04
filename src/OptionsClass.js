import i18Obj from "./translate.js";

class PageOptions {
  constructor() {
    this.translateBlocks = document.querySelectorAll("[data-i18]");
    this.buttonSwitchLn = document.querySelector(".switch-lang");
    this.lngButtons = document.querySelectorAll(".lng-button");
    this.popup = document.querySelector(".container-popup");
  }

  options = {
    color: "white",
    lang: "en",
  };

  changeLang() {
    this.buttonSwitchLn.addEventListener("click", (e) => {
      this.changeBtnActive();
      if (e.target.classList.contains("en")) {
        this.options.lang = "en";
        this.changeBtnActive();
        e.target.classList.add("active");
        this.translateBlocks.forEach((el) => {
          el.textContent = i18Obj.en[el.dataset.i18];
        });
      } else if (e.target.classList.contains("ru")) {
        this.options.lang = "ru";
        this.changeBtnActive();
        e.target.classList.add("active");
        this.translateBlocks.forEach((el) => {
          el.textContent = i18Obj.ru[el.dataset.i18];
        });
      }
    });
  }

  changeBtnActive() {
    this.lngButtons.forEach((btn) => {
      btn.classList.remove("active");
    });
  }

  changeColor() {
    const changeColorBtn = document.querySelector(".switch-color");
    const changeColorSections = document.querySelectorAll(
      '[data-color = "white"]'
    );
    const btnPortfolio = document.querySelectorAll(".btn-portfolio");
    const burgerMenu = document.querySelector(".burger-line");
    const switchColor = document.querySelector(".switch-color_img");

    changeColorBtn.addEventListener("click", () => {
      if (this.options.color == "white") {
        this.options.color = "black";
        switchColor.src = "./assets/svg/Vector.svg";

        changeColorSections.forEach((el) => {
          el.style.backgroundColor = "white";
          el.style.color = "black";
          btnPortfolio.forEach((btn) => {
            btn.classList.add("light-theme");
          });
        });
      } else {
        this.options.color = "white";
        switchColor.src = "./assets/svg/carbonsun.svg";
        changeColorSections.forEach((el) => {
          el.style.backgroundColor = "black";
          el.style.color = "white";

          btnPortfolio.forEach((btn) => {
            btn.classList.remove("light-theme");
          });
        });
      }
    });
  }
}

export default PageOptions;
