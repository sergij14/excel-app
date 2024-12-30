import { beforeEach, describe, expect, it, vi } from "vitest";
import { Store } from "../../src/core/Store";

const initialState = {
  tableTitle: "New Table",
};

describe("Store", () => {
  let store;
  let emitter;

  beforeEach(() => {
    emitter = vi.fn();
    store = new Store(initialState, { emitter: { emit: emitter } });
  });

  it("creates store object", () => {
    expect(store).toBeDefined();
    expect(store.emitter).toBeDefined();
    expect(store.state).toBeDefined();
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

  it("should call emitter function", () => {
    store.setStore((prev) => ({ ...prev, tableTitle: "test" }));
    expect(emitter).toHaveBeenCalled();
  });
});
