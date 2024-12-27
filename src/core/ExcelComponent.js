import { DomListener } from "./DomListener";

export class ExcelComponent extends DomListener {
  constructor($el, config = {}) {
    super($el, config.listeners);
    this.init();
  }

  render() {
    return "";
  }

  init() {
    this.initListeners();
  }
}
