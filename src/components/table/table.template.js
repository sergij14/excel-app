import {CHAR_CODES, CELL_WIDTH, FIRST_CELL_WIDTH} from './constants';

function toCell() {
  return `
    <div class="w-[${CELL_WIDTH}px] flex justify-center border-b border-r" contenteditable>
        
    </div>
    `;
}

function toCol(col = '') {
  return `
    <div class="bg-gray-100 w-[${CELL_WIDTH}px] border-b border-r centered-cell">
        ${col}
    </div>
 `;
}

function createRow(idx, content = '') {
  return `
    <div class="inline-flex">
        <div class="w-[${FIRST_CELL_WIDTH}px] bg-gray-100 border-b border-r centered-cell">${idx}</div>
        <div class="flex">
            ${content}
        </div>
    </div>
    `;
}

function toChar(_, idx) {
  return String.fromCharCode(CHAR_CODES.A + idx);
}

export function createTable(rowsCount = 7) {
  const colsCount = 14;
  const rows = [];

  const cols = new Array(colsCount).fill('').map(toChar).map(toCol).join('');

  rows.push(createRow('A-Z', cols));

  for (let i = 0; i < rowsCount; i++) {
    const cells = new Array(colsCount).fill('').map(toCell).join('');
    rows.push(createRow(i + 1, cells));
  }

  return rows.join('');
}
