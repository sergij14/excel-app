export class Emitter {
  constructor() {
    this.listeners = {};
    this.key = 0;
  }

  subscribe(eventName, cb, metadata) {
    if (!Object.hasOwn(this.listeners, eventName)) {
      this.listeners[eventName] = {};
    }

    const listenerId = this.key;
    this.listeners[eventName][listenerId] = { cb, metadata };
    this.key++;

    return () => {
      delete this.listeners[eventName][listenerId];
    };
  }

  emit(event, ...args) {
    let eventName, comparator;

    if (typeof event === "object") {
      eventName = event.eventName;
      comparator = event.comparator;
    } else {
      eventName = event;
    }

    if (!Object.hasOwn(this.listeners, eventName)) {
      return false;
    }

    const listeners = { ...this.listeners[eventName] };

    Object.values(listeners).forEach(({ cb, metadata }) => {
      if (metadata && !comparator?.(metadata)) {
        return;
      }

      cb.apply(null, args);
    });

    return true;
  }
}
