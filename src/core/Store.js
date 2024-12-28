import { clone, get, isEqual } from "./utils";

export class Store {
  constructor(initialState = {}, config = {}) {
    this.state = initialState;
    this.emitter = config.emitter || null;
  }

  getState() {
    return clone(this.state);
  }

  getEmitEvent(currState, nextState) {
    return {
      eventName: "Store:StateUpdate",
      comparator: ({ path }) =>
        !isEqual(get(currState, path), get(nextState, path)),
    };
  }

  setState(value) {
    const currState = clone(this.state);
    const nextState = clone(
      typeof value === "function" ? value(currState) : value
    );

    this.emitter.emit(this.getEmitEvent(currState, nextState), nextState);
    this.state = nextState;
    return nextState;
  }
}
