export default function ProductLoading() {
  return (
    <main
      className="mx-auto min-h-screen w-full max-w-[1180px] px-4 py-8 sm:px-7 sm:py-12 lg:px-10"
      aria-busy="true"
    >
      <p className="sr-only" role="status">Cargando producto</p>
      <div className="grid gap-8 md:grid-cols-2" aria-hidden="true">
        <div className="aspect-square animate-pulse bg-[#e6ebe2] motion-reduce:animate-none" />
        <div className="space-y-5 py-4">
          <div className="h-4 w-1/4 animate-pulse bg-[#e6ebe2] motion-reduce:animate-none" />
          <div className="h-12 w-4/5 animate-pulse bg-[#e6ebe2] motion-reduce:animate-none" />
          <div className="h-8 w-1/3 animate-pulse bg-[#e6ebe2] motion-reduce:animate-none" />
          <div className="h-24 w-full animate-pulse bg-[#e6ebe2] motion-reduce:animate-none" />
        </div>
      </div>
    </main>
  );
}