import { DESSERTS, DRINKS, MAIN_DISHES } from "./modules/shop-items.js";
import { GenerateStoreItems } from "./modules/generate-store-items.js";
import { Cart } from "./modules/cart.js";
import { Slideshow } from "./modules/slideshow.js";


const $header = document.querySelector("header");
const $slides = document.querySelectorAll(".slide");
const $dots = document.querySelectorAll(".dot");
const $prev = document.querySelector(".prev");
const $next = document.querySelector(".next");
const $mainCourse = document.querySelector(".main-dishes");
const $dessert = document.querySelector(".desserts");
const $drink = document.querySelector(".drinks");
const $cart = document.querySelector(".cart");
const $buttonClose = document.querySelector(".close-cart");
const $cartItems = document.querySelector(".cart-items");
const $buttonBuy = document.querySelector(".buy");
const $couponInput = document.querySelector(".price-content input");
const $couponMessage = document.querySelector(".coupon-message p");
const $couponButton = document.querySelector(".price-content button");
const $total = document.querySelector(".price-content span");
const $modal = document.querySelector(".modal");
const $cartTotal = document.querySelector(".cart h1");
const $main = document.querySelector("main");

window.addEventListener("scroll", () => {
  $header.classList.toggle("scroll-color", window.scrollY);
});

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

const cart = new Cart(
  shopItems,
  $cart,
  $modal,
  $cartItems,
  $total,
  $buttonClose,
  $buttonBuy,
  $couponInput,
  $couponMessage,
  $couponButton,
  $cartTotal,
  $main
);
cart.elementAddEventsListener();
cart.addListenerButtonCart();
