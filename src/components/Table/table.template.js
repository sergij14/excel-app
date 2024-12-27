const CHAR_CODES = {
  A: 65,
  Z: 90,
};

function createCol(data = "") {
  return `
      <div class="bg-gray-100 w-[80px] border-b border-r centered-cell">
          ${data}
      </div>
   `;
}

function createRow(data = "") {
  return `
      <div class="inline-flex">
          <div class="w-[60px] bg-gray-100 border-b border-r centered-cell flex-grow">
              
          </div>
          <div class="flex">
              ${data}
          </div>
      </div>
      `;
}

export function createTable(rowsCount = 15) {
  const colsCount = CHAR_CODES.Z - CHAR_CODES.A + 1;
  const rows = [];

  const cols = new Array(colsCount)
    .fill("")
    .map((_, idx) => createCol(String.fromCharCode(CHAR_CODES.A + idx), idx))
    .join("");

  rows.push(createRow(cols));

  for (let i = 0; i < rowsCount; i++) {
    rows.push(createRow());
  }

  return rows.join("");
}
