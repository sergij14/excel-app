import {capitalize} from './utils';

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
      this.$root.addEventListener(listener, this[method].bind(this));
    });
  }

  removeDOMListeners() {
  }
}


function getMethodName(evtName) {
  return 'on' + capitalize(evtName);
}
