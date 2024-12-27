import { $ } from "../core/Dom";

export class Excel {
  constructor(selector, config) {
    this.$root = $(selector);
    this.components = config.components || [];
  }

  render() {
    const $container = $.create("div", "excel");

    this.components.forEach((Component) => {
      const $el = $.create("div", Component.cn);

      const component = new Component($el);

      $el.html(component.getHTML());
      $container.append($el);
    });

    this.$root.append($container);
  }
}
