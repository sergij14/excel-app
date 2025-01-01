export class LocalStorageClient {
  constructor(name) {
    this.name = this.storageName(name);
  }

  save(state) {
    this.storage(this.name, state);
    return Promise.resolve();
  }

  get() {
    return new Promise((resolve) => {
      const state = this.storage(this.name);

      setTimeout(() => {
        resolve(state);
      }, 1500);
    });
  }

  storage(key, data = null) {
    if (!data) {
      return JSON.parse(localStorage.getItem(key));
    }
    localStorage.setItem(key, JSON.stringify(data));
  }

  storageName(id) {
    return `excel:${id}`;
  }
}
