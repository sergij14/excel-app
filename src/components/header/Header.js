import {$} from '../../core/dom';
import {debounce} from '../../core/utils';
import {actions} from '../../store/actions';

const {ExcelComponent} = require('../../core/ExcelComponent');

export class Header extends ExcelComponent {
    static className = 'excel-header'

    constructor($root, config) {
      super($root, {
        name: 'Header',
        listeners: ['input'],
        ...config,
      });
    }

    prepare() {
      this.onInput = debounce(this.onInput, 200);
    }

    toHTML() {
      const {title} = this.store.getState();
      return `
        <input
          type="text"
          value="${title}"
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

    onInput(evt) {
      this.$dispatch(actions.changeTitle($.text(evt.target)));
    }
}
