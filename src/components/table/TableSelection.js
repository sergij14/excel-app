import {$} from '../../core/dom';

export class TableSelection {
    static className = 'selected-cell'

    constructor() {
      this.group = [];
      this.current = null;
    }

    select($el) {
      this.clear();
      this.group = [];
      this.group.push($el);
      $.classList($el).add(TableSelection.className);

      $el.focus();
      this.current = $el;
    }

    clear() {
      this.group.forEach((el) => $.classList(el).remove(TableSelection.className));
      this.current = null;
    }
}
