import { $ } from "../../core/DOM/dom";

const activeRoute = {
  getPath() {
    return window.location.hash.slice(1);
  },

  getParams() {
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
    this.page = null;

    this.pageChangeHandler = this.pageChangeHandler.bind(this);

    this.init();
  }

  init() {
    window.addEventListener("hashchange", this.pageChangeHandler);
    this.pageChangeHandler();
  }

  getPage() {
    const pagePath = activeRoute.getParams()[0] ? activeRoute.getParams()[0] : "/";

    const pageItem = this.routes.find(({ path }) => {
      if (Array.isArray(path)) {
        return path.includes(pagePath);
      } else {
        return path === pagePath;
      }
    });

    if (!pageItem) {
      console.warn(`Router: no page was found for ${pagePath}`);
      return null;
    }

    return pageItem.element;
  }

  pageChangeHandler() {
    if (this.page) {
      this.page.destroy();
    }

    const Page = this.getPage();
    this.page = new Page();

    this.$placeholder.clear().append(this.page.getContainer());

    this.page.afterRender();
  }

  destroy() {
    window.removeEventListener("hashchange", this.pageChangeHandler);
  }
}
