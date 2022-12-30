import {$} from '../../core/dom';
import {ExcelComponent} from '../../core/ExcelComponent';
import {parse} from '../../core/utils';
import {actions} from '../../store/actions';
import {CHAR_CODES, createTable} from './table.template';
import {TableSelection} from './TableSelection';

export class Table extends ExcelComponent {
  static className = 'excel-table';
  static colsCount = CHAR_CODES.Z - CHAR_CODES.A + 1;
  static rowsCount = 20;

  constructor($root, config) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...config,
    });
  }

  toHTML() {
    return createTable(Table.rowsCount, Table.colsCount, this.store.getState());
  }

  prepare() {
    this.selection = new TableSelection();
  }

  init() {
    super.init();
    const $cell = $.find(this.$root, '[data-id="0:0"]');
    this.selectCell($cell);

    this.$on('formula:input', (value) => {
      $.attr(this.selection.current, {name: 'data-value', value});
      $.text(this.selection.current, parse(value));

      this.updateValueInStore(value);
    });

    this.$on('formula:done', () => {
      this.selection.current.focus();
    });

    this.$on('toolbar:applyStyle', (style) => {
      this.updateStyleInStore(style);
      $.css(this.selection.current, style);
    });
  }

  onMousedown(evt) {
    if ($.getNodeByDataType(evt.target, 'cell')) {
      this.selectCell(evt.target);
    }
  }

  selectCell($cell) {
    const [row, col] = $cell.dataset.id.split(':');
    const $row = $.find(this.$root, `[data-row-id="${row}"]`);
    const $col = $.find(this.$root, `[data-col-id="${col}"]`);

    this.selection.select($cell, [$row, $col]);
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

    if (keys.includes(key)) {
      evt.preventDefault();

      const {id} = this.selection.current.dataset;
      const $next = $.find(
          this.$root,
          findNextEl(key, {
            id,
            maxRow: Table.rowsCount,
            maxCol: Table.colsCount,
          })
      );
      this.selectCell($next);
    }
  }

  onInput(evt) {
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

  updateStyleInStore(style) {
    this.$dispatch(
        actions.changeStyle({
          style,
          key: Object.keys(style)[0],
          id: this.selection.current.dataset.id,
        })
    );
  }
}

function findNextEl(key, {id, maxRow, maxCol}) {
  const MIN = 0;
  let [row, col] = id.split(':');
  switch (key) {
    case 'Enter':
    case 'ArrowDown':
      row = +row + 1 >= maxRow ? maxRow - 1 : +row + 1;
      break;
    case 'Tab':
    case 'ArrowRight':
      col = +col + 1 >= maxCol ? maxCol - 1 : +col + 1;
      break;
    case 'ArrowLeft':
      col = col - 1 <= MIN ? MIN : col - 1;
      break;
    case 'ArrowUp':
      row = row - 1 <= MIN ? MIN : row - 1;
      break;
  }

  return `[data-id="${row}:${col}"]`;
}
