import { $ } from "../../core/dom";

export class TableSelection {
  static className = "selected-cell";

  constructor() {
    this.group = [];
  }

  select($cell) {
    this.group.push($cell);
    $cell.addClass("selected-cell");
  }

  selectGroup() {}
}
