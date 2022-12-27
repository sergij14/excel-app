const CHAR_CODES = {
  A: 65,
  Z: 90,
};

function toCell() {
  return `
    <div class="w-[80px] flex justify-center border-b border-r" contenteditable>
        
    </div>
    `;
}

function toCol(col = '') {
  return `
    <div class="bg-gray-100 w-[80px] border-b border-r centered-cell">
        ${col}
    </div>
 `;
}

function createRow(idx, content = '') {
  return `
    <div class="inline-flex">
        <div class="w-[60px] bg-gray-100 border-b border-r centered-cell">${idx}</div>
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
  const colsCount = CHAR_CODES.Z - CHAR_CODES.A + 1;
  const rows = [];

  const cols = new Array(colsCount).fill('').map(toChar).map(toCol).join('');

  rows.push(createRow('A-Z', cols));

  for (let i = 0; i < rowsCount; i++) {
    const cells = new Array(colsCount).fill('').map(toCell).join('');
    rows.push(createRow(i + 1, cells));
  }

  return rows.join('');
}
