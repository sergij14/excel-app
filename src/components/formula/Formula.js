import {$} from '../../core/dom';
import {ExcelComponent} from '../../core/ExcelComponent';

export class Formula extends ExcelComponent {
    static className = 'excel-formula'

    constructor($root, config) {
      super($root, {
        name: 'Formula',
        listeners: ['input', 'keydown'],
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

    init() {
      super.init();

      this.$formula = $.find(this.$root, 'input');

      this.$on('table:select', ($cell) => {
        this.$formula.value = $.attr($cell, {name: 'data-value'}) || $.text($cell);
      });

      this.$subscribe((state) => {
        this.$formula.value = state.currentValue;
      });
    }

    onInput(evt) {
      const {value} = evt.target;
      this.$emit('formula:input', value);
    }

    onKeydown(evt) {
      const keys = ['Enter', 'Tab'];
      if (keys.includes(evt.key)) {
        evt.preventDefault();

        this.$emit('formula:done');
      }
    }
}
