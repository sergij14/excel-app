
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
      <div class="w-[60px] bg-gray-100 border-r centered-cell">fx</div>
      <div class="flex-grow">
        <input class="w-full px-2 focus:outline-none" type="text" />
      </div>
      `;
    }

    onInput() {
      console.log('onInput, formula');
    }
}
