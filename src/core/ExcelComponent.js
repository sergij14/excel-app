import {DOMListener} from './DOMListener';

export class ExcelComponent extends DOMListener {
  constructor($root, config = {}) {
    super($root, config.listeners);
    this.name = config.name;
  }
  toHTML() {
    return '';
  }

  init() {
    this.initDOMListeners();
  }
}
