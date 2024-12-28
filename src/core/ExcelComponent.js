import { DomListener } from "./DomListener";

export class ExcelComponent extends DomListener {
  constructor($el, config = {}) {
    super($el, config.listeners);
    this.name = config.name || "";
    this.emitter = config.emitter || null;

    this.prepare();
  }

  render() {
    return "";
  }

  prepare() {}

  init() {
    this.initListeners();
  }

  destroy() {
    this.removeListeners();
  }
}
