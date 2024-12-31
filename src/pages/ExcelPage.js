import { Excel } from "../components/Excel";
import { Page } from "../core/Router/Page";
import { Store } from "../core/Store/Store";
import { debounce, storage } from "../core/utils";
import { Header } from "../components/Header/Header";
import { Formula } from "../components/Formula/Formula";
import { Toolbar } from "../components/Toolbar/Toolbar";
import { Table } from "../components/Table/Table";

const initialState = {
  toolbar: {},
  colState: {},
  rowState: {},
  dataState: {},
  dataStyles: {},
  currentText: "",
  tableTitle: "New Table",
};

export class ExcelPage extends Page {
  constructor() {
    super();
  }

  storeListener(data) {
    storage("excel-state", data);
    console.log(`State Update:`, data);
  }

  getContainer() {
    this.store = new Store(storage("excel-state") || initialState);

    this.storeListener = debounce(this.storeListener, 300).bind(this);
    this.store.subscribe(this.storeListener);

    this.excel = new Excel({
      components: [Header, Toolbar, Formula, Table],
      store: this.store,
    });

    return this.excel.getContainer();
  }

  afterRender() {
    this.excel.init();
  }

  destroy() {
    this.excel.destroy();
  }
}
