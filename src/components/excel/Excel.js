import {Emitter} from '../../core/Emitter';
import {$} from '../../core/dom';

export class Excel {
  constructor(selector, config) {
    this.$el = $.find(document, selector);
    this.components = config.components;
    this.store = config.store;
    this.emitter = new Emitter();
  }

  getRoot() {
    const $root = $.create('div');
    $.classList($root).add('excel');

    const componentConfig = {
      emitter: this.emitter,
      store: this.store,
    };

    this.components = this.components.map((Component) => {
      const $el = $.create('div');
      const component = new Component($el, componentConfig);

      $.classList($el).add(Component.className);
      $.html($el, component.toHTML());
      $.append($root, $el);

      return component;
    });
    return $root;
  }

  render() {
    $.append(this.$el, this.getRoot());
    this.components.forEach((component) => component.init());
  }

  destroy() {
    this.components.forEach((component) => component.destroy());
  }
}
