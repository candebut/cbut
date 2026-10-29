"use client";

type ProductErrorProps = {
  retry: () => void;
};

export default function ProductError({ retry }: ProductErrorProps) {
  return (
    <main className="mx-auto flex min-h-[60vh] w-full max-w-[1180px] flex-col items-start justify-center px-4 py-16 sm:px-7 lg:px-10">
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-[#c44732]">
        Error de conexión
      </p>
      <h1 className="text-3xl font-semibold tracking-tight text-[#17231d] sm:text-4xl">
        No pudimos cargar este producto
      </h1>
      <p className="mt-3 max-w-lg text-base leading-7 text-[#5b665f]">
        Comprueba tu conexión e inténtalo de nuevo.
      </p>
      <button
        type="button"
        onClick={retry}
        className="mt-7 inline-flex min-h-11 items-center justify-center bg-[#c44732] px-5 text-sm font-semibold text-white hover:bg-[#a93625] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#173b2e]"
      >
        Reintentar
      </button>
    </main>
  );
}