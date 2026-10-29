export default function Loading() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-[1340px] px-4 py-12 sm:px-7 lg:px-10" aria-busy="true">
      <div className="mb-10 h-12 w-64 animate-pulse bg-[#dce2da]" />
      <div className="mb-9 h-14 max-w-2xl animate-pulse bg-white" />
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
        {Array.from({ length: 8 }, (_, index) => (
          <li key={index} className="overflow-hidden border border-[#dce2da] bg-white">
            <div className="aspect-[4/3] animate-pulse bg-[#e6ebe2]" />
            <div className="space-y-3 p-4">
              <div className="h-3 w-1/3 animate-pulse bg-[#e6ebe2]" />
              <div className="h-4 w-4/5 animate-pulse bg-[#e6ebe2]" />
              <div className="h-5 w-1/2 animate-pulse bg-[#e6ebe2]" />
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}