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
    return createToolbar();
  }

  onClick(ev) {
    const $target = $(ev.target);
    if ($target.dataset.type === "toolbar-btn") {
      console.log($target.dataset);
    }
  }
}
