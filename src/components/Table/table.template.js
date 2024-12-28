export const CHAR_CODES = {
  A: 65,
  Z: 90,
};

const DEFAULT_WIDTH = 120;

function createCell(rowIdx = "", colIdx = "", width = "") {
  return `
    <div
      class="cell" data-type="cell"
      data-col="${colIdx}" data-id="${rowIdx}:${colIdx}"
      style="width: ${width}"
      spellcheck="false" contenteditable
    ></div>
  `;
}

function createCol(col = "", idx = "", width = "") {
  return `
      <div class="col" data-type="resizable" data-col="${idx}" style="width: ${width}">
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

function getWidth(colState, idx) {
  return `${colState[idx] || DEFAULT_WIDTH}px`;
}

export function createTable(rowsCount = 20, { colState = {} }) {
  const colsCount = CHAR_CODES.Z - CHAR_CODES.A + 1;
  const rows = [];

  const cols = new Array(colsCount)
    .fill("")
    .map((_, idx) => createCol(getChar(idx), idx, getWidth(colState, idx)))
    .join("");

  rows.push(createRow(cols));

  for (let rowIdx = 0; rowIdx < rowsCount; rowIdx++) {
    const cells = new Array(colsCount)
      .fill("")
      .map((_, colIdx) =>
        createCell(rowIdx, colIdx, getWidth(colState, colIdx))
      )
      .join("");
    rows.push(createRow(cells, rowIdx + 1));
  }

  return rows.join("");
}
