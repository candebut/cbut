"use client";

import Link from "next/link";
import { useFavorites } from "@/components/FavoritesProvider";

export default function FavoriteCountLink() {
  const { favoriteIds, isReady } = useFavorites();
  const count = isReady ? favoriteIds.length : 0;

  return (
    <Link
      href="/favorites"
      aria-label={`Ver favoritos, ${count}`}
      className="inline-flex min-h-11 items-center gap-2 border border-white/35 px-3 text-sm font-semibold text-white transition-colors hover:border-[#d6f36a] hover:text-[#d6f36a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d6f36a] sm:px-4"
    >
      <span aria-hidden="true" className="text-lg leading-none">☆</span>
      <span>Favoritos</span>
      <span aria-live="polite" aria-atomic="true" className="tabular-nums">
        {count}
      </span>
    </Link>
  );
}