import {DOMListener} from './DOMListener';

export class ExcelComponent extends DOMListener {
  constructor($root, config = {}) {
    super($root, config.listeners);
    this.name = config.name;
    this.prepare();
  }
  toHTML() {
    return '';
  }

  prepare() {}

  init() {
    this.initDOMListeners();
  }

  destroy() {
    this.removeDOMListeners();
  }
}
