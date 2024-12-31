import { DEFAULT_STYLES } from "../../constants";
import { AppStateComponent } from "../../core/AppComponent/AppStateComponent";
import { $ } from "../../core/DOM/dom";
import { createToolbar } from "./toolbar.template";

export class Toolbar extends AppStateComponent {
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

  init() {
    super.init();
    this.subscribe("Table:Select", ({ currentStyles }) => {
      this.setState({ ...currentStyles });
    });
  }

  prepare() {
    this.initState(DEFAULT_STYLES);
  }

  onClick(ev) {
    const $target = $(ev.target);
    if ($target.dataset.type === "toolbar-btn") {
      const value = JSON.parse($target.dataset.value);
      this.setState({ ...value });

      this.emit(`${this.name}:ApplyStyle`, value);
    }
  }
}
