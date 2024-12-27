export class Excel {
  constructor(selector, config) {
    this.$el = document.querySelector(selector);
    this.components = config.components || []
  }
}
