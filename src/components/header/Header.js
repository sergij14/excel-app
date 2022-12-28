const {ExcelComponent} = require('../../core/ExcelComponent');

export class Header extends ExcelComponent {
    static className = 'excel-header'

    constructor($root, config) {
      super($root, {
        name: 'Header',
        ...config,
      });
    }

    toHTML() {
      return `
      <input
      type="text"
      value="New table"
      class="focus:outline-none"
    />
    <div class="flex gap-2">
      <button
        class="hover:text-blue-500 rounded-md bg-gray-200 px-2 py-1 cursor-pointer"
      >
        <i class="fa-sharp fa-solid fa-trash"></i>
      </button>
      <button
        class="hover:text-blue-500 rounded-md bg-gray-200 px-2 py-1 cursor-pointer"
      >
        <i class="fa-sharp fa-solid fa-right-from-bracket"></i>
      </button>
    </div>
      `;
    }
}
