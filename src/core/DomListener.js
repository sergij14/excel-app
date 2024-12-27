export class DomListener {
  constructor($el) {
    if (!$el) {
      throw new Error("No $el is provided for DomListener");
    }
    this.$el = $el;
  }
}
