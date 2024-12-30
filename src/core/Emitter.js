export class Emitter {
  constructor() {
    this.listeners = {};
    this.key = 0;
  }

  subscribe(eventName, cb) {
    if (!Object.hasOwn(this.listeners, eventName)) {
      this.listeners[eventName] = {};
    }

    const listenerId = this.key;
    this.listeners[eventName][listenerId] = cb;
    this.key++;

    return () => {
      delete this.listeners[eventName][listenerId];
    };
  }

  emit(eventName, ...args) {
    if (!Object.hasOwn(this.listeners, eventName)) {
      return false;
    }

    const listeners = { ...this.listeners[eventName] };

    Object.values(listeners).forEach((cb) => {
      cb.apply(null, args);
    });

    return true;
  }
}
