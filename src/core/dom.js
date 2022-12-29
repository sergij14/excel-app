function find(root, selector) {
  return root.querySelector(selector);
}

function create(tag) {
  return document.createElement(tag);
}

function html(root, html) {
  root.innerHTML = html;
}

function append(root, node) {
  return root.append(node);
}

function classList(node) {
  return {
    add: (cn) => node.classList.add(cn),
    remove: (cn) => node.classList.remove(cn),
  };
}

function css(node, styles={}) {
  Object.keys(styles).forEach((key) => {
    node.style[key] = styles[key];
  });
}

function text(root, txt) {
  if (typeof txt === 'string') {
    return root.textContent = txt.trim();
  }
  if (root.tagName.toLowerCase() === 'input') {
    return root.value.trim();
  }
  return root.textContent.trim();
}

export const $ = {
  find,
  create,
  html,
  append,
  classList,
  text,
  css,
};
