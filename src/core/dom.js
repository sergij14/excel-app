function find(root, selector) {
  return root.querySelector(selector);
}

function create(tag, className = '') {
  const node = document.createElement(tag);
  if (className) {
    node.classList.add(className);
  }
  return node;
}

function html(root, html) {
  root.innerHTML = html;
}

function clear(node) {
  node.innerHTML = '';
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

function css(node, styles = {}) {
  Object.keys(styles).forEach((key) => {
    node.style[key] = styles[key];
  });
}

function text(root, txt) {
  if (typeof txt !== 'undefined') {
    return (root.textContent = txt);
  }
  if (root.tagName.toLowerCase() === 'input') {
    return root.value.trim();
  }
  return root.textContent.trim();
}

function attr(node, {name, value}) {
  if (value) {
    return node.setAttribute(name, value);
  }
  return node.getAttribute(name);
}

function getNodeByDataType(node, type) {
  if (node.dataset.type === type) {
    return node;
  }
  if (node.id === 'app') {
    return;
  }
  return getNodeByDataType(node.parentElement, type);
}

export const $ = {
  find,
  create,
  html,
  clear,
  append,
  classList,
  text,
  css,
  attr,
  getNodeByDataType,
};
