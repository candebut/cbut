"use client";

import { useFavorites } from "@/components/FavoritesProvider";
import type { FavoriteId } from "@/lib/types";

type FavoriteButtonProps = {
  productId: FavoriteId;
};

export default function FavoriteButton({ productId }: FavoriteButtonProps) {
  const { favoriteIds, isReady, toggleFavorite } = useFavorites();
  const isFavorite = favoriteIds.includes(productId);
  const label = isFavorite ? "Quitar de favoritos" : "Añadir a favoritos";

  return (
    <button
      type="button"
      className="absolute right-2 top-2 grid size-10 place-items-center border border-[#dce2da] bg-white/95 text-xl text-[#173b2e] transition-colors hover:bg-[#d6f36a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#173b2e] motion-reduce:transition-none disabled:cursor-wait disabled:opacity-70"
      aria-label={label}
      aria-pressed={isFavorite}
      disabled={!isReady}
      onClick={() => toggleFavorite(productId)}
      title={label}
    >
      <span aria-hidden="true">{isFavorite ? "★" : "☆"}</span>
    </button>
  );
}