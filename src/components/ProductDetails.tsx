import Image from "next/image";
import Link from "next/link";
import FavoriteButton from "@/components/FavoriteButton";
import type { Product } from "@/lib/types";

type ProductDetailsProps = {
  product: Product;
};

const priceFormatter = new Intl.NumberFormat("es-ES", {
  style: "currency",
  currency: "EUR",
});

export default function ProductDetails({ product }: ProductDetailsProps) {
  const image = product.images[0] ?? product.thumbnail;

  return (
    <main className="mx-auto w-full max-w-[1180px] px-4 pb-20 pt-8 sm:px-7 sm:pt-12 lg:px-10">
      <nav aria-label="Navegación de producto" className="mb-8">
        <Link
          href="/"
          className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#173b2e] underline decoration-[#9eafa2] underline-offset-4 hover:text-[#a93625] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#173b2e]"
        >
          <span aria-hidden="true">←</span> Volver al catálogo
        </Link>
      </nav>

      <article className="grid gap-8 border-y border-[#d6dcd5] py-6 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:gap-12 md:py-10">
        <div className="relative aspect-square overflow-hidden bg-[#edf2e8]">
          <Image
            className="object-contain p-5 sm:p-10"
            src={image}
            alt={product.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 55vw"
          />
          <FavoriteButton productId={product.id} />
        </div>

        <div className="flex flex-col">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-[#8b4e3e]">
            {product.category}
          </p>
          <h1 className="text-3xl font-semibold leading-tight tracking-tight text-[#17231d] sm:text-4xl">
            {product.title}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
            <p className="text-sm font-medium text-[#5b665f]" aria-label={`Valoración ${product.rating} de 5`}>
              {product.rating.toFixed(1)} / 5 · {product.reviews.length} reseñas
            </p>
            <p className="text-sm font-semibold text-[#173b2e]">
              {product.availabilityStatus}
            </p>
          </div>

          <p className="mt-7 text-3xl font-bold text-[#173b2e]">
            {priceFormatter.format(product.price)}
          </p>
          {product.discountPercentage > 0 && (
            <p className="mt-1 text-sm text-[#5b665f]">
              {product.discountPercentage}% de descuento
            </p>
          )}

          <p className="mt-7 max-w-prose text-base leading-7 text-[#46534a]">
            {product.description}
          </p>

          <dl className="mt-8 grid grid-cols-1 gap-4 border-t border-[#d6dcd5] pt-6 sm:grid-cols-2">
            <div>
              <dt className="text-xs font-bold uppercase tracking-[0.1em] text-[#68746b]">
                Marca
              </dt>
              <dd className="mt-1 text-sm font-medium text-[#17231d]">
                {product.brand ?? "Sin marca"}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-bold uppercase tracking-[0.1em] text-[#68746b]">
                Disponibilidad
              </dt>
              <dd className="mt-1 text-sm font-medium text-[#17231d]">
                {product.stock} unidades · {product.availabilityStatus}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-bold uppercase tracking-[0.1em] text-[#68746b]">
                Envío
              </dt>
              <dd className="mt-1 text-sm font-medium text-[#17231d]">
                {product.shippingInformation}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-bold uppercase tracking-[0.1em] text-[#68746b]">
                Garantía y devoluciones
              </dt>
              <dd className="mt-1 text-sm font-medium text-[#17231d]">
                {product.warrantyInformation} · {product.returnPolicy}
              </dd>
            </div>
          </dl>
        </div>
      </article>
    </main>
  );
}