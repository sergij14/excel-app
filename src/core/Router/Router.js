import { $ } from "../../core/DOM/dom";

export const activeRoute = {
  getPath() {
    return window.location.hash.slice(1);
  },

  getParams() {
    const [path, ...list] = this.getPath().split("/");
    return { path, list };
  },

  navigate(path) {
    window.location.hash = path;
  },
};

function createLoader() {
  return {
    $loader: $.create("div", "loader").html(
      '<i class="fa-solid fa-spinner"></i>Loading...'
    ),
    $error: $.create("div", "error").html(
      "<i class='fa-solid fa-circle-exclamation'></i>Couldn't render the page"
    ),
  };
}

export class Router {
  constructor(selector, routes) {
    if (!selector) {
      throw new Error("Router: selector is required");
    }

    this.$placeholder = $(selector);
    const { $loader, $error } = createLoader();
    this.$loader = $loader;
    this.$error = $error;

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
    const pagePath = activeRoute.getParams().path
      ? activeRoute.getParams().path
      : "/";

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

  async pageChangeHandler() {
    if (this.page) {
      this.page.destroy();
    }

    this.$placeholder.clear().append(this.$loader);
    const Page = this.getPage();
    if (!Page) {
      return activeRoute.navigate("/");
    }

    try {
      this.page = new Page(activeRoute.getParams());
      const $container = await this.page.getContainer();

      this.$placeholder.clear().append($container);
      this.page.afterRender();
    } catch (err) {
      this.page = null;
      this.$placeholder.clear().append(this.$error);
      console.error("Router: couldn't get $container for the page", err);

      setTimeout(() => {
        activeRoute.navigate("/");
      }, 1000);
    }
  }

  destroy() {
    window.removeEventListener("hashchange", this.pageChangeHandler);
  }
}
