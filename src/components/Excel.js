import { $ } from "../core/Dom";

export class Excel {
  constructor(selector, config) {
    this.$root = $(selector);
    this.components = config.components || [];
  }

  getContainer() {
    const $container = $.create("div", "excel");

    this.components = this.components.map((Component) => {
      const $el = $.create("div", Component.cn);

      const component = new Component($el);

      $el.html(component.getHTML());
      $container.append($el);

      return component;
    });

    return $container;
  }

  render() {
    this.$root.append(this.getContainer());
    this.components.forEach((component) => {
      component.init();
    });
  }
}
