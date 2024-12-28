import { ExcelComponent } from "../../core/ExcelComponent";
import { createTable } from "./table.template";
import { $ } from "../../core/dom";

const MIN_CELL_WIDTH = 40;
const MIN_CELL_HEIGHT = 20;

export class Table extends ExcelComponent {
  static cn = "excel-table";

  constructor($el) {
    super($el, {
      name: "Table",
      listeners: ["mousedown"],
    });
  }

  getHTML() {
    return createTable();
  }

  onMousedown(ev) {
    if (ev.target.dataset.resize) {
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
          if (width < MIN_CELL_WIDTH) return;

          const $cells = this.$el.findAll(
            `[data-col="${$parent.dataset.col}"]`
          );
          $parent.css({ width: `${width}px` });
          $cells.forEach((el) => $(el).css({ width: `${width}px` }));
        } else {
          if (height < MIN_CELL_HEIGHT) return;

          $parent.css({ height: `${height}px` });
        }
      };
    }
  }
}
