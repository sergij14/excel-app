import {parse, toInlineStyles} from '../../core/utils';

export const CHAR_CODES = {
  A: 65,
  Z: 90,
};

function toCell(state, row) {
  return (_, col) => {
    const id = `${row}:${col}`;
    const value = state.dataState[id] || '';
    const styles = state.dataStyle[id];
    return `
      <div
          class="w-[80px]
          overflow-hidden border-t-transparent border-l-transparent
          border focus:visible:selected-cell focus:selected-cell"
          data-id="${row}:${col}"
          data-type="cell"
          data-value="${value}"
          style="${toInlineStyles(styles)}"
          contenteditable
      >
        ${parse(value)}
      </div>
      `;
  };
}

function toCol(col = '', idx) {
  return `
    <div
        class="bg-gray-100 w-[80px] border-b border-r centered-cell"
        data-col-id="${idx}"
        >
        ${col}
    </div>
 `;
}

function createRow(idx, content = '') {
  return `
    <div class="inline-flex">
        <div
            class="w-[60px] bg-gray-100 border-b border-r centered-cell flex-grow"
            data-row-id="${idx - 1}"
            >
            ${idx}
        </div>
        <div class="flex">
            ${content}
        </div>
    </div>
    `;
}

function toChar(_, idx) {
  return String.fromCharCode(CHAR_CODES.A + idx);
}

export function createTable(rowsCount, colsCount, state = {}) {
  const rows = [];

  const cols = new Array(colsCount).fill('').map(toChar).map(toCol).join('');

  rows.push(createRow('A-Z', cols));

  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(toCell(state, row))
        .join('');
    rows.push(createRow(row + 1, cells));
  }

  return rows.join('');
}
