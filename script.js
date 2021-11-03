import { GenerateStoreItems } from "./modules/generate-store-items.js";
import { DESSERTS, DRINKS, MAIN_DISHES } from "./modules/shop-items.js";
import { Slideshow } from "./modules/slideshow.js";

const $header = document.querySelector("header");
window.addEventListener("scroll", () => {
  $header.classList.toggle("scroll-color", window.scrollY);
});

const $slides = document.querySelectorAll(".slide");
const $dots = document.querySelectorAll(".dot");
const $prev = document.querySelector(".prev");
const $next = document.querySelector(".next");
const $mainCourse = document.querySelector(".main-dishes");
const $dessert = document.querySelector(".desserts");
const $drink = document.querySelector(".drinks");

const slideshow = new Slideshow($slides, $dots, $prev, $next);
slideshow.elementsAddEventListener();
slideshow.showSlides();
setInterval(() => slideshow.nextSlide(), 4000);

const shopItems = [
  ...MAIN_DISHES.map((item) => ({ ...item, $container: $mainCourse })),
  ...DESSERTS.map((item) => ({ ...item, $container: $dessert })),
  ...DRINKS.map((item) => ({ ...item, $container: $drink })),
];

const generateStoreItems = new GenerateStoreItems(shopItems);
generateStoreItems.storeCreateCards();
