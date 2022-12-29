import {$} from './dom';
import {ExcelComponent} from './ExcelComponent';

export class ExcelStateComponent extends ExcelComponent {
  constructor(...args) {
    super(...args);
  }

  get template() {
    return '';
  }

  initState(state) {
    this.state = {...state};
  }

  setState(newState) {
    this.state = {...this.state, ...newState};
    $.html(this.$root, this.template);
  }
}
