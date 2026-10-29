"use client";

import { useEffect, useState } from "react";
import ProductGrid from "@/components/ProductGrid";
import { useFavorites } from "@/components/FavoritesProvider";
import { getProductById } from "@/lib/products";
import type { Product } from "@/lib/types";

type FavoritesResult = {
  idsKey: string;
  products: Product[];
  hasError: boolean;
};

export default function FavoriteProducts() {
  const { favoriteIds, isReady } = useFavorites();
  const idsKey = favoriteIds.join(",");
  const [result, setResult] = useState<FavoritesResult | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    if (!isReady || !idsKey) return;

    let active = true;
    const ids = idsKey.split(",").map(Number);

    Promise.all(
      ids.map(async (id) => {
        try {
          return await getProductById(id);
        } catch {
          return null;
        }
      }),
    ).then((products) => {
      if (!active) return;

      setResult({
        idsKey,
        products: products.filter((product): product is Product => product !== null),
        hasError: products.some((product) => product === null),
      });
    });

    return () => {
      active = false;
    };
  }, [idsKey, isReady, retryCount]);

  if (!isReady || (idsKey && result?.idsKey !== idsKey)) {
    return (
      <p className="py-10 text-sm text-[#5b665f]" role="status" aria-busy="true">
        Cargando favoritos...
      </p>
    );
  }

  if (!idsKey) {
    return (
      <section className="border-y border-[#d6dcd5] py-14 text-center">
        <p className="text-lg font-semibold text-[#17231d]">Aún no tienes favoritos.</p>
        <p className="mt-2 text-sm text-[#5b665f]">
          Guarda productos con el botón de estrella y aparecerán aquí.
        </p>
      </section>
    );
  }

  const favorites = result?.idsKey === idsKey ? result : null;

  if (favorites?.hasError && favorites.products.length === 0) {
    return (
      <section className="border-y border-[#d6dcd5] py-12 text-center" role="alert">
        <p className="text-lg font-semibold text-[#17231d]">
          No pudimos cargar tus favoritos.
        </p>
        <button
          className="mt-5 min-h-11 bg-[#c44732] px-5 text-sm font-semibold text-white hover:bg-[#a93625] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#173b2e]"
          type="button"
          onClick={() => setRetryCount((count) => count + 1)}
        >
          Reintentar
        </button>
      </section>
    );
  }

  return (
    <>
      {favorites?.hasError && (
        <p className="mb-5 text-sm text-[#8b3c2b]" role="status">
          No se pudieron cargar algunos productos favoritos.
        </p>
      )}
      <ProductGrid products={favorites?.products ?? []} query="" />
    </>
  );
}