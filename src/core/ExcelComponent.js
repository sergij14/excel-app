import { DomListener } from "./DomListener";

export class ExcelComponent extends DomListener {
  constructor($el, config = {}) {
    super($el, config.listeners);
    this.name = config.name || "";
    this.emitter = config.emitter || null;
    this.unsubs = [];

    this.prepare();
  }

  render() {
    return "";
  }

  prepare() {}

  subscribe(eventName, cb) {
    const unsub = this.emitter.subscribe(eventName, cb);
    this.unsubs.push(unsub);
  }

  emit(eventName, ...args) {
    this.emitter.emit(eventName, ...args);
  }

  init() {
    this.initListeners();
  }

  destroy() {
    this.removeListeners();
    this.unsubs.forEach((unsub) => unsub());
  }
}
