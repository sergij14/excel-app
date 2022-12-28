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

export const $ = {
  find,
  create,
  html,
  append,
  classList,
};
