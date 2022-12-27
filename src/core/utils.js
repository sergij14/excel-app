export function capitalize(string) {
  if (typeof string === 'string') {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return '';
}

export function findNextEl(key, {row, col}) {
  const MIN = 0;
  switch (key) {
    case 'Enter':
    case 'ArrowDown':
      break;
    case 'Tab':
    case 'ArrowRight':
      break;
    case 'ArrowLeft':
      col = col - 1 < MIN ? MIN : col - 1;
      break;
    case 'ArrowUp':
      row = row - 1 < MIN ? MIN : row - 1;
      break;
  }

  return `[data-id="${row}:${col}"]`;
}

