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
      $el.classList.add(TableSelection.className);

      $el.focus();
      this.current = $el;
    }

    clear() {
      this.group.forEach((el) => el.classList.remove(TableSelection.className));
      this.current = null;
    }

    selectGroup($el) {
      this.group.push($el);
      $el.classList.add(TableSelection.className);
    }
}
