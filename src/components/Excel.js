export class Excel {
  constructor(selector, config) {
    this.$el = document.querySelector(selector);
    this.components = config.components || [];
  }

  render() {
    const $container = document.createElement("div");

    this.components.forEach((Component) => {
      const component = new Component();
      $container.insertAdjacentHTML("beforeend", component.render());
    });

    this.$el.append($container);
  }
}
