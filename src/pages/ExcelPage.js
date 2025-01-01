import { Excel } from "../components/Excel";
import { Page } from "../core/Router/Page";
import { Store } from "../core/Store/Store";
import { Header } from "../components/Header/Header";
import { Formula } from "../components/Formula/Formula";
import { Toolbar } from "../components/Toolbar/Toolbar";
import { Table } from "../components/Table/Table";
import { StateProcessor } from "../core/Storage/StateProcessor";
import { LocalStorageClient } from "../core/Storage/LocalStorageClient";

export class ExcelPage extends Page {
  constructor(...args) {
    super(...args);

    const timestamp = parseInt(this.params.list[0]) || new Date().getTime();

    this.dateObj = new Date(timestamp);
    this.processor = new StateProcessor(new LocalStorageClient(timestamp));
  }

  async getContainer() {
    const date = `${this.dateObj.toLocaleDateString()}, ${this.dateObj.toLocaleTimeString()}`;

    const initialState = {
      toolbar: {},
      colState: {},
      rowState: {},
      dataState: {},
      dataStyles: {},
      currentText: "",
      tableTitle: "Table Name",
      date,
    };

    const state = await this.processor.get();

    this.store = new Store(state || initialState);
    this.storeUnsub = this.store.subscribe(this.processor.listen);
    this.excel = new Excel({
      components: [Header, Toolbar, Formula, Table],
      store: this.store,
    });
    console.log(this.excel);

    return this.excel.getContainer();
  }

  afterRender() {
    this.excel.init();
  }

  destroy() {
    this.excel.destroy();
    this.storeUnsub();
  }
}
