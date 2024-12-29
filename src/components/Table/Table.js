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
    return createTable(Table.ROWS_COUNT, this.store.getState());
  }

  prepare() {
    this.selection = new TableSelection();
  }

  selectCell($cell) {
    this.emit(`${this.name}:Select`, $cell);
    this.selection.select($cell);
    this.store.setState((prev) => ({
      ...prev,
      activeCell: $cell.dataset.id,
    }));
  }

  init() {
    super.init();
    const { activeCell } = this.store.getState();
    const $cell = this.$el.find(
      `[data-id="${activeCell ? activeCell : "0:0"}"]`
    );

    this.selectCell($cell);

    this.subscribe("Formula:Input", (text) => {
      this.selection.current.text(text);
      const { id } = this.selection.current.dataset;
      this.updateCellInStore(id, text);
    });

    this.subscribe("Formula:InputDone", () => {
      this.selection.current.focus();
    });
  }

  async resizeTable(ev) {
    try {
      const { id, value, type } = await resizeHandler(ev, this.$el);
      const newState = this.store.getState();
      newState[`${type}State`][id] = value;

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

  updateCellInStore(id, text) {
    const newState = this.store.getState();
    newState.currentText = text;
    newState.dataState[id] = text;

    this.store.setState(newState);
  }

  onInput(ev) {
    const text = $(ev.target).text();
    const { id } = $(ev.target).dataset;
    this.updateCellInStore(id, text);
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
