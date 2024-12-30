import {
  CHAR_CODES,
  DEFAULT_STYLES,
  DEFAULT_WIDTH,
  MIN_HEIGHT,
} from "../../constants";
import { camelcaseToDashed } from "../../core/utils";
import { parse } from "./table.helpers";

function getCellInlineStyles(styles = {}) {
  styles = { ...DEFAULT_STYLES, ...styles };
  return Object.keys(styles)
    .map((key) => {
      const dashedCaseKey = camelcaseToDashed(key);
      return `${dashedCaseKey}: ${styles[key]}`;
    })
    .join("; ");
}

function createCell(
  value = "",
  rowIdx = "",
  colIdx = "",
  width = "",
  styles = {}
) {
  return `
    <div
      class="cell" data-type="cell"
      data-col="${colIdx}" data-row="${rowIdx}" data-id="${rowIdx}:${colIdx}" data-value="${value}"
      style="width: ${width}; ${getCellInlineStyles(styles)}"
      spellcheck="false" contenteditable
    >
      ${parse(value)}
    </div>
  `;
}

function createCol(col = "", idx = "", width = "", height = "") {
  return `
      <div class="col" data-is-col="${idx}" data-type="resizable" data-col="${idx}" style="width: ${width}; height: ${height}">
          ${col}
          <div class="resize resize-col" data-resize="col"></div>
      </div>
   `;
}

function createRow(row = "", idx = "", height = "") {
  return `
      <div class="inline-flex" data-type="resizable" data-row="${idx}" style="height: ${height}">
          <div class="row" data-is-row="${idx}">
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

function getCellData({ dataState, dataStyles }, rowIdx, colIdx) {
  return {
    value: dataState[`${rowIdx}:${colIdx}`],
    styles: dataStyles[`${rowIdx}:${colIdx}`],
  };
}

function mapCol(colState) {
  return (_, idx) => createCol(getChar(idx), idx, getWidth(colState, idx));
}

function mapCell({ colState, dataState, dataStyles }, rowIdx) {
  return (_, colIdx) => {
    const { value, styles } = getCellData(
      { dataState, dataStyles },
      rowIdx,
      colIdx
    );
    const cellWidth = getWidth(colState, colIdx);

    return createCell(value, rowIdx, colIdx, cellWidth, styles);
  };
}

export function createTable(rowsCount = 20, state) {
  const colsCount = CHAR_CODES.Z - CHAR_CODES.A + 1;
  const rows = [];

  const cols = new Array(colsCount)
    .fill("")
    .map(mapCol(state.colState))
    .join("");

  rows.push(createRow(cols));

  for (let rowIdx = 0; rowIdx < rowsCount; rowIdx++) {
    const cells = new Array(colsCount)
      .fill("")
      .map(mapCell(state, rowIdx))
      .join("");

    rows.push(
      createRow(cells, rowIdx + 1, getHeight(state.rowState, rowIdx + 1))
    );
  }

  return rows.join("");
}
