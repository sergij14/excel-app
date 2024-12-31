export class Page {
  constructor(params) {
    this.params = params;
  }

  getContainer() {
    throw new Error("Router: getContainer() should be implemented");
  }

  afterRender() {}

  destroy() {}
}
