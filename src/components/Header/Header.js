import { $ } from "../../core/dom";
import { ExcelComponent } from "../../core/ExcelComponent";

export class Header extends ExcelComponent {
  static cn = "excel-header";

  constructor($el, config = {}) {
    super($el, { name: "Table", listeners: ["input"], ...config });
  }

  getHTML() {
    const { tableTitle } = this.store.getStore();
    return `
        <input
          type="text"
          value="${tableTitle}"
          class="focus:outline-none"
        />
        <div class="flex gap-2">
          <button
            class="toolbar-btn"
          >
            Delete
          </button>

          <button
            class="toolbar-btn"
          >
            Exit
          </button>
        </div>
      `;
  }

  onInput(ev) {
    const $target = $(ev.target);
    console.log($target.text());

    this.store.setStore((prev) => ({ ...prev, tableTitle: $target.text() }));
  }
}
