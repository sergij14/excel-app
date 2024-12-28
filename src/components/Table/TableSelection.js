import { $ } from "../../core/dom";

export class TableSelection {
  static className = "selected-cell";

  constructor() {
    this.group = [];
  }

  clear() {
    this.group.forEach(($el) => $el.removeClass("selected-cell"));
    this.group = [];
  }

  select(ev) {
    if (ev.ctrlKey) {
      return this.selectGroup($(ev.target));
    }

    this.selectOne($(ev.target));
  }

  selectOne($cell) {
    this.clear();
    this.group.push($cell);
    $cell.addClass("selected-cell");

    $cell.focus();
  }

  selectGroup($cell) {
    this.group.push($cell);
    this.group.forEach(($el) => $el.addClass("selected-cell"));
  }
}
