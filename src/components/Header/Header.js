import { ExcelComponent } from "../../core/ExcelComponent";

export class Header extends ExcelComponent {
  static cn = "excel-header";

  constructor($el) {
    super($el);
  }

  render() {
    return `
        <input
          type="text"
          value=""
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
