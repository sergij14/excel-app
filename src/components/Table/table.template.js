const CHAR_CODES = {
  A: 65,
  Z: 90,
};

function createCell(value = "") {
  return `
    <div
        class="cell"
        spellcheck="false"
        contenteditable
    >
      ${value}
    </div>
  `;
}

function createCol(data = "") {
  return `
      <div class="col">
          ${data}
          <div class="resize resize-col"></div>
      </div>
   `;
}

function createRow(data = "", idx = "") {
  return `
      <div class="inline-flex">
          <div class="row">
              ${idx ? idx : "-"}
              ${idx ? '<div class="resize resize-row"></div>' : ""}
          </div>
          <div class="flex">
              ${data}
          </div>
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
    .map((_, idx) => createCol(getChar(idx)))
    .join("");

  rows.push(createRow(cols));

  for (let i = 0; i < rowsCount; i++) {
    const cells = new Array(colsCount).fill("").map(createCell).join("");
    rows.push(createRow(cells, i + 1));
  }

  return rows.join("");
}
