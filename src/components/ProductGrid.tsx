import ProductCard from "@/components/ProductCard";
import type { Product } from "@/lib/types";

type ProductGridProps = {
  products: Product[];
  query: string;
};

export default function ProductGrid({ products, query }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <section className="border-y border-[#d6dcd5] py-14 text-center" aria-live="polite">
        <p className="text-lg font-semibold text-[#17231d]">No hay resultados.</p>
        <p className="mt-2 text-sm text-[#5b665f]">
          {query ? `No encontramos productos para “${query}”.` : "El catálogo está vacío."}
        </p>
      </section>
    );
  }

  return (
    <ul aria-labelledby="catalog-heading" className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
      {products.map((product) => (
        <li key={product.id} className="min-w-0">
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
}