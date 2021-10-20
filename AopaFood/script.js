const $slides = document.querySelectorAll(".slide");
const $dots = document.querySelectorAll(".dot");
const $prev = document.querySelector(".prev");
const $next = document.querySelector(".next");

$dots[0].addEventListener("click", () => currentSlide(0));
$dots[1].addEventListener("click", () => currentSlide(1));
$next.addEventListener("click", nextSlide);
$prev.addEventListener("click", previousSlide);

let currentSlideIndex = 0;

showSlides(currentSlideIndex);

function nextSlide() {
  hideSlides();
  removeActiveClass();
  currentSlideIndex = (currentSlideIndex += 1) % $slides.length;

  const $currentSlide = $slides[currentSlideIndex];
  const $currentDot = $dots[currentSlideIndex];

  $currentSlide.style.display = "block";
  $currentDot.classList.add("active");
}

function previousSlide() {
  hideSlides();
  removeActiveClass();
  const nextIndex = (currentSlideIndex -= 1);
  currentSlideIndex = nextIndex < 0 ? $slides.length - 1 : nextIndex;

  const $currentSlide = $slides[currentSlideIndex];
  const $currentDot = $dots[currentSlideIndex];

  $currentSlide.style.display = "block";
  $currentDot.classList.add("active");
}

function currentSlide(n) {
  showSlides((currentSlideIndex = n));
}

function showSlides(currentIndex) {
  hideSlides();
  removeActiveClass();

  $slides[currentSlideIndex].style.display = "block";
  $dots[currentSlideIndex].classList.add("active");
}

function removeActiveClass() {
  for (i = 0; i < $dots.length; i++) {
    const $dot = $dots[i];
    $dot.classList.remove("active");
  }
}

function hideSlides() {
  for (i = 0; i < $slides.length; i++) {
    const $slide = $slides[i];
    $slide.style.display = "none";
  }
}
setInterval(nextSlide, 4000);