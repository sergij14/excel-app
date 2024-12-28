import { ExcelComponent } from "../../core/ExcelComponent";
import { CHAR_CODES, createTable } from "./table.template";
import { getNextCellSelector, resizeHandler } from "./table.helpers";
import { TableSelection } from "./TableSelection";
import { $ } from "../../core/dom";

export class Table extends ExcelComponent {
  static cn = "excel-table";
  static ROWS_COUNT = 20;
  static COLS_COUNT = CHAR_CODES.Z - CHAR_CODES.A + 1;

  constructor($el, config = {}) {
    super($el, {
      name: "Table",
      listeners: ["mousedown", "keydown", "input"],
      ...config,
    });
  }

  getHTML() {
    return createTable(Table.ROWS_COUNT);
  }

  prepare() {
    this.selection = new TableSelection();
  }

  selectCell($cell) {
    this.emit(`${this.name}:Select`, undefined, $cell);
    this.selection.select($cell);
    this.store.setState({ table: { activeCell: $cell.dataset.id } });
  }

  init() {
    super.init();
    const $cell = this.$el.find('[data-id="0:0"]');
    this.selectCell($cell);

    this.subscribe("Formula:Input", (value) => {
      this.selection.current.text(value);
    });

    this.subscribe("Formula:InputDone", () => {
      this.selection.current.focus();
    });

    this.subscribe(
      "Store:StateUpdate",
      (data) => {
        console.log("nerwstate", data);
      },
      (state) => ({
        toolbar: state.table.activeCell,
      })
    );
  }

  onMousedown(ev) {
    if (ev.target.dataset.resize) {
      resizeHandler(ev, this.$el);
    } else if (ev.target.dataset.type === "cell") {
      this.selectCell($(ev.target));
    }
  }

  onInput(ev) {
    this.emit(`${this.name}:Input`, undefined, $(ev.target));
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

      this.selectCell($next);
    }
  }
}
