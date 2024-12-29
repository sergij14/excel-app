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

  scrollAndFocus($cell) {
    $cell.scrollTo();
    $cell.focus();
  }

  select($cell) {
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

  applyStyle(style) {
    this.group.forEach(($el) => $el.css(style));
  }
}
