import { AppComponent } from "../../core/AppComponent/AppComponent";
import { $ } from "../../core/DOM/dom";
import { debounce } from "../../core/utils";

export class Header extends AppComponent {
  static cn = "excel-header";

  constructor($el, config = {}) {
    super($el, { name: "Table", listeners: ["input"], ...config });
  }

  prepare() {
    this.onInput = debounce(this.onInput, 300).bind(this);
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
    this.store.setStore((prev) => ({ ...prev, tableTitle: $target.text() }));
  }
}
