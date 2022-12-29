import {$} from '../../core/dom';
import {actions} from '../../store/actions';
import {createTable} from './table.template';
import {TableSelection} from './TableSelection';

const {ExcelComponent} = require('../../core/ExcelComponent');

export class Table extends ExcelComponent {
  static className = 'excel-table';

  constructor($root, config) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...config,
    });
  }

  toHTML() {
    return createTable(20, this.store.getState());
  }

  prepare() {
    this.selection = new TableSelection();
  }

  init() {
    super.init();
    const $cell = $.find(this.$root, '[data-id="0:0"]');
    this.selectCell($cell);

    this.$on('formula:input', (text) => {
      $.text(this.selection.current, text);
      this.updateValueInStore(text);
    });

    this.$on('formula:done', () => {
      this.selection.current.focus();
    });

    this.$subscribe((state) => console.log(state));
  }

  onMousedown(evt) {
    if (evt.target.dataset.type == 'cell') {
      this.selectCell(evt.target);
    }
  }

  selectCell($cell) {
    this.selection.select($cell);
    this.$emit('table:select', $cell);
  }

  onKeydown(evt) {
    const {key} = evt;

    const keys = [
      'Enter',
      'ArrowDown',
      'Tab',
      'ArrowRight',
      'ArrowLeft',
      'ArrowUp',
    ];

    if (keys.includes(key) && !evt.shiftKey) {
      evt.preventDefault();

      const [row, col] = this.selection.current.dataset.id.split(':');
      const $next = $.find(this.$root, findNextEl(key, {row, col}));
      this.selectCell($next);
    }
  }

  onInput(evt) {
    // if (evt.target.dataset.type === 'cell') {
    //   this.$emit('table:input', evt.target);
    // }
    this.updateValueInStore($.text(evt.target));
  }

  updateValueInStore(value) {
    this.$dispatch(
        actions.changeValue({
          value,
          id: this.selection.current.dataset.id,
        })
    );
  }
}

function findNextEl(key, {row, col}) {
  const MIN = 0;
  switch (key) {
    case 'Enter':
    case 'ArrowDown':
      row++;
      break;
    case 'Tab':
    case 'ArrowRight':
      col++;
      break;
    case 'ArrowLeft':
      col = col - 1 < MIN ? MIN : col - 1;
      break;
    case 'ArrowUp':
      row = row - 1 < MIN ? MIN : row - 1;
      break;
  }

  return `[data-id="${row}:${col}"]`;
}
