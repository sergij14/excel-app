const {ExcelComponent} = require('../../core/ExcelComponent');

export class Formula extends ExcelComponent {
    static className = 'excel-formula'

    toHTML() {
      return `
      <div class="flex w-[80px] border-r-2 border-gray-200">fx</div>
      <div class="flex-grow">
        <input class="w-full focus:outline-none" type="text" />
      </div>
      `;
    }
}
