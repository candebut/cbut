import type { FavoriteId } from "@/lib/types";

export const FAVORITES_STORAGE_KEY = "punto:favorites";

const listeners = new Set<() => void>();

export function readFavoriteIds(storage: Pick<Storage, "getItem">): FavoriteId[] {
  try {
    const storedValue = storage.getItem(FAVORITES_STORAGE_KEY);
    if (!storedValue) return [];

    const parsed: unknown = JSON.parse(storedValue);
    if (!Array.isArray(parsed)) return [];

    return [...new Set(parsed.filter(
      (id): id is FavoriteId =>
        typeof id === "number" && Number.isSafeInteger(id) && id > 0,
    ))];
  } catch {
    return [];
  }
}

export function writeFavoriteIds(
  favoriteIds: readonly FavoriteId[],
  storage: Pick<Storage, "setItem">,
): void {
  storage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify([...new Set(favoriteIds)]));
  listeners.forEach((listener) => listener());
}

export function toggleFavoriteId(
  favoriteIds: readonly FavoriteId[],
  productId: FavoriteId,
): FavoriteId[] {
  return favoriteIds.includes(productId)
    ? favoriteIds.filter((favoriteId) => favoriteId !== productId)
    : [...favoriteIds, productId];
}

export function subscribeToFavorites(listener: () => void): () => void {
  listeners.add(listener);

  function handleStorageChange(event: StorageEvent) {
    if (event.key === FAVORITES_STORAGE_KEY || event.key === null) {
      listener();
    }
  }

  window.addEventListener("storage", handleStorageChange);

  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", handleStorageChange);
  };
}

export function getFavoriteIdsSnapshot(): string | null {
  try {
    return window.localStorage.getItem(FAVORITES_STORAGE_KEY) ?? "[]";
  } catch {
    return null;
  }
}

export function getServerFavoriteIdsSnapshot(): null {
  return null;
}