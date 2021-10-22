import { currentSlideIndex, nextSlide, showSlides } from "./modules/slideshow.js";
import { MAIN_DISHES, DESSERTS, DRINKS } from "./modules/shop-items.js";

const $header = document.querySelector("header");
const $mainCourse = document.querySelector(".main-dishes");
const $dessert = document.querySelector(".desserts");
const $drink = document.querySelector(".drinks");
const $cartItems = document.querySelector(".cart-items");
const formatDollObj = { style: "currency", currency: "USD" };
const $modal = document.querySelector(".modal");
const $cart = document.querySelector(".cart");
const $buttonClose = document.querySelector(".close-cart");

showSlides(currentSlideIndex);
setInterval(nextSlide, 4000);

window.addEventListener("scroll", () => {
  $header.classList.toggle("scroll-color", window.scrollY);
});
$cart.addEventListener("click", activeModal);
$buttonClose.addEventListener("click", activeModal);

function activeModal() {
  $modal.classList.toggle("active");
}

const shopItems = [
  ...MAIN_DISHES.map((item) => ({ ...item, $container: $mainCourse })),
  ...DESSERTS.map((item) => ({ ...item, $container: $dessert })),
  ...DRINKS.map((item) => ({ ...item, $container: $drink })),
];

shopItems.forEach((item) => {
  const $container = item.$container;
  const cardInnerHTML = modelHTML(item);
  const $card = createCardElement();
  $card.innerHTML = cardInnerHTML;
  $container.appendChild($card);
});

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

