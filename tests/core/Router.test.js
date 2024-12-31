import { beforeEach, describe, expect, it } from "vitest";
import { Router } from "../../src/core/Router/Router";
import { Page } from "../../src/core/Router/Page";

class DashboardPage extends Page {
  getContainer() {
    const $container = document.createElement("div");
    $container.textContent = "DashboardPage";

    return $container;
  }
}

class ExcelPage extends Page {
  getContainer() {
    const $container = document.createElement("div");
    $container.textContent = "ExcelPage";

    return $container;
  }
}

describe("Router", () => {
  let router;
  let $app;

  beforeEach(() => {
    $app = document.createElement("div");
    router = new Router($app, [
      { path: ["/", "dashboard"], element: DashboardPage },
      {
        path: "excel",
        element: ExcelPage,
      },
    ]);
  });

  it("creates router object", () => {
    expect(router).toBeDefined();
    expect(router.pageChangeHandler).toBeDefined();
  });

  it("renders default home page", () => {
    expect($app.innerHTML).toBe("<div>DashboardPage</div>");
  });

  it("switches to excel page on hashchange", () => {
    window.location.hash = "#excel/";
    router.pageChangeHandler();
    expect($app.innerHTML).toBe("<div>ExcelPage</div>");
  });

  it("renders dashboard page", () => {
    window.location.hash = "#/dashboard";
    router.pageChangeHandler();
    expect($app.innerHTML).toBe("<div>DashboardPage</div>");
  });

  it("renders default home page when path doesn't exist", () => {
    window.location.hash = "#excel/";
    router.pageChangeHandler();
    expect($app.innerHTML).toBe("<div>ExcelPage</div>");

    window.location.hash = "#/testpath";
    router.pageChangeHandler();
    expect($app.innerHTML).toBe("<div>DashboardPage</div>");
  });
});
