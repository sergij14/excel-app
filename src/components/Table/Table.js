import { ExcelComponent } from "../../core/ExcelComponent";
import { createTable } from "./table.template";
import { resizeHandler } from "./table.helpers";
import { TableSelection } from "./TableSelection";
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

  prepare() {
    this.selection = new TableSelection();
  }

  init() {
    super.init();
    const $cell = this.$el.find('[data-id="0:0"]');
    this.selection.select($cell);
  }

  onMousedown(ev) {
    if (ev.target.dataset.resize) {
      resizeHandler(ev, this.$el);
    } else if (ev.target.dataset.type === "cell") {
      if (ev.ctrlKey) {
        return this.selection.selectGroup($(ev.target));
      }

      this.selection.select($(ev.target));
    }
  }
}
