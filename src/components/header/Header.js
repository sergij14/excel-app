import {$} from '../../core/dom';
import {ExcelComponent} from '../../core/ExcelComponent';
import {debounce, doAsyncTask} from '../../core/utils';
import {actions} from '../../store/actions';

export class Header extends ExcelComponent {
  static className = 'excel-header';

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
            class="toolbar-btn"
            data-type="reload-btn"
            >
            <i class="fa-solid fa-rotate-right"></i>
          </button>
          <button
            class="toolbar-btn"
            data-type="clear-btn"
          >
            <i class="fa-sharp fa-solid fa-trash"></i>
          </button>
          <button
            class="toolbar-btn"
            data-type="csv-btn"
          >
            <i class="fa-solid fa-download"></i>
          </button>
        </div>
      `;
  }

  onInput(evt) {
    this.$dispatch(actions.changeTitle($.text(evt.target)));
  }

  async clearTable() {
    await doAsyncTask(() => this.$dispatch(actions.clearTable()));
    window.location.reload();
  }

  onClick(evt) {
    const $clearButton = $.getNodeByDataType(evt.target, 'clear-btn');
    const $reloadButton = $.getNodeByDataType(evt.target, 'reload-btn');
    const $csvButton = $.getNodeByDataType(evt.target, 'csv-btn');

    if ($clearButton) {
      this.clearTable();
      $.classList($clearButton).add('clicked-clear-btn');
    }

    if ($reloadButton) {
      window.location.reload();
    }

    if ($csvButton) {
      this.$emit('header:toCSV');
    }
  }
}
