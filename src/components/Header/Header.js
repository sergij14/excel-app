import { AppComponent } from "../../core/AppComponent/AppComponent";
import { $ } from "../../core/DOM/dom";
import { activeRoute } from "../../core/Router/Router";
import { debounce } from "../../core/utils";

export class Header extends AppComponent {
  static cn = "excel-header";

  constructor($el, config = {}) {
    super($el, { name: "Table", listeners: ["input", "click"], ...config });
  }

  prepare() {
    this.onInput = debounce(this.onInput, 300).bind(this);
  }

  getHTML() {
    const { tableTitle } = this.store.getStore();
    return `
        <input type="text" value="${tableTitle}" class="focus:outline-none" />
        <div class="flex gap-2">
          <button data-type="delete" class="header-btn"><i class="fa-solid fa-trash"></i>Delete</button>
          <button data-type="exit" class="header-btn"><i class="fa-solid fa-arrow-right-from-bracket"></i>Exit</button>
        </div>
      `;
  }

  onClick(ev) {
    const $target = $(ev.target);

    if ($target.dataset.type === "delete") {
      const decision = confirm("Are you sure you want to delete table?");
      if (decision) {
        localStorage.removeItem(`excel:${activeRoute.getParams().list[0]}`);
        activeRoute.navigate("/");
      }
    } else if ($target.dataset.type === "exit") {
      activeRoute.navigate("/");
    }
  }

  onInput(ev) {
    const $target = $(ev.target);
    this.store.setStore((prev) => ({ ...prev, tableTitle: $target.text() }));
  }
}
