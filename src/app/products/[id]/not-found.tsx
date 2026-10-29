import Link from "next/link";

export default function ProductNotFound() {
  return (
    <main className="mx-auto flex min-h-[60vh] w-full max-w-[1180px] flex-col items-start justify-center px-4 py-16 sm:px-7 lg:px-10">
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-[#c44732]">
        Error 404
      </p>
      <h1 className="text-3xl font-semibold tracking-tight text-[#17231d] sm:text-4xl">
        Producto no encontrado
      </h1>
      <p className="mt-3 max-w-lg text-base leading-7 text-[#5b665f]">
        Puede que el producto ya no esté disponible o que la dirección no sea válida.
      </p>
      <Link
        href="/"
        className="mt-7 inline-flex min-h-11 items-center justify-center bg-[#173b2e] px-5 text-sm font-semibold text-white hover:bg-[#245640] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#173b2e]"
      >
        Volver al catálogo
      </Link>
    </main>
  );
}