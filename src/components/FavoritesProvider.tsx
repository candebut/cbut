"use client";

import {
  createContext,
  useContext,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import {
  getFavoriteIdsSnapshot,
  getServerFavoriteIdsSnapshot,
  readFavoriteIds,
  subscribeToFavorites,
  toggleFavoriteId,
  writeFavoriteIds,
} from "@/lib/favorites";
import type { FavoriteId } from "@/lib/types";

export interface FavoritesContextValue {
  favoriteIds: FavoriteId[];
  isReady: boolean;
  toggleFavorite: (productId: FavoriteId) => void;
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const storedValue = useSyncExternalStore(
    subscribeToFavorites,
    getFavoriteIdsSnapshot,
    getServerFavoriteIdsSnapshot,
  );
  const favoriteIds = readFavoriteIds({ getItem: () => storedValue });
  const isReady = storedValue !== null;

  function toggleFavorite(productId: FavoriteId) {
    if (!isReady) return;

    try {
      const currentIds = readFavoriteIds(window.localStorage);
      const nextIds = toggleFavoriteId(currentIds, productId);
      writeFavoriteIds(nextIds, window.localStorage);
    } catch {
      return;
    }
  }

  return (
    <FavoritesContext.Provider value={{ favoriteIds, isReady, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites(): FavoritesContextValue {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }

  return context;
}