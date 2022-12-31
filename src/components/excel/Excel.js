import {Emitter} from '../../core/Emitter';
import {$} from '../../core/dom';
import {createStore} from '../../core/createStore';
import {rootReducer} from '../../store/rootReducer';
import {getInitialState} from '../../store/initialState';
import {LocalStorageClient, StateProcessor} from './excel.storage';

export class Excel {
  constructor(selector, {components, store}) {
    this.$el = $.find(document, selector);
    this.storeSub = null;
    this.processor = new StateProcessor(new LocalStorageClient('excel-state'));
    this.emitter = new Emitter();
    this.components = components;
  }

  async getRoot() {
    const $root = $.create('div');
    $.classList($root).add('excel');

    const state = await this.processor.get();
    const store = createStore(rootReducer, getInitialState(state));
    this.storeSub = store.subscribe(this.processor.listen);

    const componentConfig = {
      emitter: this.emitter,
      store,
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

  creeateLoader() {
    return `
      <i class="fa-solid fa-spinner animate-spin"></i>
    `;
  }

  async render() {
    const $loader = $.create('div', 'loader');
    $.html($loader, this.creeateLoader());
    $.append(this.$el, $loader);
    const $root = await this.getRoot();

    $.clear(this.$el);
    $.append(this.$el, $root);
    this.components.forEach((component) => component.init());
  }

  destroy() {
    this.storeSub?.unsubscribe();
    this.components.forEach((component) => component.destroy());
  }
}
