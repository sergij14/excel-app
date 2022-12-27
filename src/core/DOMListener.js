export class DOMListener {
  constructor($root, listeners = []) {
    if (!$root) {
      return;
    }
    this.$root = $root;
    this.listeners = listeners;
  }

  initDOMListeners() {
    console.log(this.listeners);
  }

  removeDOMListeners() {
  }
}
