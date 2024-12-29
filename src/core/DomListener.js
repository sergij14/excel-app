import { capitalize } from "./utils";

export class DomListener {
  constructor($el, listeners = []) {
    this.listeners = listeners;
    if (!$el) {
      throw new Error("DomListener: No $el is provided for DomListener");
    }
    this.$el = $el;
  }

  initListeners() {
    this.listeners.forEach((listener) => {
      const method = `on${capitalize(listener)}`;
      if (!this[method]) {
        console.warn(
          `DomListener: ${method} method is not implemented for ${this.name} Component`
        );
        return;
      }

      this[method] = this[method].bind(this);
      this.$el.on(listener, this[method]);
    });
  }

  removeListeners() {
    this.listeners.forEach((listener) => {
      const method = `on${capitalize(listener)}`;

      this.$el.off(listener, this[method]);
    });
  }
}
