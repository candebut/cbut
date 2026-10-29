import { describe, expect, it, vi } from "vitest";
import {
  FAVORITES_STORAGE_KEY,
  getFavoriteIdsSnapshot,
  getServerFavoriteIdsSnapshot,
  readFavoriteIds,
  subscribeToFavorites,
  toggleFavoriteId,
  writeFavoriteIds,
} from "@/lib/favorites";
import { beforeEach } from "vitest";

beforeEach(() => {
  window.localStorage.clear();
});

describe("readFavoriteIds", () => {
  it("reads unique positive integer IDs from storage", () => {
    const storage = {
      getItem: () => '[1, 2, 2, 0, -4, "3", 1.5]',
    };

    expect(readFavoriteIds(storage)).toEqual([1, 2]);
  });

  it("returns an empty list for missing or invalid data", () => {
    expect(readFavoriteIds({ getItem: () => null })).toEqual([]);
    expect(readFavoriteIds({ getItem: () => "not-json" })).toEqual([]);
    expect(readFavoriteIds({ getItem: () => '{"id":1}' })).toEqual([]);
  });

  it("reads the favorites storage key", () => {
    const getItem = vi.fn(() => "[]");

    readFavoriteIds({ getItem });

    expect(getItem).toHaveBeenCalledWith(FAVORITES_STORAGE_KEY);
  });
});

describe("writeFavoriteIds", () => {
  it("stores a unique list of IDs under the favorites key", () => {
    const setItem = vi.fn();

    writeFavoriteIds([3, 5, 3], { setItem });

    expect(setItem).toHaveBeenCalledWith(FAVORITES_STORAGE_KEY, "[3,5]");
  });
});

describe("favorite store subscriptions", () => {
  it("notifies subscribers on same-tab writes and matching storage events", () => {
    const listener = vi.fn();
    const unsubscribe = subscribeToFavorites(listener);

    writeFavoriteIds([8], { setItem: vi.fn() });
    expect(listener).toHaveBeenCalledTimes(1);

    window.dispatchEvent(new StorageEvent("storage", { key: FAVORITES_STORAGE_KEY }));
    expect(listener).toHaveBeenCalledTimes(2);

    window.dispatchEvent(new StorageEvent("storage", { key: "other-key" }));
    expect(listener).toHaveBeenCalledTimes(2);

    unsubscribe();
    writeFavoriteIds([9], { setItem: vi.fn() });
    expect(listener).toHaveBeenCalledTimes(2);
  });
});

describe("favorite snapshots", () => {
  it("reads the browser snapshot", () => {
    window.localStorage.setItem(FAVORITES_STORAGE_KEY, "[2]");

    expect(getFavoriteIdsSnapshot()).toBe("[2]");
  });

  it("returns a stable empty snapshot for the server", () => {
    expect(getServerFavoriteIdsSnapshot()).toBeNull();
  });
});

describe("toggleFavoriteId", () => {
  it("adds a product that is not already a favorite", () => {
    expect(toggleFavoriteId([1], 2)).toEqual([1, 2]);
  });

  it("removes a product that is already a favorite", () => {
    expect(toggleFavoriteId([1, 2], 2)).toEqual([1]);
  });
});