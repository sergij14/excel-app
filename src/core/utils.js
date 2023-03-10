export function getMethodName(evtName) {
  return 'on' + capitalize(evtName);
}

export function capitalize(string) {
  if (typeof string === 'string') {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return '';
}

export function storage(key, data) {
  if (!data) {
    return JSON.parse(localStorage.getItem(key));
  }
  localStorage.setItem(key, JSON.stringify(data));
}

export function doWithDelay(cb, delay = 1000) {
  return setTimeout(() => {
    cb();
  }, delay);
}

export function toInlineStyles(styleObj = {}) {
  return Object.keys(styleObj)
      .map(
          (key) =>
            `${key.replace(/[A-Z]/g, (m) => '-' + m.toLowerCase())}: ${
              styleObj[key]
            }`
      )
      .toString()
      .split(',')
      .join(';');
}

export function debounce(fn, wait) {
  let timeout;

  return function(...args) {
    const later = () => {
      clearTimeout(timeout);

      // eslint-disable-next-line
      fn.apply(this, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
