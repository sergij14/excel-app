import { ExcelComponent } from "../../core/ExcelComponent";
import { createTable } from "./table.template";
import { getNextCellSelector, resizeHandler } from "./table.helpers";
import { TableSelection } from "./TableSelection";
import { $ } from "../../core/dom";
import { CHAR_CODES } from "./table.constants";

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
    return createTable(Table.ROWS_COUNT, this.store.getState().table);
  }

  prepare() {
    this.selection = new TableSelection();
  }

  selectCell($cell) {
    this.emit(`${this.name}:Select`, $cell);
    this.selection.select($cell);
    this.store.setState((prev) => ({
      ...prev,
      table: { ...prev.table, activeCell: $cell.dataset.id },
    }));
  }

  init() {
    super.init();
    const cellIdFromState = this.store.getState().table.activeCell;
    const $cell = this.$el.find(
      `[data-id="${cellIdFromState ? cellIdFromState : "0:0"}"]`
    );

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
        console.log(data);
      },
      { path: "table.colState" }
    );
  }

  async resizeTable(ev) {
    try {
      const { id, value, type } = await resizeHandler(ev, this.$el);
      const newState = this.store.getState();
      newState.table[`${type}State`][id] = value;

      this.store.setState(newState);
    } catch (err) {
      console.warn("Table: resize error", err);
    }
  }

  onMousedown(ev) {
    if (ev.target.dataset.resize) {
      this.resizeTable(ev);
    } else if (ev.target.dataset.type === "cell") {
      this.selectCell($(ev.target));
    }
  }

  onInput(ev) {
    this.emit(`${this.name}:Input`, $(ev.target));
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
