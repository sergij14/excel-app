export class DomListener {
  constructor($el, listeners = []) {
    this.listeners = listeners;
    if (!$el) {
      throw new Error("No $el is provided for DomListener");
    }
    this.$el = $el;
  }

  initListeners() {}

  removeListeners() {}
}
