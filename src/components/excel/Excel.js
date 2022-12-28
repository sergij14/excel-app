import {Emitter} from '../../core/Emitter';

export class Excel {
  constructor(selector, config) {
    this.$el = document.querySelector(selector);
    this.components = config.components;
    this.emitter = new Emitter();
  }

  getRoot() {
    const $root = document.createElement('div');
    $root.classList.add('excel');

    const componentConfig = {
      emitter: this.emitter,
    };

    this.components = this.components.map((Component) => {
      const $el = document.createElement('div');
      const component = new Component($el, componentConfig);

      $el.classList.add(Component.className);
      $el.innerHTML = component.toHTML();
      $root.append($el);

      return component;
    });
    return $root;
  }

  render() {
    this.$el.append(this.getRoot());
    this.components.forEach((component) => component.init());
  }
}
