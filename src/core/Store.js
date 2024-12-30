import { clone } from "./utils";

export class Store {
  constructor(initialState = {}) {
    this.state = initialState;
    this.listeners = [];
  }

  getStore() {
    return clone(this.state);
  }

  subscribe(fn) {
    this.listeners.push(fn);
    return () => {
      this.listeners = this.listeners.filter((listener) => listener !== fn);
    };
  }

  setStore(value) {
    const currState = clone(this.state);
    const nextState = clone(
      typeof value === "function" ? value(currState) : value
    );

    this.state = nextState;
    this.listeners.forEach((listener) => listener(this.state));
    return nextState;
  }
}
