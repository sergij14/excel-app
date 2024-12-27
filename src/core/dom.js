export class Dom {
  constructor(selector) {
    this.$el =
      typeof selector === "string"
        ? document.querySelector(selector)
        : selector;
  }

  html(html) {
    if (typeof html === "string") {
      this.$el.innerHTML = html;

      return this;
    }

    return this.$el.outerHTML.trim();
  }

  clear() {
    this.html("");

    return this;
  }

  append(node) {
    if (node instanceof Dom) {
      node = node.$el;
    }
    this.$el.append(node);
  }

  closest(selector) {
    return $(this.$el.closest(selector));
  }

  getCoords() {
    return this.$el.getBoundingClientRect();
  }

  findAll(selector) {
    return this.$el.querySelectorAll(selector);
  }

  get dataset() {
    return this.$el.dataset;
  }

  on(listener, fn) {
    this.$el.addEventListener(listener, fn);
  }

  off(listener, fn) {
    this.$el.removeEventListener(listener, fn);
  }
}

export function $(selector) {
  return new Dom(selector);
}

$.create = (tagName, cn) => {
  const el = document.createElement(tagName);

  if (cn) {
    el.classList.add(cn);
  }

  return $(el);
};
