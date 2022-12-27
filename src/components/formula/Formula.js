import {FIRST_CELL_WIDTH} from '../table/constants';

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
      <div class="w-[${FIRST_CELL_WIDTH}px] bg-gray-100 border-r centered-cell">fx</div>
      <div class="flex-grow">
        <input class="w-full focus:outline-none" type="text" />
      </div>
      `;
    }

    onInput() {
      console.log('onInput, formula');
    }
}
