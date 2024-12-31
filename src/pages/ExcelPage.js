import { Excel } from "../components/Excel";
import { Page } from "../core/Router/Page";
import { Store } from "../core/Store/Store";
import { debounce, storage } from "../core/utils";
import { Header } from "../components/Header/Header";
import { Formula } from "../components/Formula/Formula";
import { Toolbar } from "../components/Toolbar/Toolbar";
import { Table } from "../components/Table/Table";

function getStorageName(id) {
  return `excel:${id}`;
}

export class ExcelPage extends Page {
  storeListener(data) {
    storage(this.storageName, data);
    console.log(`State Update:`, data);
  }

  getContainer() {
    const timestamp = parseInt(this.params.list[0]) || new Date().getTime();
    const dateObj = new Date(timestamp);
    const date = `${dateObj.toLocaleDateString()}, ${dateObj.toLocaleTimeString()}`;

    this.storageName = getStorageName(timestamp);
    const initialState = {
      toolbar: {},
      colState: {},
      rowState: {},
      dataState: {},
      dataStyles: {},
      currentText: "",
      tableTitle: this.storageName,
      date,
    };

    this.store = new Store(storage(this.storageName) || initialState);

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
