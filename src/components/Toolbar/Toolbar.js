import { $ } from "../../core/dom";
import { ExcelComponent } from "../../core/ExcelComponent";
import { createToolbar } from "./toolbar.template";

export class Toolbar extends ExcelComponent {
  static cn = "excel-toolbar";

  constructor($el, config = {}) {
    super($el, {
      name: "Toolbar",
      listeners: ["click"],
      ...config,
    });
  }

  getHTML() {
    return createToolbar(this.state);
  }

  reRender(newState) {
    this.$el.html(createToolbar(newState));
  }

  prepare() {
    this.state = {
      textAlign: "left",
      fontWeight: "normal",
      fontStyle: "normal",
      textDecoration: "none",
    };
  }

  onClick(ev) {
    const $target = $(ev.target);
    if ($target.dataset.type === "toolbar-btn") {
      const value = JSON.parse($target.dataset.value);

      this.state = { ...this.state, ...value };
      this.reRender(this.state);
    }
  }
}
