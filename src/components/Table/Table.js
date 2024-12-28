import { ExcelComponent } from "../../core/ExcelComponent";
import { CHAR_CODES, createTable } from "./table.template";
import { getNextCellSelector, resizeHandler } from "./table.helpers";
import { TableSelection } from "./TableSelection";

export class Table extends ExcelComponent {
  static cn = "excel-table";
  static ROWS_COUNT = 20;
  static COLS_COUNT = CHAR_CODES.Z - CHAR_CODES.A + 1;

  constructor($el) {
    super($el, {
      name: "Table",
      listeners: ["mousedown", "keydown"],
    });
  }

  getHTML() {
    return createTable(Table.ROWS_COUNT);
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

  onKeydown(ev) {
    const keys = [
      "Enter",
      "Tab",
      "ArrowRight",
      "ArrowLeft",
      "ArrowUp",
      "ArrowDown",
    ];
    const { key } = ev;

    if (keys.includes(key)) {
      ev.preventDefault();
      const id = this.selection.current.dataset.id.split(":").map(Number);

      const $next = this.$el.find(
        getNextCellSelector(key, {
          id,
          maxRow: Table.ROWS_COUNT,
          maxCol: Table.COLS_COUNT,
        })
      );

      this.selection.selectOne($next);
    }
  }
}
