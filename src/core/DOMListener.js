import {getMethodName} from './utils';

export class DOMListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error('No $root was provided for DOMListener');
    }
    this.$root = $root;
    this.listeners = listeners;
  }

  initDOMListeners() {
    this.listeners.forEach((listener) => {
      const method = getMethodName(listener);
      if (!this[method]) {
        const name = this.name;
        throw new Error(`${method} is not implemented for ${name} Component`);
      }
      this[method] = this[method].bind(this);
      this.$root.addEventListener(listener, this[method]);
    });
  }

  removeDOMListeners() {
    this.listeners.forEach((listener) => {
      const method = getMethodName(listener);
      this.$root.removeEventListener(listener, this[method]);
    });
  }
}
