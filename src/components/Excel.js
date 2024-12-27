export class Excel {
  constructor(selector, config) {
    this.$root = document.querySelector(selector);
    this.components = config.components || [];
  }

  render() {
    const $container = document.createElement("div");
    $container.classList.add("excel");

    this.components.forEach((Component) => {
      const $el = document.createElement("div");
      $el.classList.add(Component.cn);

      const component = new Component($el);
      $el.insertAdjacentHTML("beforeend", component.render());

      $container.append($el);
    });

    this.$root.append($container);
  }
}
