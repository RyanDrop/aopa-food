const $slides = document.querySelectorAll(".slide");
const $dots = document.querySelectorAll(".dot");
const $prev = document.querySelector(".prev");
const $next = document.querySelector(".next");
const [$firstDot, $secondDot] = $dots;

$firstDot.addEventListener("click", () => showSlides(0));
$secondDot.addEventListener("click", () => showSlides(1));
$next.addEventListener("click", nextSlide);
$prev.addEventListener("click", previousSlide);

export let currentSlideIndex = 0;

export function showSlides(currentSlideIndex) {
  setDisplay($slides, "none");
  removeClass($dots, "active");

  $slides[currentSlideIndex].style.display = "block";
  $dots[currentSlideIndex].classList.add("active");
}
export function nextSlide() {
  currentSlideIndex = (currentSlideIndex += 1) % $slides.length;
  showSlides(currentSlideIndex);
}

function previousSlide() {
  currentSlideIndex = Math.abs((currentSlideIndex -= 1)) % $slides.length;
  showSlides(currentSlideIndex);
}

function removeClass(arr, name) {
  arr.forEach(($element) => {
    $element.classList.remove(name);
  });
}

function setDisplay(arr, display) {
  arr.forEach((element) => {
    element.style.display = display;
  });
}
