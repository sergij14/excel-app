import { ExcelComponent } from "../../core/ExcelComponent";

export class Formula extends ExcelComponent {
  static cn = "excel-formula";

  constructor($el, config = {}) {
    super($el, {
      name: "Formula",
      listeners: ["input"],
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
    this.emitter.emit(`${this.name}:Input`, ev.target.value);
  }
}
