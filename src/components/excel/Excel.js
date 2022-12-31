import {Emitter} from '../../core/Emitter';
import {$} from '../../core/dom';
import {debounce, storage} from '../../core/utils';

export class Excel {
  constructor(selector, {components, store}) {
    this.$el = $.find(document, selector);
    this.store = store;
    this.sub = null;
    this.emitter = new Emitter();
    this.components = components;
    this.init();
  }

  init() {
    this.sub = this.store.subscribe(this.stateListener);
  }

  stateListener = debounce((state) => {
    console.log(state);
    storage('excel-state', state);
  }, 300);

  getRoot() {
    const $root = $.create('div');
    $.classList($root).add('excel');

    const componentConfig = {
      emitter: this.emitter,
      store: this.store,
      storageOff: this.sub.unsubscribe,
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
    this.sub?.unsubscribe();
    this.components.forEach((component) => component.destroy());
  }
}
