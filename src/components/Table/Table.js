import { ExcelComponent } from "../../core/ExcelComponent";

export class Table extends ExcelComponent {
  static cn = "excel-table";

  constructor($el) {
    super($el);
  }

  getHTML() {
    return `
    <div class="flex border-b-2 border-gray-300">
    <div class="flex w-[80px] border-r-2 border-gray-200"></div>
    <div class="flex">
      <div
        class="border-r-2 border-gray-200 bg-gray-100 w-[180px] flex justify-center"
      >
        a
      </div>
      <div
        class="border-r-2 border-gray-200 bg-gray-100 w-[180px] flex justify-center"
      >
        b
      </div>
      <div
        class="border-r-2 border-gray-200 bg-gray-100 w-[180px] flex justify-center"
      >
        c
      </div>
    </div>
  </div>
  <div class="flex border-b-2 border-gray-300">
    <div class="flex w-[80px] border-gray-200 bg-gray-100">1</div>
    <div class="flex">
      <div
        class="border-r-2 border-gray-200 w-[180px] flex justify-center"
      >
        a data
      </div>
      <div
        class="border-r-2 border-gray-200 w-[180px] flex justify-center"
      >
        b data
      </div>
      <div
        class="border-r-2 border-gray-200 w-[180px] flex justify-center"
      >
        c data
      </div>
    </div>
  </div>
    `;
  }
}
