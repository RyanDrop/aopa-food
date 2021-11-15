import { Utils } from "./utils.js";

export class GenerateStoreItems {
  constructor(shopItem) {
    this.shopItem = shopItem;
  }

  storeCreateCards() {
    this.shopItem.forEach((item) => {
      const $container = item.$container;
      const cardInnerHTML = this.createModelHTML(item);
      const $card = this.createCardElement(cardInnerHTML);
      $container.appendChild($card);
    });
  }

  createCardElement(modelHTML) {
    const $card = Utils.createElementWithClass("div", "card");
    $card.innerHTML = modelHTML;
    return $card;
  }

  createModelHTML(object) {
    const html = `
  <h1>${object.description}</h1>
  <img src='${object.img}' alt='${object.alt}'>
  <p>${object.value.toLocaleString("en-US", Utils.formatDollObj)}</p>
  <button class='add-cart' key="${object.id}">Add</button>
  `;
    return html;
  }
}
