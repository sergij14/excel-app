export class Dom {
  constructor(selector) {
    this.$el =
      typeof selector === "string"
        ? document.querySelector(selector)
        : selector;
  }

  html(html) {
    if (typeof html === "string" || typeof html === "number") {
      this.$el.innerHTML = html;

      return this;
    }

    return this.$el.outerHTML.trim();
  }

  css(styles = {}) {
    Object.keys(styles).forEach((key) => {
      this.$el.style[key] = styles[key];
    });
  }

  attr(name, value) {
    if (value) {
      this.$el.setAttribute(name, value);
      return this;
    }
    return this.$el.getAttribute(name);
  }

  getStyle(keys) {
    const styles = {};

    keys.forEach((key) => {
      styles[key] = this.$el.style[key];
    }, {});

    return styles;
  }

  text(text) {
    if (typeof text === "string" || typeof text === "number") {
      this.$el.textContent = text;

      if (this.$el.tagName.toLowerCase() === "input") {
        this.$el.value = text;
      }

      return this;
    }

    if (this.$el.tagName.toLowerCase() === "input") {
      return this.$el.value.trim();
    }

    return this.$el.textContent.trim();
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

  find(selector) {
    return $(this.$el.querySelector(selector));
  }

  addClass(cn) {
    this.$el.classList.add(cn);
  }

  focus() {
    this.$el.focus();
  }

  scrollTo() {
    this.$el.scrollIntoView({ block: "end", inline: "end" });
  }

  removeClass(cn) {
    this.$el.classList.remove(cn);
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
