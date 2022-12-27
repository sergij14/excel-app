import {DOMListener} from './DOMListener';

export class ExcelComponent extends DOMListener {
  constructor($root, config = {}) {
    super($root, config.listeners);
  }
  toHTML() {
    return '';
  }

  init() {
    this.initDOMListeners();
  }
}
