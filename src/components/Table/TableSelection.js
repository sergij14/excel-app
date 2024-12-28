export class TableSelection {
  static className = "selected-cell";

  constructor() {
    this.group = [];
  }

  select($cell) {
    this.clear();
    this.group.push($cell);
    $cell.addClass("selected-cell");
  }

  clear() {
    this.group.forEach(($el) => $el.removeClass("selected-cell"));
    this.group = [];
  }

  selectGroup($cell) {
    
  }
}
