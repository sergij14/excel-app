import { DomListener } from "../DOM/DomListener";

export class AppComponent extends DomListener {
  constructor($el, config = {}) {
    super($el, config.listeners);
    this.name = config.name || "";
    this.emitter = config.emitter || null;
    this.storeSubscribedFields = config.storeSubscribedFields || [];
    this.store = config.store || null;
    this.unsubs = [];

    this.prepare();
  }

  getHTML() {
    return "";
  }

  prepare() {}

  subscribe(eventName, cb, metadata) {
    const unsub = this.emitter.subscribe(eventName, cb, metadata);
    this.unsubs.push(unsub);
  }

  emit(eventName, comparator, ...args) {
    this.emitter.emit(eventName, comparator, ...args);
  }

  storeChanged() {}

  init() {
    this.initListeners();
  }

  destroy() {
    this.removeListeners();
    this.unsubs.forEach((unsub) => unsub());
  }
}
