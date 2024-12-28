export class Emitter {
  constructor() {
    this.listeners = {};
    this.key = 0;
  }

  subscribe(eventName, cb, condition) {
    if (!Object.hasOwn(this.listeners, eventName)) {
      this.listeners[eventName] = {};
    }

    const listenerId = this.key;
    this.listeners[eventName][listenerId] = { cb, condition };
    this.key++;

    return () => {
      delete this.listeners[eventName][listenerId];
    };
  }

  emit(eventName, comparator = undefined, ...args) {
    if (!Object.hasOwn(this.listeners, eventName)) {
      return false;
    }

    const listeners = { ...this.listeners[eventName] };

    Object.values(listeners).forEach(({ cb, condition }) => {
      if (comparator !== undefined && condition !== undefined) {
        if (comparator(condition)) cb.apply(null, args);

        return;
      }

      cb.apply(null, args);
    });

    return true;
  }
}
