export class TableSelection {
  static cellCn = "selected-cell";
  static collCn = "selected-col";

  constructor() {
    this.group = [];
    this.current = null;
  }

  clear() {
    this.group.forEach(({ $cell, $col }) => {
      $cell.removeClass(TableSelection.cellCn);
      $col.removeClass(TableSelection.collCn);
    });
    this.group = [];
  }

  scrollAndFocus($cell) {
    $cell.scrollTo();
    $cell.focus();
  }

  select(selection, shouldClear = true) {
    if (shouldClear) this.clear();
    this.current = selection;
    this.group.push(selection);
    this.scrollAndFocus(selection.$cell);
    selection.$cell.addClass(TableSelection.cellCn);
    selection.$col.addClass(TableSelection.collCn);
  }

  selectGroup(selection) {
    this.select(selection, false);
    this.group.forEach(({ $cell, $col }) => {
      $cell.addClass(TableSelection.cellCn);
      $col.addClass(TableSelection.collCn);
    });
  }

  applyStyle(style) {
    this.group.forEach(($el) => $el.css(style));
  }
}
