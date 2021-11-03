export class Slideshow {
  constructor($slides, $dots, $prev, $next) {
    this.$slides = $slides;
    this.$dots = $dots;
    this.$prev = $prev;
    this.$next = $next;
    this.$firstDot = this.$dots[0];
    this.$secondDot = this.$dots[1];
    this.slideIndex = 0;
  }

  elementsAddEventListener() {
    this.$firstDot.addEventListener("click", () => this.showSlides(0));
    this.$secondDot.addEventListener("click", () => this.showSlides(1));
    this.$next.addEventListener("click", () => this.nextSlide());
    this.$prev.addEventListener("click", () => this.previousSlide());
  }

  showSlides(number = 0) {
    this.setDisplay(this.$slides, "none");
    this.removeClass(this.$dots, "active");
    this.slideIndex = number;
    const index = this.slideIndex;
    this.$slides[index].style.display = "block";
    this.$dots[index].classList.add("active");
  }

  nextSlide() {
    this.slideIndex += 1;
    const actualIndex = this.slideIndex % this.$slides.length;
    this.slideIndex = actualIndex;
    this.showSlides(this.slideIndex);
  }

  previousSlide() {
    const convertedIndex = Math.abs((this.slideIndex -= 1));
    const actualIndex = convertedIndex % this.$slides.length;
    this.slideIndex = actualIndex;
    this.showSlides(this.slideIndex);
  }

  removeClass(arr, name) {
    arr.forEach(($element) => {
      $element.classList.remove(name);
    });
  }

  setDisplay(arr, display) {
    arr.forEach((element) => {
      element.style.display = display;
    });
  }
}
