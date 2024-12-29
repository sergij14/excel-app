import { $ } from "../core/dom";
import { Emitter } from "../core/Emitter";
import { Store } from "../core/Store";
import { debounce, storage } from "../core/utils";

export class Excel {
  constructor(selector, config) {
    this.$root = $(selector);
    this.components = config.components || [];
    this.emitter = new Emitter();
    this.store = new Store(storage("excel-state") || config.initialState, {
      emitter: this.emitter,
    });
    this.syncStorage();
  }

  getContainer() {
    const $container = $.create("div", "excel");
    const componentConfig = { emitter: this.emitter, store: this.store };

    this.components = this.components.map((Component) => {
      const $el = $.create("div", Component.cn);
      const component = new Component($el, componentConfig);
      $el.html(component.getHTML());
      $container.append($el);

      return component;
    });

    return $container;
  }

  stateListener(data) {
    storage("excel-state", data);
    console.log(`State Update:`, data);
  }

  syncStorage() {
    this.stateListener = debounce(this.stateListener, 300).bind(this);
    this.emitter.subscribe("Store:StateUpdate", this.stateListener);
  }

  render() {
    this.$root.append(this.getContainer());
    this.components.forEach((component) => {
      component.init();
    });
  }

  destory() {
    this.components.forEach((component) => {
      component.destory();
    });
  }
}
