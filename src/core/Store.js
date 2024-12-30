import { clone, get, isEqual } from "./utils";

export class Store {
  constructor(initialState = {}, config = {}) {
    this.state = initialState;
    this.emitter = config.emitter || null;
  }

  getStore() {
    return clone(this.state);
  }

  getEmitEvent(currState, nextState) {
    return {
      eventName: "Store:StateUpdate",
      comparator: ({ path }) => {
        const curr = get(currState, path);
        const next = get(nextState, path);

        if (curr === undefined || next === undefined) {
          console.warn(`Store: Coudn't get state with the path ${path}`);
        }

        return !isEqual(curr, next);
      },
    };
  }

  setStore(value) {
    const currState = clone(this.state);
    const nextState = clone(
      typeof value === "function" ? value(currState) : value
    );

    if (this.emitter) {
      this.emitter.emit(this.getEmitEvent(currState, nextState), nextState);
    }
    this.state = nextState;
    return nextState;
  }
}
