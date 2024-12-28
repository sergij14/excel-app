import { $ } from "../../core/dom";

export class TableSelection {
  static cn = "selected-cell";

  constructor() {
    this.group = [];
    this.current = null;
  }

  clear() {
    this.group.forEach(($el) => $el.removeClass(TableSelection.cn));
    this.group = [];
  }

  select(ev) {
    if (ev.ctrlKey) {
      return this.selectGroup($(ev.target));
    }

    this.selectOne($(ev.target));
  }

  scrollAndFocus($cell) {
    $cell.scrollTo();
    $cell.focus();
  }

  selectOne($cell) {
    this.clear();
    this.group.push($cell);
    this.current = $cell;
    $cell.addClass(TableSelection.cn);
    this.scrollAndFocus($cell);
  }

  selectGroup($cell) {
    this.current = $cell;
    this.group.push($cell);
    this.group.forEach(($el) => $el.addClass(TableSelection.cn));
    this.scrollAndFocus($cell);
  }
}
