export class Excel {
  constructor(selector, config) {
    this.$el = document.querySelector(selector);
    this.components = config.components;
  }

  getRoot() {
    const $root = document.createElement('div');
    $root.classList.add('excel');

    this.components.forEach((Component) => {
      const $el = document.createElement('div');
      const component = new Component($el);

      $el.classList.add(Component.className);
      $el.innerHTML = component.toHTML();
      $root.append($el);
    });
    return $root;
  }

  render() {
    this.$el.append(this.getRoot());
  }
}
