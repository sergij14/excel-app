import { Router } from "./core/Router/Router";
import { DashboardPage } from "./pages/DashboardPage";
import { ExcelPage } from "./pages/ExcelPage";
import "./styles/index.css";

new Router("#app", {
  dashboard: DashboardPage,
  excel: ExcelPage,
});
