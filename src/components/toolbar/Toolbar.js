import {$} from '../../core/dom';
import {ExcelStateComponent} from '../../core/ExcelStateComponent';
import {createToolbar} from './toolbar.template';

const initialState = {
  textAlign: 'left',
  fontWeight: 'normal',
  textDecoration: 'none',
  fontStyle: 'normal',
};

export class Toolbar extends ExcelStateComponent {
  static className = 'excel-toolbar';

  constructor($root, config) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
      ...config,
    });
  }

  prepare() {
    this.initState(initialState);
  }

  init() {
    super.init();
    this.$on('table:select', ($cell) => {
      const {id} = $cell.dataset;
      const cellStyles = this.store.getState()['dataStyle'][id] || {...initialState};
      this.setState({...initialState, ...cellStyles});
    });
  }

  get template() {
    return createToolbar(this.state);
  }

  toHTML() {
    return this.template;
  }

  onClick(evt) {
    const $button = $.getNodeByDataType(evt.target, 'toolbar-btn');
    if ($button) {
      const style = JSON.parse($button.dataset.style);
      const key = Object.keys(style)[0];

      this.$emit('toolbar:applyStyle', style);
      this.setState({[key]: style[key]});
    }
  }
}
