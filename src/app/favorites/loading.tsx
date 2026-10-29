export default function FavoritesLoading() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-[1340px] px-4 py-12 sm:px-7 lg:px-10" aria-busy="true">
      <p className="sr-only" role="status">Cargando favoritos</p>
      <div className="mb-10 h-12 w-64 animate-pulse bg-[#dce2da] motion-reduce:animate-none" aria-hidden="true" />
      <ul aria-hidden="true" className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
        {Array.from({ length: 4 }, (_, index) => (
          <li key={index} className="overflow-hidden border border-[#dce2da] bg-white">
            <div className="aspect-[4/3] animate-pulse bg-[#e6ebe2] motion-reduce:animate-none" />
            <div className="space-y-3 p-4">
              <div className="h-3 w-1/3 animate-pulse bg-[#e6ebe2] motion-reduce:animate-none" />
              <div className="h-4 w-4/5 animate-pulse bg-[#e6ebe2] motion-reduce:animate-none" />
              <div className="h-5 w-1/2 animate-pulse bg-[#e6ebe2] motion-reduce:animate-none" />
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}