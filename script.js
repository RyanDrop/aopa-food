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
const $couponMessage = document.querySelector(".coupon-message p");
const $couponButton = document.querySelector(".price-content button");
const $total = document.querySelector(".price-content span");
let actuallyCoupon = "none";

showSlides(currentSlideIndex);
setInterval(nextSlide, 4000);

window.addEventListener("scroll", () => {
  $header.classList.toggle("scroll-color", window.scrollY);
});
$cart.addEventListener("click", toggleModal);
$buttonClose.addEventListener("click", toggleModal);
$couponButton.addEventListener("click", couponCheck);
$buttonBuy.addEventListener("click", approvedPurchase);

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
    updateModalList(productID, 1, true);
  });
});

function updateModalList(productID, value, boolean) {
  let total = 0;
  const cardFn = value != 0 ? addItem : removeItem;
  const cart = cardFn(productID, value, boolean);
  $cartItems.innerHTML = "  ";
  cart.forEach((object) => {
    const modalCardInnerHTML = `
          <div class="cart-card">
            <img src="${object.img}" alt="${object.alt}">  
            <div class="data-items" data-id="${object.id}"">
              <h1 class="description">${object.description}</h1>
              <div class="input-display">
              <button class="remove-item"><i class="fas fa-trash" aria-hidden="true"></i></button>
              <input type="number" max="99" value="${object.quantity}">
              <button class="add-item"><i class="far fa-plus-square" aria-hidden="true"></i></button>
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
  $total.innerText = newPrice;
  $cartTotal.innerText = newPrice;
  inputAddEventListener();
  const isCartEmpty = cart.length === 0;
  buyDisable(isCartEmpty);
}

function inputAddEventListener() {
  const $addButtons = document.querySelectorAll(".add-item");
  const $removeButtons = document.querySelectorAll(".remove-item");
  const $addInputs = document.querySelectorAll("input[type=number]");

  $addInputs.forEach((input) => {
    input.addEventListener("change", (event) => {
      const value = event.target.value > 99 ? 1 : event.target.value;
      const newValue = parseInt(value);
      const id = event.target.parentElement.parentElement.dataset.id;
      updateModalList(id, newValue);
    });
  });

  $addButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.parentElement.parentElement.dataset.id;
      updateModalList(id, 1, true);
    });
  });
  $removeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.parentElement.parentElement.dataset.id;
      removeItem(id);
      updateModalList(id, 0);
    });
  });
}

function removeItem(id) {
  return shopItems.filter((object) => {
    if (object.id == id) {
      object.quantity = 0;
      object.inCard = false;
    }
    if (object.inCard) {
      return object;
    }
  });
}

function addItem(id, value, boolean) {
  const cart = shopItems.filter((object) => {
    if (object.id == id) {
      object.inCard = true;
      const newValue = boolean ? (object.quantity += value) : value;
      object.quantity = newValue == 0 ? 1 : newValue;
      object.quantity > 99 ? (object.quantity = 99) : object.quantity;
    }
    if (object.inCard) {
      return object;
    }
  });
  return cart;
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
  <img src='${object.img}' alt='${object.alt}'>
  <p>${object.value.toLocaleString("en-US", formatDollObj)}</p>
  <button class='add-cart' key="${object.id}">Add</button>
  `;
  return html;
}

function buyDisable(boolean) {
  $buttonBuy.disabled = boolean;
  if (boolean === true) {
    $cartItems.innerHTML = `<p class='empty-cart'>Empty cart, add items to proceed</p></div>`;
  }
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
  updateModalList();
  fadeOut($checked, 2440, true);
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
