import { ExcelComponent } from "../../core/ExcelComponent";
import { createTable } from "./table.template";
import { $ } from "../../core/dom";

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
      const $cells = this.$el.findAll(`[data-col="${$parent.dataset.col}"]`);

      document.onmousemove = (moveEv) => {
        if (resizeType === "col") {
          const delta = moveEv.pageX - parentCoords.right;
          const newWidth = `${parentCoords.width + delta}px`;

          $parent.$el.style.width = newWidth;
          $cells.forEach((el) => (el.style.width = newWidth));
        } else {
          const delta = moveEv.pageY - parentCoords.bottom;
          const newHeight = `${parentCoords.height + delta}px`;

          $parent.$el.style.height = newHeight;
        }
      };

      document.onmouseup = () => {
        document.onmousemove = null;
      };
    }
  }
}
