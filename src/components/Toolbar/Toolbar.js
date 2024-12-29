import { $ } from "../../core/dom";
import { ExcelStateComponent } from "../../core/ExcelStateComponent";
import { createToolbar } from "./toolbar.template";

export class Toolbar extends ExcelStateComponent {
  static cn = "excel-toolbar";

  constructor($el, config = {}) {
    super($el, {
      name: "Toolbar",
      listeners: ["click"],
      ...config,
    });
  }

  get template() {
    return createToolbar(this.state);
  }

  getHTML() {
    return this.template;
  }

  prepare() {
    this.initState({
      textAlign: "left",
      fontWeight: "normal",
      fontStyle: "normal",
      textDecoration: "none",
    });
  }

  onClick(ev) {
    const $target = $(ev.target);
    if ($target.dataset.type === "toolbar-btn") {
      const value = JSON.parse($target.dataset.value);
      this.setState({...value});
    }
  }
}
