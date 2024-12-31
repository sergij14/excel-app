import { AppComponent } from "./AppComponent";

export class AppStateComponent extends AppComponent {
  constructor(...args) {
    super(...args);
  }

  get template() {
    return "";
  }

  initState(initialState = {}) {
    this.state = { ...initialState };
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.$el.html(this.template);
  }
}
