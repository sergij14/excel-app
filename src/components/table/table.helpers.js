export function parseCellData(value = '') {
  if (value.startsWith('=')) {
    try {
      return eval(value.slice(1));
    } catch {
      return value;
    }
  }
  return value;
}

export function formatDataForCSV({data, rowsCount, colsCount}) {
  let result = '';
  new Array(rowsCount).fill('').forEach((_, row) => {
    new Array(colsCount).fill('').forEach((_, col) => {
      const id = `${row}:${col}`;
      const cellValue = parseCellData(data[id]);
      const isLastCol = col === colsCount - 1;
      result += cellValue ? (isLastCol ? cellValue + '\n' : cellValue + ',') : (isLastCol ? '\n' : '' + ',');
    });
  });
  return result;
}

export function findNextEl(key, {id, maxRow, maxCol}) {
  const MIN = 0;
  let [row, col] = id.split(':');
  switch (key) {
    case 'Enter':
    case 'ArrowDown':
      row = +row + 1 >= maxRow ? maxRow - 1 : +row + 1;
      break;
    case 'Tab':
    case 'ArrowRight':
      col = +col + 1 >= maxCol ? maxCol - 1 : +col + 1;
      break;
    case 'ArrowLeft':
      col = col - 1 <= MIN ? MIN : col - 1;
      break;
    case 'ArrowUp':
      row = row - 1 <= MIN ? MIN : row - 1;
      break;
  }

  return `[data-id="${row}:${col}"]`;
}
