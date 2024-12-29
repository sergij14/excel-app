import { ExcelComponent } from "../../core/ExcelComponent";
import { $ } from "../../core/dom";

export class Formula extends ExcelComponent {
  static cn = "excel-formula";

  constructor($el, config = {}) {
    super($el, {
      name: "Formula",
      listeners: ["keydown", "input"],
      ...config,
    });
  }

  getHTML() {
    return `
    <div class="w-[60px] bg-gray-100 border-r centered-cell">fx</div>
    <div class="flex-grow">
      <input class="w-full px-2 focus:outline-none" type="text" />
    </div>
    `;
  }

  onInput(ev) {
    this.emit(`${this.name}:Input`, $(ev.target).text());
  }

  onKeydown(ev) {
    const keys = ["Enter", "Tab"];
    if (keys.includes(ev.key)) {
      ev.preventDefault();

      this.emit(`${this.name}:InputDone`);
    }
  }

  init() {
    super.init();
    this.$formula = this.$el.find("input");

    this.subscribe(
      "Store:StateUpdate",
      ({ currentText }) => this.$formula.text(currentText),
      {
        path: "currentText",
      }
    );

    this.subscribe("Table:Select", ({ $cell }) => {
      this.$formula.text($cell.attr("data-value"));
    });
  }
}
