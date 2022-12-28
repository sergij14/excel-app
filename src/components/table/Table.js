import {createTable} from './table.template';
import {TableSelection} from './TableSelection';

const {ExcelComponent} = require('../../core/ExcelComponent');

export class Table extends ExcelComponent {
  static className = 'excel-table';

  constructor($root, config) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown'],
      ...config,
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

    this.emitter.subscribe('input', (text) => {
      this.selection.current.textContent = text;
    });
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
      const $next = this.$root.querySelector(findNextEl(key, {row, col}));
      this.selection.select($next);
    }
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
