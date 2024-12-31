import { Page } from "../core/Router/Page";
import { $ } from "../core/DOM/dom";

export class DashboardPage extends Page {
  constructor() {
    super();
  }

  getContainer() {
    const $container = $.create("div");
    $container.text("dashboard");

    return $container;
  }
}
