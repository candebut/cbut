import Link from "next/link";
import FavoriteCountLink from "@/components/FavoriteCountLink";

export default function SiteHeader() {
  return (
    <header className="border-b border-white/15 bg-[#173b2e] text-white">
      <div className="mx-auto flex max-w-[1340px] items-center justify-between gap-3 px-4 py-4 sm:px-7 lg:px-10">
        <Link href="/" className="flex shrink-0 items-center gap-3" aria-label="Punto, inicio">
          <span className="grid size-9 place-items-center rounded-sm bg-[#d6f36a] text-sm font-black text-[#173b2e]">
            P
          </span>
          <span className="text-sm font-bold tracking-[0.12em]">PUNTO</span>
        </Link>
        <p className="hidden text-xs font-medium uppercase tracking-[0.12em] text-white/65 sm:block">
          Catálogo de productos
        </p>
        <FavoriteCountLink />
      </div>
    </header>
  );
}