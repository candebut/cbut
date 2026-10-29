"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

//TODO: make the search execute while user stops writing 

type SearchBarProps = {
  initialQuery: string;
};

export default function SearchBar({ initialQuery }: SearchBarProps) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState(initialQuery);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const query = searchTerm.trim();
    router.push(query ? `/?q=${encodeURIComponent(query)}` : "/");
  }

  return (
    <form
      className="mb-8 flex min-h-14 w-full max-w-2xl border border-[#cbd3ca] bg-white shadow-[0_8px_24px_rgba(23,59,46,0.06)] focus-within:border-[#173b2e]"
      onSubmit={handleSubmit}
      role="search"
    >
      <label className="sr-only" htmlFor="product-search">
        Buscar productos por nombre
      </label>
      <input
        id="product-search"
        className="min-w-0 flex-1 bg-transparent px-4 text-sm text-[#17231d] outline-none placeholder:text-[#89938b] sm:px-5"
        type="search"
        placeholder="Buscar productos..."
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />
      <button
        className="m-1 min-w-24 bg-[#c44732] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#a93625] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#173b2e]"
        type="submit"
      >
        Buscar
      </button>
    </form>
  );
}