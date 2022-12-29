import {createToolbar} from './toolbar.template';

const {ExcelComponent} = require('../../core/ExcelComponent');

export class Toolbar extends ExcelComponent {
  static className = 'excel-toolbar';

  constructor($root, config) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
      ...config,
    });
  }

  toHTML() {
    return createToolbar();
  }

  onClick(evt) {
    const button =
      (evt.target.dataset.tool && evt.target) ||
      (evt.target.parentElement.dataset.tool && evt.target.parentElement);

    if (button) {
      const {tool, style} = button.dataset;
      console.log(tool, style);
    }
  }
}
