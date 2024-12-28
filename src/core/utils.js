export function capitalize(str = "") {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

export function isEqual(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

export function storage(key, data) {
  if (!data) {
    return JSON.parse(localStorage.getItem(key));
  }
  localStorage.setItem(key, JSON.stringify(data));
}

export function get(objectParam, pathStr) {
  const path = pathStr.split(".");

  let index = 0;
  let object = objectParam;

  while (object != null && index < path.length) {
    object = object[String(path[index])];
    index++;
  }

  return index === path.length ? object : undefined;
}
