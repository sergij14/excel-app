import { $ } from "../../core/DOM/dom";

const activeRoute = {
  getPath() {
    return window.location.hash.slice(1);
  },

  getParam() {
    return this.getPath().split("/");
  },

  navigate(path) {
    window.location.hash = path;
  },
};

export class Router {
  constructor(selector, routes) {
    if (!selector) {
      throw new Error("Router: selector is required");
    }

    this.$placeholder = $(selector);
    this.routes = routes;

    this.pageChangeHandler = this.pageChangeHandler.bind(this);

    this.init();
  }

  init() {
    window.addEventListener("hashchange", this.pageChangeHandler);
    this.pageChangeHandler();
  }

  pageChangeHandler() {
    const Page = this.routes.excel;
    const page = new Page();

    this.$placeholder.append(page.getContainer());

    page.afterRender();
  }

  destroy() {
    window.removeEventListener("hashchange", this.pageChangeHandler);
  }
}
