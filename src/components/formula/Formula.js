
const {ExcelComponent} = require('../../core/ExcelComponent');

export class Formula extends ExcelComponent {
    static className = 'excel-formula'

    constructor($root, config) {
      super($root, {
        name: 'Formula',
        listeners: ['input'],
        ...config,
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

    onInput(evt) {
      const {value} = evt.target;
      this.emitter.emit('input', value);
    }
}
