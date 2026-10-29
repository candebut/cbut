import type { Product, Products } from "@/lib/types";

const PRODUCTS_API_URL = "https://dummyjson.com/products";

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`DummyJSON request failed with status ${response.status}`);
  }

  return (await response.json()) as T;
}

export function getProducts(searchTerm = ""): Promise<Products> {
  const query = searchTerm.trim();
  const url = query
    ? `${PRODUCTS_API_URL}/search?q=${encodeURIComponent(query)}`
    : PRODUCTS_API_URL;

  return fetchJson<Products>(url);
}

export function getProductById(id: number): Promise<Product> {
  return fetchJson<Product>(`${PRODUCTS_API_URL}/${id}`);
}