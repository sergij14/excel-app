import {defaultState} from '../store/initialState';
import {DOMListener} from './DOMListener';
import {storage} from './utils';

export class ExcelComponent extends DOMListener {
  constructor($root, config = {}) {
    super($root, config.listeners);
    this.name = config.name;
    this.emitter = config.emitter;
    this.store = config.store;
    this.storageOff = config.storageOff;
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

  $dispatch(action) {
    this.store.dispatch(action);
  }

  $subscribe(fn) {
    this.storeSub = this.store.subscribe(fn);
  }

  init() {
    this.initDOMListeners();
  }

  clearStorage() {
    this.storageOff();
    storage('excel-state', defaultState);
  }

  destroy() {
    this.removeDOMListeners();
    this.unsubs.forEach((el) => el());
    this.storeSub?.unsubscribe();
  }
}
