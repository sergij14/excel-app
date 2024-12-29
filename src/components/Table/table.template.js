import { CHAR_CODES, DEFAULT_WIDTH, MIN_HEIGHT } from "../../constants";

function createCell(value = "", rowIdx = "", colIdx = "", width = "") {
  return `
    <divv
      class="cell" data-type="cell"
      data-col="${colIdx}" data-id="${rowIdx}:${colIdx}"
      style="width: ${width}"
      spellcheck="false" contenteditable
    >
      ${value}
    </divv>
  `;
}

function createCol(col = "", idx = "", width = "", height = "") {
  return `
      <div class="col" data-type="resizable" data-col="${idx}" style="width: ${width}; height: ${height}">
          ${col}
          <div class="resize resize-col" data-resize="col"></div>
      </div>
   `;
}

function createRow(row = "", idx = "", height) {
  return `
      <div class="inline-flex" data-type="resizable" data-row="${idx}" style="height: ${height}">
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

function getHeight(rowState, idx) {
  return `${rowState[idx] || MIN_HEIGHT}px`;
}

function getCellValue(dataState, rowIdx, colIdx) {
  return dataState[`${rowIdx}:${colIdx}`];
}

function mapCol(colState) {
  return (_, idx) => createCol(getChar(idx), idx, getWidth(colState, idx));
}

function mapCell(rowState, colState, dataState, rowIdx) {
  return (_, colIdx) => {
    const cellValue = getCellValue(dataState, rowIdx, colIdx);

    return createCell(
      cellValue,
      rowIdx,
      colIdx,
      getWidth(colState, colIdx),
      getHeight(rowState, rowIdx)
    );
  };
}

export function createTable(
  rowsCount = 20,
  { colState = {}, rowState = {}, dataState = {} }
) {
  const colsCount = CHAR_CODES.Z - CHAR_CODES.A + 1;
  const rows = [];

  const cols = new Array(colsCount).fill("").map(mapCol(colState)).join("");

  rows.push(createRow(cols));

  for (let rowIdx = 0; rowIdx < rowsCount; rowIdx++) {
    const cells = new Array(colsCount)
      .fill("")
      .map(mapCell(rowState, colState, dataState, rowIdx))
      .join("");

    rows.push(createRow(cells, rowIdx + 1, getHeight(rowState, rowIdx + 1)));
  }

  return rows.join("");
}
