import { DomListener } from "./DomListener";

export class ExcelComponent extends DomListener {
  constructor($el, config = {}) {
    super($el, config.listeners);
    this.name = config.name || "";
    this.emitter = config.emitter || null;
    this.store = config.store || null;
    this.unsubs = [];

    this.prepare();
  }

  render() {
    return "";
  }

  prepare() {}

  subscribe(eventName, cb, condition) {
    const unsub = this.emitter.subscribe(eventName, cb, condition);
    this.unsubs.push(unsub);
  }

  emit(eventName, comparator, ...args) {
    this.emitter.emit(eventName, comparator, ...args);
  }

  init() {
    this.initListeners();
  }

  destroy() {
    this.removeListeners();
    this.unsubs.forEach((unsub) => unsub());
  }
}
