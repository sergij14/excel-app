import { ExcelComponent } from "../../core/ExcelComponent";
import { createTable } from "./table.template";
import { resizeHandler } from "./table.helpers";
import { TableSelection } from "./TableSelection";

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
    this.selection.selectOne($cell);
  }

  onMousedown(ev) {
    if (ev.target.dataset.resize) {
      resizeHandler(ev, this.$el);
    } else if (ev.target.dataset.type === "cell") {
      this.selection.select(ev);
    }
  }
}
