import {createTable} from './table.template';
import {TableSelection} from './TableSelection';

const {ExcelComponent} = require('../../core/ExcelComponent');

export class Table extends ExcelComponent {
    static className = 'excel-table'

    constructor($root) {
      super($root, {
        name: 'Table',
        listeners: ['mousedown'],
      });
    }

    toHTML() {
      return createTable();
    }

    prepare() {
      this.selection = new TableSelection();
    }

    init() {
      super.init();
      const $cell = this.$root.querySelector('[data-id="0:0"]');
      this.selection.select($cell);
    }

    onMousedown(evt) {
      if (evt.target.dataset.type == 'cell') {
        if (evt.shiftKey) {
          this.selection.selectGroup(evt.target);
        } else {
          this.selection.select(evt.target);
        }
      }
    }
}
