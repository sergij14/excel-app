export class Dom {
  constructor(selector) {
    this.$el =
      typeof selector === "string"
        ? document.querySelector(selector)
        : selector;
  }

  getElementNode() {
    return this.$el;
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
