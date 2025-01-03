import { AppComponent } from "../../core/AppComponent/AppComponent";
import { $ } from "../../core/DOM/dom";

export class Formula extends AppComponent {
  static cn = "excel-formula";

  constructor($el, config = {}) {
    super($el, {
      name: "Formula",
      listeners: ["keydown", "input"],
      storeSubscribedFields: ["currentText"],
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

  storeChanged({ currentText }) {
    this.$formula.text(currentText);
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
    this.subscribe("Table:Select", ({ $cell }) => {
      this.$formula.text($cell.attr("data-value"));
    });
  }
}
