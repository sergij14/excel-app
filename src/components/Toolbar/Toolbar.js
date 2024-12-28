import { ExcelComponent } from "../../core/ExcelComponent";

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
    return `
    <button class="hover:bg-gray-200 px-2 py-1 rounded-md cursor-pointer">
    <i class="fa-solid fa-align-left"></i>
  </button>
  <button class="hover:bg-gray-200 px-2 py-1 rounded-md cursor-pointer">
    <i class="fa-solid fa-align-center"></i>
  </button>
  <button class="hover:bg-gray-200 px-2 py-1 rounded-md cursor-pointer">
    <i class="fa-solid fa-align-right"></i>
  </button>
  <button class="hover:bg-gray-200 px-2 py-1 rounded-md cursor-pointer">
    <i class="fa-solid fa-bold"></i>
  </button>
  <button class="hover:bg-gray-200 px-2 py-1 rounded-md cursor-pointer">
    <i class="fa-solid fa-italic"></i>
  </button>
  <button class="hover:bg-gray-200 px-2 py-1 rounded-md cursor-pointer">
    <i class="fa-solid fa-underline"></i>
  </button>
    `;
  }

  onClick(ev) {
    console.log(ev.target);
  }
}
