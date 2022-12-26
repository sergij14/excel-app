export class Excel {
  constructor(selector, config) {
    this.$el = document.querySelector(selector);
    this.components = config.components;
  }

  getRoot() {
    const $root = document.createElement('div');

    this.components.forEach((Component) => {
      const component = new Component();
      console.log($root);
      $root.insertAdjacentHTML('beforeend', component.toHTML());
    });
    return $root;
  }

  render() {
    this.$el.append(this.getRoot());
  }
}
