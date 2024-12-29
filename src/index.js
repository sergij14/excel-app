import "./styles/index.css";

import { Excel } from "./components/Excel";
import { Formula } from "./components/Formula/Formula";
import { Header } from "./components/Header/Header";
import { Table } from "./components/Table/Table";
import { Toolbar } from "./components/Toolbar/Toolbar";

const initialState = {
  toolbar: {},
  colState: {},
  rowState: {},
  dataState: {},
  currentText: "",
};

const app = new Excel("#app", {
  components: [Header, Toolbar, Formula, Table],
  initialState,
});

app.render();
