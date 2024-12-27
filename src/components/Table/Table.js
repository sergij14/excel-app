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

      document.onmousemove = (moveEv) => {
        const delta = moveEv.pageX - parentCoords.right;
        const newWidth = `${parentCoords.width + delta}px`;

        $parent.$el.style.width = newWidth;
        document
          .querySelectorAll(`[data-col="${$parent.dataset.col}"]`)
          .forEach((el) => (el.style.width = newWidth));
      };

      document.onmouseup = () => {
        document.onmousemove = null;
      };
    }
  }
}
