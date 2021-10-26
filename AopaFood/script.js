import { currentSlideIndex, nextSlide, showSlides } from "./modules/slideshow.js";
import { MAIN_DISHES, DESSERTS, DRINKS } from "./modules/shop-items.js";

const $header = document.querySelector("header");
const $modal = document.querySelector(".modal");
const $total = document.querySelector(".cart-functions p");
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
const purchase = $cartItems == "" ? purchaseDenied : approvedPurchase;

showSlides(currentSlideIndex);
setInterval(nextSlide, 4000);

window.addEventListener("scroll", () => {
  $header.classList.toggle("scroll-color", window.scrollY);
});
$cart.addEventListener("click", activeModal);
$buttonClose.addEventListener("click", activeModal);
$buttonBuy.addEventListener("click", purchase);

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

function approvedPurchase() {
  const $checked = createElementWithClass("div", "checked");
  $checked.innerHTML = `<img src="./assets/gif/check.gif" alt="buy-checked">`;
  $cartContent.appendChild($checked);
  setTimeout(() => {
    $checked.remove();
    activeModal();
  }, 2440);
}

function purchaseDenied() {
  const $unchecked = createElementWithClass("div", "unchecked");
  $unchecked.innerHTML = `
  <p>Add items to proceed</p>
  <img src="./assets/gif/unchecked.gif" alt="buy-checked">
  `;
  $cartContent.appendChild($unchecked);
  setTimeout(() => {
    $unchecked.remove();
  }, 3000);
}
