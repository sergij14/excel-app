export class TableSelection {
  static cellCn = "selected-cell";
  static rowColCn = "selected-row-col";

  constructor() {
    this.group = [];
    this.current = null;
  }

  toggleCn(selection, type) {
    const method = `${type}Class`;

    Object.keys(selection).forEach((key) => {
      selection[key][method](
        key === "$cell" ? TableSelection.cellCn : TableSelection.rowColCn
      );
    });
  }

  clear() {
    this.group.forEach((selection) => this.toggleCn(selection, "remove"));
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
    this.toggleCn(selection, "add");
  }

  selectGroup(selection) {
    this.select(selection, false);
    this.group.forEach((selection) => this.toggleCn(selection, "add"));
  }

  applyStyle(style) {
    this.group.forEach(({ $cell }) => $cell.css(style));
  }
}
