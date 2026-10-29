import Image from "next/image";
import Link from "next/link";
import FavoriteButton from "@/components/FavoriteButton";
import type { Product } from "@/lib/types";

type ProductCardProps = {
  product: Product;
};

const priceFormatter = new Intl.NumberFormat("es-ES", {
  style: "currency",
  currency: "EUR",
});

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="group h-full overflow-hidden border border-[#dce2da] bg-white transition duration-200 hover:-translate-y-0.5 hover:border-[#9eafa2] hover:shadow-[0_12px_28px_rgba(23,59,46,0.1)] motion-reduce:transition-none motion-reduce:hover:transform-none">
      <div className="relative aspect-[4/3] overflow-hidden bg-[#edf2e8]">
        <Image
          className="object-contain p-3 transition-transform duration-300 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:transform-none sm:p-5"
          src={product.thumbnail}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        <FavoriteButton productId={product.id} />
      </div>
      <div className="flex min-h-36 flex-col p-3 sm:min-h-40 sm:p-4">
        <p className="mb-2 truncate text-[10px] font-bold uppercase tracking-[0.12em] text-[#8b4e3e] sm:text-[11px]">
          {product.category}
        </p>
        <h2 className="line-clamp-2 min-h-10 text-sm font-semibold leading-5 text-[#17231d] sm:text-base">
          {product.title}
        </h2>
        <div className="mt-auto flex items-end justify-between gap-2 pt-4">
          <p className="text-base font-bold text-[#173b2e] sm:text-lg">
            {priceFormatter.format(product.price)}
          </p>
          <p className="shrink-0 text-xs font-medium text-[#5b665f]" aria-label={`Valoración ${product.rating} de 5`}>
            {product.rating.toFixed(1)} / 5
          </p>
        </div>
        <Link
          href={`/products/${product.id}`}
          className="mt-3 inline-flex min-h-10 items-center text-sm font-semibold text-[#173b2e] underline decoration-[#9eafa2] underline-offset-4 hover:text-[#a93625] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#173b2e]"
        >
          Ver detalle
        </Link>
      </div>
    </article>
  );
}