import type { Metadata } from "next";
import Link from "next/link";
import FavoriteProducts from "@/components/FavoriteProducts";

export const metadata: Metadata = {
  title: "Favoritos | Punto",
  description: "Tus productos favoritos.",
};

export default function FavoritesPage() {
  return (
    <main className="mx-auto w-full max-w-[1340px] px-4 pb-20 pt-9 sm:px-7 sm:pt-12 lg:px-10 lg:pt-16">
      <div className="mb-8 flex flex-col justify-between gap-5 sm:mb-10 sm:flex-row sm:items-end">
        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-[#c44732]">
            Guardados / 02
          </p>
          <h1 id="catalog-heading" className="text-3xl font-semibold tracking-tight text-[#17231d] sm:text-5xl">
            Tus favoritos<span className="text-[#c44732]">.</span>
          </h1>
        </div>
      </div>
      <Link
        href="/"
        className="mb-8 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#173b2e] underline decoration-[#9eafa2] underline-offset-4 hover:text-[#a93625] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#173b2e]"
      >
        <span aria-hidden="true">←</span> Volver a todos los productos
      </Link>
      <FavoriteProducts />
    </main>
  );
}