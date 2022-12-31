import {debounce, doWithDelay, storage} from '../../core/utils';

export class StateProcessor {
  constructor(client, delay = 300) {
    this.client = client;
    this.listen = debounce(this.listen.bind(this), delay);
  }

  listen(state) {
    this.client.save(state);
  }

  get() {
    return this.client.get();
  }
}

export class LocalStorageClient {
  constructor(name) {
    this.name = name;
  }

  save(state) {
    storage(this.name, state);
    return Promise.resolve();
  }

  get() {
    // return Promise.resolve(storage(this.name));
    return new Promise((resolve) => {
      doWithDelay(() => resolve(storage(this.name)), 1200);
    });
  }
}
