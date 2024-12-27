import { DomListener } from "./DomListener";

export class ExcelComponent extends DomListener {
  constructor($el, config = {}) {
    super($el, config.listeners);
    this.name = config.name || "";
  }

  render() {
    return "";
  }

  init() {
    this.initListeners();
  }

  destroy() {
    this.removeListeners();
  }
}
