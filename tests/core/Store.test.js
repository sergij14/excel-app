import { beforeEach, describe, expect, it, vi } from "vitest";
import { Store } from "../../src/core/Store";

const initialState = {
  tableTitle: "New Table",
};

describe("Store", () => {
  let store;
  let handler;

  beforeEach(() => {
    handler = vi.fn();
    store = new Store(initialState);
  });

  it("creates store object", () => {
    expect(store).toBeDefined();
    expect(store.getStore).toBeDefined();
    expect(store.setStore).toBeDefined();
    expect(store.subscribe).toBeDefined();
  });

  it("should return object", () => {
    expect(store.getStore()).toBeInstanceOf(Object);
  });

  it("should return default state", () => {
    expect(store.getStore()).toEqual(initialState);
  });

  it("should change state on setStore", () => {
    store.setStore((prev) => ({ ...prev, tableTitle: "test" }));
    expect(store.getStore().tableTitle).toBe("test");
  });

  it("should call subscriber function", () => {
    store.subscribe(handler);
    store.setStore((prev) => ({ ...prev, tableTitle: "test" }));
    expect(handler).toHaveBeenCalled();
  });

  it("should unsubscribe on ", () => {
    const unsub = store.subscribe(handler);
    unsub();
    store.setStore((prev) => ({ ...prev, tableTitle: "test" }));
    expect(handler).not.toHaveBeenCalled();
  });
});
