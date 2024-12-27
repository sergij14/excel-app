const CHAR_CODES = {
  A: 65,
  Z: 90,
};

function createCell(value = "") {
  return `
    <div
        class="w-[120px]
        overflow-hidden border-t-transparent border-l-transparent
        border focus:visible:selected-cell focus:selected-cell"
        spellcheck="false"
        contenteditable
    >
      ${value}
    </div>
  `;
}

function createCol(data = "") {
  return `
      <div class="bg-gray-100 w-[120px] border-b border-r centered-cell relative">
          ${data}
          <div class="resize resize-col"></div>
      </div>
   `;
}

function createRow(idx = "", data = "") {
  const hasValue = Boolean(idx);
  return `
      <div class="inline-flex">
          <div class="w-[60px] bg-gray-100 border-b border-r centered-cell flex-grow relative">
              ${hasValue ? idx : "-"}
              ${hasValue ? '<div class="resize resize-row"></div>' : ""}
          </div>
          <div class="flex">
              ${data}
          </div>
      </div>
      `;
}

function getChar(_, idx) {
  return String.fromCharCode(CHAR_CODES.A + idx);
}

export function createTable(rowsCount = 20) {
  const colsCount = CHAR_CODES.Z - CHAR_CODES.A + 1;
  const rows = [];

  const cols = new Array(colsCount)
    .fill("")
    .map(getChar)
    .map(createCol)
    .join("");

  rows.push(createRow(0, cols));

  for (let i = 0; i < rowsCount; i++) {
    const cells = new Array(colsCount).fill("").map(createCell).join("");
    rows.push(createRow(i + 1, cells));
  }

  return rows.join("");
}
