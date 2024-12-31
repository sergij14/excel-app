import { Page } from "../core/Router/Page";
import { $ } from "../core/DOM/dom";

function createRecord(record) {
  return `
        <li class="dashboard-list-item">
          <a href="#">Table 2</a>
          <span>12.06.2020</span>
        </li>
  `;
}

function createRecordsTable() {
  const keys = getAllKeys();

  if(!keys.length) return `<p class="dashboard-list">There are no tables created</p>`
  return `
    <div class="dashboard-list">
      <div class="dashboard-list-header">
        <span>Table Name</span>
        <span>Creation Date</span>
      </div>
      <ul>
        ${keys.map(createRecord).join("")}
      </ul>
    </div>
  `;
}

function getAllKeys() {
  const keys = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key.includes("excel")) {
      continue;
    }
    keys.push(key);
  }

  return keys;
}

export class DashboardPage extends Page {
  getContainer() {
    const now = new Date().getTime();
    const $container = $.create("div", "dashboard").html(`
        <h1 class="dashboard-title">Excel App</h1>
        <div class="dashboard-header">
          <div class="dashboard-header-content">
            <a href="#excel/${now}" class="dashboard-header-item">New Table</a>
          </div>
        </div>
        ${createRecordsTable()}
      `);

    return $container;
  }
}
