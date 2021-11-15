import { Utils } from "./utils.js";

export class Cart {
  constructor(
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
  ) {
    this.shopItems = shopItems;
    this.cart = [];
    this.total = 0;
    this.actuallyCoupon = "none";
    this.$cart = $cart;
    this.$modal = $modal;
    this.$buttonClose = $buttonClose;
    this.$couponButton = $couponButton;
    this.$couponInput = $couponInput;
    this.$couponMessage = $couponMessage;
    this.$total = $total;
    this.$cartTotal = $cartTotal;
    this.$cartItems = $cartItems;
    this.$buttonBuy = $buttonBuy;
    this.$main = $main;
    this.couponValue = 0;
  }

  elementAddEventsListener() {
    this.$cart.addEventListener("click", () => this.toggleModal());
    this.$buttonClose.addEventListener("click", () => this.toggleModal());
    this.$couponButton.addEventListener("click", () => this.couponCheck());
    this.$buttonBuy.addEventListener("click", () => this.approvedPurchase());
  }

  toggleModal() {
    this.$modal.classList.toggle("active");
    console.log(this.$modal);
    this.$couponInput.value = "";
    this.$couponMessage.innerText = "";
    this.$couponMessage.classList.remove("error");
    this.$couponMessage.classList.remove("success");
  }

  addListenerButtonCart() {
    const $buttonsCart = document.querySelectorAll(".add-cart");
    $buttonsCart.forEach(($element) => {
      $element.addEventListener("click", (event) => {
        const productID = event.target.attributes[1].value;
        this.updateModalList(productID, 1, true);
      });
    });
  }

  updateModalList(productID, value, boolean) {
    let total = 0;
    const cardFn = value != 0 ? this.addItem : this.removeItem;
    const cart = cardFn.apply(this, [productID, value, boolean]);
    console.log(cart);
    this.$cartItems.innerHTML = "  ";
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
              <p class="total">${(object.value * object.quantity).toLocaleString("en-US", Utils.formatDollObj)}</p>
            </div>
          </div>
        </div>
        `;
      total += object.value * object.quantity;
      if (this.actuallyCoupon != "none") {
        const coupon = total * 0.1;
        total -= coupon;
      }
      this.$cartItems.innerHTML += modalCardInnerHTML;
    });

    const newPrice = total.toLocaleString("en-US", Utils.formatDollObj);
    this.$total.innerText = newPrice;
    this.$cartTotal.innerText = newPrice;
    this.inputAddEventListener();
    const isCartEmpty = cart.length === 0;
    this.buttonDisable(isCartEmpty);
  }

  inputAddEventListener() {
    const $addButtons = document.querySelectorAll(".add-item");
    const $removeButtons = document.querySelectorAll(".remove-item");
    const $addInputs = document.querySelectorAll("input[type=number]");

    $addInputs.forEach((input) => {
      input.addEventListener("change", (event) => {
        const value = event.target.value > 99 ? 1 : event.target.value;
        const newValue = parseInt(value);
        const id = event.target.parentElement.parentElement.dataset.id;
        this.updateModalList(id, newValue);
      });
    });

    $addButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const id = button.parentElement.parentElement.dataset.id;
        this.updateModalList(id, 1, true);
      });
    });
    $removeButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const id = button.parentElement.parentElement.dataset.id;
        this.removeItem(id);
        this.updateModalList(id, 0);
      });
    });
  }

  removeItem(id) {
    return this.shopItems.filter((object) => {
      if (object.id == id) {
        object.quantity = 0;
        object.inCard = false;
      }
      if (object.inCard) {
        return object;
      }
    });
  }

  addItem(id, value, boolean) {
    const card = this.shopItems.filter((object) => {
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
    return card;
  }

  buttonDisable(boolean) {
    this.$couponButton.disabled = boolean;
    this.$buttonBuy.disabled = boolean;
    if (boolean === true) {
      this.$cartItems.innerHTML = `<p class='empty-cart'>Empty cart, add items to proceed</p></div>`;
    }
  }

  couponCheck() {
    const userText = this.$couponInput.value.toUpperCase();
    if (this.actuallyCoupon === userText) {
      this.$couponMessage.classList.remove("success");
      this.$couponMessage.innerHTML = "Coupon already applied";
      this.$couponMessage.classList.add("error");
      this.removeCouponNotification();
      return;
    }

    if (userText === "AOPAMUNDO") {
      this.$couponMessage.classList.remove("error");
      this.$couponMessage.classList.add("success");
      this.$couponMessage.innerHTML = "Coupon Applied";
      const cartText = this.$cartTotal.innerText.replace("$", "");
      const textToNumber = parseFloat(cartText);
      const coupon = textToNumber * 0.1;
      const value = textToNumber - coupon;
      const newValue = value.toLocaleString("en-US", Utils.formatDollObj);
      this.actuallyCoupon = userText;
      this.$total.innerText = newValue;
      this.$cartTotal.innerText = newValue;
      this.removeCouponNotification();
      return;
    }
    this.$couponMessage.innerText = "Invalid Coupon";
    this.$couponMessage.classList.add("error");
    this.$couponMessage.classList.remove("success");
    this.removeCouponNotification();
  }

  removeCouponNotification(){
    setTimeout(() => {
     this.$couponMessage.classList.add("fade-out");
    }, 1300);
    
   setTimeout(() => {
     this.$couponMessage.classList.remove("fade-out");
     this.$couponMessage.classList.remove("error");
     this.$couponMessage.classList.remove("success");
     this.$couponMessage.innerHTML = "";
   }, 3000);
  }

  approvedPurchase() {
    this.shopItems.forEach((object) => {
      object.inCard = false;
      object.quantity = 0;
    });
    this.$cartItems.innerHTML = "";
    this.$cartTotal.innerText = "$0,00";
    this.$total.innerText = "$0,00";
    this.actuallyCoupon = "none";
    const $checked = Utils.createElementWithClass("div", "checked");
    $checked.innerHTML = `<img src="./assets/gif/check.gif" alt="buy-checked">`;
    this.$main.appendChild($checked);
    this.updateModalList();
    this.fadeOut($checked, 2440, true);
  }

  shopItemsForEach(arr) {
    arr.forEach((object) => {
      object.inCard = false;
      object.quantity = 0;
    });
  }

  fadeOut($element, time, boolean) {
    if (boolean) {
      window.scrollTo(0, 0);
      this.toggleModal();
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
}
