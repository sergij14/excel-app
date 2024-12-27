import { ExcelComponent } from "../../core/ExcelComponent";
import { createTable } from "./table.template";

export class Table extends ExcelComponent {
  static cn = "excel-table";

  constructor($el) {
    super($el, {
      name: "Table",
      listeners: ["click", "mousedown", "mousemove", "mouseup"],
    });
  }

  getHTML() {
    return createTable();
  }

  onClick(ev) {
    console.log(ev), "click";
  }

  onMousedown(ev) {
    console.log(ev, "mousedown");
  }

  onMouseup(ev) {
    console.log(ev, "mouseup");
  }

  onMousemove(ev) {
    console.log(ev, "mousemove");
  }
}
