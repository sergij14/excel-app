const CHAR_CODES = {
  A: 65,
  Z: 90,
};

function createCell(rowIdx = "", colIdx = "") {
  return `
    <div class="cell" data-type="cell" data-col="${colIdx}" data-id="${colIdx}:${rowIdx}" spellcheck="false" contenteditable>
    </div>
  `;
}

function createCol(col = "", idx = "") {
  return `
      <div class="col" data-type="resizable" data-col="${idx}">
          ${col}
          <div class="resize resize-col" data-resize="col"></div>
      </div>
   `;
}

function createRow(row = "", idx = "") {
  return `
      <div class="inline-flex" data-type="resizable">
          <div class="row">
              ${idx ? idx : "-"}
              ${
                idx
                  ? '<div class="resize resize-row" data-resize="row"></div>'
                  : ""
              }
          </div>
          <div class="flex">${row}</div>
      </div>
      `;
}

function getChar(idx) {
  return String.fromCharCode(CHAR_CODES.A + idx);
}

export function createTable(rowsCount = 20) {
  const colsCount = CHAR_CODES.Z - CHAR_CODES.A + 1;
  const rows = [];

  const cols = new Array(colsCount)
    .fill("")
    .map((_, idx) => createCol(getChar(idx), idx))
    .join("");

  rows.push(createRow(cols));

  for (let rowIdx = 0; rowIdx < rowsCount; rowIdx++) {
    const cells = new Array(colsCount)
      .fill("")
      .map((_, colIdx) => createCell(rowIdx, colIdx))
      .join("");
    rows.push(createRow(cells, rowIdx + 1));
  }

  return rows.join("");
}
