class Popup {
  constructor() {
    this.burgerOpen = document.querySelector(".burger-menu");
    this.navHeader = document.querySelector("#popup");
  }

  changeStatusPopup() {
    document
      .querySelector(".container-popup")
      .classList.toggle("container-popup-show");
    document.querySelector(".first").classList.toggle("first-close");
    document.querySelector(".second").classList.toggle("second-close");
    document.querySelector(".third").classList.toggle("third-close");
    document.querySelector(".fourth").classList.toggle("fourth-close");
  }

  openBurgerMenu() {
    this.burgerOpen.addEventListener("click", this.changeStatusPopup);
    this.navHeader.addEventListener("click", (e) => {
      if (e.target.classList.contains("nav-link")) {
        this.changeStatusPopup();
      }
    });
  }
}

export default Popup;
