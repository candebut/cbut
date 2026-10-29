import Link from "next/link";
import { getProducts } from "@/lib/products";
import ProductGrid from "@/components/ProductGrid";
import SearchBar from "@/components/SearchBar";

type HomePageProps = {
  searchParams: Promise<{ q?: string | string[] }>;
};

export default async function Home({ searchParams }: HomePageProps) {
  const params = await searchParams;
  const queryValue = params.q;
  const query = (Array.isArray(queryValue) ? queryValue[0] : queryValue)?.trim() ?? "";

  let products: import("@/lib/types").Product[] = [];
  let total = 0;
  let hasError = false;

  try {
    const result = await getProducts(query);
    products = result.products;
    total = result.total;
  } catch {
    hasError = true;
  }

  return (
    <main className="mx-auto w-full max-w-[1340px] px-4 pb-20 pt-9 sm:px-7 sm:pt-12 lg:px-10 lg:pt-16">
        <div className="mb-8 flex flex-col justify-between gap-5 sm:mb-10 sm:flex-row sm:items-end">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-[#c44732]">
              Explorar / 01
            </p>
            <h1 id="catalog-heading" className="text-3xl font-semibold tracking-tight text-[#17231d] sm:text-5xl">
              Todos los productos<span className="text-[#c44732]">.</span>
            </h1>
          </div>
          {!hasError && (
            <p className="text-sm font-medium text-[#5b665f]" role="status" aria-live="polite" aria-atomic="true">
              {/* TODO:: move logic outside */}
              {total} {total === 1 ? "producto" : "productos"}
            </p>
          )}
        </div>

        <SearchBar key={query} initialQuery={query} />

        {hasError ? (
          <section className="mt-12 border-y border-[#d6dcd5] py-12 text-center" role="alert">
            <p className="text-lg font-semibold text-[#17231d]">
              No pudimos cargar los productos.
            </p>
            <p className="mt-2 text-sm text-[#5b665f]">
              Comprueba tu conexión e inténtalo de nuevo.
            </p>
            <Link
              href={query ? `/?q=${encodeURIComponent(query)}` : "/"}
              className="mt-5 inline-flex min-h-11 items-center justify-center bg-[#c44732] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#a93625]"
            >
              Intentar de nuevo
            </Link>
          </section>
        ) : (
          <ProductGrid products={products} query={query} />
        )}
    </main>
  );
}
