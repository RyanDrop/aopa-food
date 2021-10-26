import { currentSlideIndex, nextSlide, showSlides } from "./modules/slideshow.js";
import { MAIN_DISHES, DESSERTS, DRINKS } from "./modules/shop-items.js";

const $main = document.querySelector("main");
const $header = document.querySelector("header");
const $modal = document.querySelector(".modal");
const $cartTotal = document.querySelector(".cart h1");
const $mainCourse = document.querySelector(".main-dishes");
const $dessert = document.querySelector(".desserts");
const $drink = document.querySelector(".drinks");
const formatDollObj = { style: "currency", currency: "USD" };
const $cart = document.querySelector(".cart");
const $buttonClose = document.querySelector(".close-cart");
const $cartItems = document.querySelector(".cart-items");
const $buttonBuy = document.querySelector(".buy");
const $cartContent = document.querySelector(".cart-content");
const $couponInput = document.querySelector(".price-content input");
const $couponMessage = document.querySelector(".coupon-message");
const $couponButton = document.querySelector(".price-content button");
const $total = document.querySelector(".price-content span");
let actuallyCoupon = "none";

showSlides(currentSlideIndex);
setInterval(nextSlide, 4000);

window.addEventListener("scroll", () => {
  $header.classList.toggle("scroll-color", window.scrollY);
});
$cart.addEventListener("click", activeModal);
$buttonClose.addEventListener("click", activeModal);
$couponButton.addEventListener("click", couponCheck);
$buttonBuy.addEventListener("click", () => {
  const purchaseFn = $cartItems.innerText === "" ? purchaseDenied : approvedPurchase;
  purchaseFn();
});

function toggleModal() {
  $modal.classList.toggle("active");
  $couponInput.value = "";
  $couponMessage.innerText = "";
  $couponMessage.classList.remove("error");
  $couponMessage.classList.remove("success");
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

const $buttonsCart = document.querySelectorAll(".add-cart");
$buttonsCart.forEach(($element) => {
  $element.addEventListener("click", (event) => {
    const productID = event.target.attributes[1].value;
    updateModalList(productID);
  });
});

function updateModalList(productID) {
  let total = 0;
  const cart = shopItems.filter((object) => {
    if (object.id == productID) {
      object.incard = true;
      object.quantity += 1;
    }
    if (object.incard) {
      return object;
    }
  });
  $cartItems.innerHTML = "";
  cart.forEach((object) => {
    const modalCardInnerHTML = `
          <div class="cart-card">
            <img src="${object.img}" alt="food">  
            <div class="data-items">
              <h1 class="description">${object.description}</h1>
              <div class="input-display">
              <button><i class="fas fa-trash" aria-hidden="true"></i></button>
              <input type="number" value="${object.quantity}">
              <button><i class="far fa-plus-square" aria-hidden="true"></i></button>
              </div>         
              <p class="total">${(object.value * object.quantity).toLocaleString("en-US", formatDollObj)}</p>
            </div>
          </div>
        </div>
        `;
    total += object.value * object.quantity;
    $cartItems.innerHTML += modalCardInnerHTML;
  });
  const newPrice = total.toLocaleString("en-US", formatDollObj);
  $total.innerText = `Total ` + newPrice;
  $cartTotal.innerText = newPrice;
  inputAddEventListener();
}

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

function couponCheck() {
  const userText = $couponInput.value.toUpperCase();
  if (actuallyCoupon === userText) {
    $couponMessage.classList.remove("success");
    $couponMessage.innerText = "This coupon has already been applied";
    $couponMessage.classList.add("error");
    return;
  }
  $total.innerText === "$0,00"
    ? ($couponMessage.innerText = "It is not possible to apply coupon with empty cart")
    : ($couponMessage.innerText = "Invalid Coupon");
  $couponMessage.classList.add("error");
  $couponMessage.classList.remove("success");
  if (userText === "AOPAMUNDO" && $total.innerText != "0,00") {
    $couponMessage.classList.remove("error");
    $couponMessage.classList.add("success");
    $couponMessage.innerText = "Coupon Applied";
    const cartText = $cartTotal.innerText.replace("$", "");
    const textToNumber = parseInt(cartText);
    const coupon = textToNumber * 0.1;
    const newValue = (textToNumber - coupon).toLocaleString("en-US", formatDollObj);
    actuallyCoupon = userText;
    $total.innerText = newValue;
    $cartTotal.innerText = newValue;
  }
}

function approvedPurchase() {
  shopItems.forEach((object) => {
    object.inCard = false;
    object.quantity = 0;
  });
  $cartItems.innerHTML = "";
  $cartTotal.innerText = "$0,00";
  $total.innerText = "$0,00";
  const $checked = createElementWithClass("div", "checked");
  $checked.innerHTML = `<img src="./assets/gif/check.gif" alt="buy-checked">`;
  $main.appendChild($checked);
  fadeOut($checked, 2440, true);
}

function purchaseDenied() {
  const $unchecked = createElementWithClass("div", "unchecked");
  $unchecked.innerHTML = `
  <p>Add items to proceed</p>
  <img src="./assets/gif/unchecked.gif" alt="buy-checked">
  `;
  $cartContent.appendChild($unchecked);
  fadeOut($unchecked, 3000, false);
}

function fadeOut($element, time, boolean) {
  if (boolean) {
    window.scrollTo(0, 0);
    toggleModal();
    document.documentElement.style.overflow = "hidden";
  }
  setTimeout(() => {
    $element.classList.add("fade-out");
  }, time);
  setTimeout(() => {
    $element.remove();
    document.documentElement.style.overflow = "auto";
  }, time + 500);
}
