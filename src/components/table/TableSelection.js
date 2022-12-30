import {$} from '../../core/dom';

export class TableSelection {
    static className = 'selected-cell'

    constructor() {
      this.current = null;
      this.$hightlitedCells = [];
    }

    select($el, $hightlitedCells) {
      this.clear();
      $.classList($el).add(TableSelection.className);
      $hightlitedCells.forEach(($el) => $.classList($el).add('highlighted-cell'));

      $el.focus();
      this.current = $el;
      this.$hightlitedCells = $hightlitedCells;
    }

    clear() {
      if (this.current) {
        $.classList(this.current).remove(TableSelection.className);
        this.$hightlitedCells.forEach(($el) => $.classList($el).remove('highlighted-cell'));

        this.current = null;
        this.$hightlitedCells = [];
      }
    }
}
