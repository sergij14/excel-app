import { ExcelComponent } from "../../core/ExcelComponent";
import { createTable } from "./table.template";
import { getNextCellSelector, parse, resizeHandler } from "./table.helpers";
import { TableSelection } from "./TableSelection";
import { $ } from "../../core/dom";
import { CHAR_CODES, DEFAULT_STYLES } from "../../constants";

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
    return createTable(Table.ROWS_COUNT, this.store.getStore());
  }

  prepare() {
    this.selection = new TableSelection();
  }

  selectCell($cell, { group = false } = {}) {
    const currentStyles = $cell.getStyle(Object.keys(DEFAULT_STYLES));

    this.emit(`${this.name}:Select`, { $cell, currentStyles });

    const colId = $cell.attr("data-col");
    const rowId = parseInt($cell.attr("data-row")) + 1;
    
    const $col = this.$el.find(`[data-is-col="${colId}"]`);
    const $row = this.$el.find(`[data-is-row="${rowId}"]`);

    const selection = {$cell, $col, $row};

    if (group) {
      return this.selection.selectGroup(selection);
    }
    this.selection.select(selection);
  }

  init() {
    super.init();
    const $cell = this.$el.find('[data-id="0:0"]');
    this.selectCell($cell);

    this.subscribe("Formula:Input", (text) => {
      this.selection.current.$cell.attr("data-value", text).text(parse(text));

      const { id } = this.selection.current.$cell.dataset;
      this.updateCellInStore(id, text);
    });

    this.subscribe("Formula:InputDone", () => {
      this.selection.current.$cell.focus();
    });

    this.subscribe("Toolbar:ApplyStyle", (value) => {
      this.selection.applyStyle(value);
      this.selection.group.forEach(({$cell}) => {
        const { id } = $cell.dataset;
        this.store.setStore((prev) => ({
          ...prev,
          dataStyles: {
            ...prev.dataStyles,
            [id]: {
              ...(prev.dataStyles[id] || {}),
              ...value,
            },
          },
        }));
      });
    });
  }

  async resizeTable(ev) {
    try {
      const { id, value, type } = await resizeHandler(ev, this.$el);
      const stateStype = [`${type}State`];

      this.store.setStore((prev) => ({
        ...prev,
        [stateStype]: {
          ...prev[stateStype],
          [id]: value,
        },
      }));
    } catch (err) {
      console.warn("Table: resize error", err);
    }
  }

  onMousedown(ev) {
    if (ev.target.dataset.resize) {
      this.resizeTable(ev);
    } else if (ev.target.dataset.type === "cell") {
      if (ev.ctrlKey) {
        return this.selectCell($(ev.target), { group: true });
      }
      this.selectCell($(ev.target));
    }
  }

  updateCellInStore(id, text) {
    this.store.setStore((prev) => ({
      ...prev,
      currentText: text,
      dataState: { ...prev.dataState, [id]: text },
    }));
  }

  onInput(ev) {
    const $target = $(ev.target);
    const text = $target.text();
    $target.attr("data-value", text);
    const { id } = $target.dataset;

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
      const id = this.selection.current.$cell.dataset.id.split(":").map(Number);

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
