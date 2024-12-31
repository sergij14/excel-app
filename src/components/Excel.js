import { $ } from "../core/DOM/dom";
import { Emitter } from "../core/Emitter/Emitter";
import { StoreSubscriber } from "../core/Store/StoreSubscriber";

export class Excel {
  constructor(config) {
    this.components = config.components || [];
    this.emitter = new Emitter();
    this.store = config.store || null
    this.storeSubscriber = new StoreSubscriber(this.store);
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


  init() {
    this.storeSubscriber.subscribeComponents(this.components);

    this.components.forEach((component) => {
      component.init();
    });
  }

  destroy() {
    this.components.forEach((component) => {
      component.destroy();
    });
    this.storeSubscriber.unsubscribe();
  }
}
