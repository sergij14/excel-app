import {DOMListener} from './DOMListener';

export class ExcelComponent extends DOMListener {
  constructor($root, config = {}) {
    super($root, config.listeners);
    this.name = config.name;
    this.emitter = config.emitter;
    this.unsubs = [];
    this.prepare();
  }

  toHTML() {
    return '';
  }

  prepare() {}

  $emit(event, ...args) {
    this.emitter.emit(event, ...args);
  }

  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn);
    this.unsubs.push(unsub);
  }

  init() {
    this.initDOMListeners();
  }

  destroy() {
    this.removeDOMListeners();
    this.unsubs.forEach((el) => el());
  }
}
