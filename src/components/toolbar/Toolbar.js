import {ExcelStateComponent} from '../../core/ExcelStateComponent';
import {createToolbar} from './toolbar.template';

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
    const initialState = {
      textAlign: 'left',
      fontWeight: 'normal',
      textDecoration: 'none',
      fontStyle: 'normal',
    };
    this.initState(initialState);
  }

  get template() {
    return createToolbar(this.state);
  }

  toHTML() {
    return this.template;
  }

  onClick(evt) {
    const $button =
      (evt.target.dataset.tool && evt.target) ||
      (evt.target.parentElement.dataset.tool && evt.target.parentElement);

    if ($button) {
      const style = JSON.parse($button.dataset.style);
      const key = Object.keys(style)[0];

      this.setState({[key]: style[key]});
    }
  }
}
