const $header = document.querySelector("header");
const $slides = document.querySelectorAll(".slide");
const $dots = document.querySelectorAll(".dot");
const $prev = document.querySelector(".prev");
const $next = document.querySelector(".next");
const $mainCourse = document.querySelector(".main-dishes");
const $dessert = document.querySelector(".desserts");
const $drink = document.querySelector(".drinks");

const mainDishes = [
  {
    id: 1,
    description: "Rice",
    value: 2.0,
    quantity: 0,
    img: "./assets/food-images/rice.png",
  },
  {
    id: 2,
    description: "Bean",
    value: 1.6,
    quantity: 0,
    img: "./assets/food-images/bean.png",
  },
  {
    id: 3,
    description: "Salad",
    value: 0.4,
    quantity: 0,
    img: "./assets/food-images/salad.png",
  },
];

const desserts = [
  {
    id: 101,
    description: "Ice Cream",
    value: 0.99,
    quantity: 0,
    img: "./assets/food-images/ice-cream.png",
  },
  {
    id: 102,
    description: "Blueberry",
    value: 1.1,
    quantity: 0,
    img: "./assets/food-images/blueberry.png",
  },
];

const drinks = [
  {
    id: 201,
    description: "Juice",
    value: 2.0,
    quantity: 0,
    img: "./assets/food-images/orange-juice.png",
  },
  {
    id: 202,
    description: "Coke",
    value: 2.0,
    quantity: 0,
    img: "./assets/food-images/coca-cola.png",
  },
];

window.addEventListener("scroll", () => {
  $header.classList.toggle("scroll-color", window.scrollY);
});
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

function createElementWithClass(selector, className) {
  const $element = document.createElement(selector);
  $element.classList.add(className);
  return $element;
}

function createCardElement() {
  const $card = createElementWithClass("div", "card");
  $card.innerHTML = modelHTML;
  return $card;
}

function modelHTML(object) {
  const html = `
  <h1>${object.description}</h1>
  <img src='${object.img}' alt='food'>
  <p>${object.value.toLocaleString("en-US", formatDollObj)}</p>
  <button class='add-cart' key="${object.id}">Add</button>
  `;
  return html;
}

for (i = 0; i < mainDishes.length; i++) {
  const cardInnerHtml = modelHTML(mainDishes[i]);
  const $card = createCardElement();
  $card.innerHTML = cardInnerHtml;
  $mainCourse.appendChild($card);
}

for (i = 0; i < desserts.length; i++) {
  const cardInnerHtml = modelHTML(desserts[i]);
  const $card = createCardElement();
  $card.innerHTML = cardInnerHtml;
  $dessert.appendChild($card);
}

for (i = 0; i < drinks.length; i++) {
  const cardInnerHtml = modelHTML(drinks[i]);
  const $card = createCardElement();
  $card.innerHTML = cardInnerHtml;
  $drink.appendChild($card);
}
