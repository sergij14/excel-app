const {ExcelComponent} = require('../../core/ExcelComponent');

export class Toolbar extends ExcelComponent {
  toHTML() {
    return '<h1>tool</h1>';
  }
}
