import { clone, isEqual } from "./utils";

export class Store {
  constructor(initialState = {}, config = {}) {
    this.state = initialState;
    this.emitter = config.emitter || null;
  }

  getState() {
    return clone(this.state);
  }

  setState(value) {
    const currState = clone(this.state);
    const nextState = Object.assign(clone(currState), clone(value));

    this.emitter.emit(
      "Store:StateUpdate",
      (comparator) => !isEqual(comparator(currState), comparator(nextState)),
      nextState
    );
    this.state = nextState;
    return nextState;
  }
}
