const {ExcelComponent} = require('../../core/ExcelComponent');

export class Formula extends ExcelComponent {
    static className = 'excel-formula'

    constructor($root) {
      super($root, {
        name: 'Formula',
        listeners: ['input'],
      });
    }

    toHTML() {
      return `
      <div class="flex w-[80px] border-r-2 border-gray-200">fx</div>
      <div class="flex-grow">
        <input class="w-full focus:outline-none" type="text" />
      </div>
      `;
    }

    onInput() {
      console.log('onInput, formula');
    }
}
