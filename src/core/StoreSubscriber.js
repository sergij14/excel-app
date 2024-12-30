import { isEqual } from "./utils";

export class StoreSubscriber {
  constructor(store) {
    this.store = store;
    this.prevState = {};
  }

  subscribeComponents(components) {
    this.prevState = this.store.getStore();
    this.unsub = this.store.subscribe((state) => {
      Object.keys(state).forEach((key) => {
        if (!isEqual(this.prevState[key], state[key])) {
          components.forEach((component) => {
            if (component.storeSubscribedFields.includes(key)) {
              const changes = { [key]: state[key] };
              component.storeChanged(changes);
            }
          });
        }
      });

      this.prevState = this.store.getStore();
    });
  }

  unsubscribe() {
    this.unsub();
  }
}
