import { $ } from "../../core/dom";

const MIN_CELL_WIDTH = 40;
const MIN_CELL_HEIGHT = 26;

export function getNextCellSelector(key, { id, maxRow, maxCol }) {
  const MIN = 0;
  let [row, col] = id;

  switch (key) {
    case "Enter":
    case "Tab":
    case "ArrowDown":
      row = +row + 1 >= maxRow ? maxRow - 1 : +row + 1;
      break;
    case "ArrowRight":
      col = +col + 1 >= maxCol ? maxCol - 1 : +col + 1;
      break;
    case "ArrowLeft":
      col = col - 1 <= MIN ? MIN : col - 1;
      break;
    case "ArrowUp":
      row = row - 1 <= MIN ? MIN : row - 1;
      break;
  }

  return `[data-id="${row}:${col}"]`;
}

export function resizeHandler(ev, $el) {
  const $resizer = $(ev.target);
  const $parent = $resizer.closest('[data-type="resizable"');
  const parentCoords = $parent.getCoords();
  const resizeType = $resizer.dataset.resize;
  const sideProp = resizeType === "col" ? "bottom" : "right";

  let width, height;
  $resizer.css({ opacity: 1, [sideProp]: "-5000px" });

  document.onmousemove = (moveEv) => {
    if (resizeType === "col") {
      const delta = moveEv.pageX - parentCoords.right;
      width = parentCoords.width + delta;
      $resizer.css({ right: `${-delta}px` });
    } else {
      const delta = moveEv.pageY - parentCoords.bottom;
      height = parentCoords.height + delta;
      $resizer.css({ bottom: `${-delta}px` });
    }
  };

  document.onmouseup = () => {
    document.onmousemove = null;
    document.onmouseup = null;

    $resizer.css({ opacity: 0, bottom: 0, right: 0 });

    if (resizeType === "col") {
      if (width < MIN_CELL_WIDTH) {
        width = MIN_CELL_WIDTH;
      }

      const $cells = $el.findAll(`[data-col="${$parent.dataset.col}"]`);
      $parent.css({ width: `${width}px` });
      $cells.forEach((el) => $(el).css({ width: `${width}px` }));
    } else {
      if (height < MIN_CELL_HEIGHT) {
        height = MIN_CELL_HEIGHT;
      }

      $parent.css({ height: `${height}px` });
    }
  };
}
