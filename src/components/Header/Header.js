import { ExcelComponent } from "../../core/ExcelComponent";

export class Header extends ExcelComponent {
  static cn = "excel-header";

  constructor($el, config = {}) {
    super($el, { name: "Table", ...config });
  }

  getHTML() {
    return `
        <input
          type="text"
          value="New Table"
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
}
