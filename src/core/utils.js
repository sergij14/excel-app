export function capitalize(str = "") {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

export function isEqual(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}
