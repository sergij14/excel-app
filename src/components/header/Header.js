import {$} from '../../core/dom';
import {ExcelComponent} from '../../core/ExcelComponent';
import {debounce} from '../../core/utils';
import {actions} from '../../store/actions';

export class Header extends ExcelComponent {
    static className = 'excel-header'

    constructor($root, config) {
      super($root, {
        name: 'Header',
        listeners: ['input', 'click'],
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
            data-type="reload-btn"
            >
            <i class="fa-solid fa-rotate-right"></i>
          </button>
        </div>
      `;
    }

    onInput(evt) {
      this.$dispatch(actions.changeTitle($.text(evt.target)));
    }

    onClick(evt) {
      const $reloadButton = $.getNodeByDataType(evt.target, 'reload-btn');

      if ($reloadButton) {
        window.location.reload();
      }
    }
}
