class CreateImages {
  constructor() {
    this.buttonsImages = document.querySelector(".container-buttons");
    this.images = document.querySelectorAll(".portfolio-image");
  }

  preloadSummerImages() {
    const seasons = ["winter", "spring", "summer", "autumn"];
    seasons.forEach((season) => {
      for (let i = 1; i <= 6; i++) {
        const img = new Image();
        img.style.transition = "0.7s";
        img.src = `./assets/img/${season}/${i}.jpg`;
      }
    });
  }

  pushImages() {
    this.preloadSummerImages();
    this.buttonsImages.addEventListener("click", (e) => {
      if (e.target.classList.contains("button-transparent")) {
        this.switchButtons();
        e.target.classList.add("btn-switched");
        this.images.forEach((img, index) => {
          img.src = `assets/img/${e.target.dataset.season}/${index + 1}.jpg `;
        });
      }
    });
  }

  switchButtons() {
    const allButtons = document.querySelectorAll(".button-transparent");
    allButtons.forEach((btn) => {
      btn.classList.remove("btn-switched");
    });
  }
}
export default CreateImages;
