import { clone } from "./utils";

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
    const nextState = Object.assign(currState, clone(value));

    this.emitter.emit("Store:SetState", nextState);
    this.state = nextState;
    return nextState;
  }
}
