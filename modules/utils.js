export class Utils {
  static formatDollObj = { style: "currency", currency: "USD" };
  
  static createElementWithClass(selector, className) {
    const $element = document.createElement(selector);
    $element.classList.add(className);
    return $element;
  }
}
