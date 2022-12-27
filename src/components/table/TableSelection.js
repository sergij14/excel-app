export class TableSelection {
    static className = 'selected-cell'

    constructor() {
      this.group = [];
    }

    select($el) {
      this.clear();
      this.group = [];
      this.group.push($el);
      $el.classList.add(TableSelection.className);
    }

    clear() {
      this.group.forEach((el) => el.classList.remove(TableSelection.className));
    }

    selectGroup() {}
}
