import { ExcelComponent } from "../../core/ExcelComponent";
import { createTable } from "./table.template";
import { resizeHandler } from "./table.helpers";

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
      resizeHandler(ev, this.$el)
    }
  }
}
