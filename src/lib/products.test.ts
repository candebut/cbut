import { afterEach, describe, expect, it, vi } from "vitest";
import { getProductById, getProducts, ProductsApiError } from "@/lib/products";
import type { Products } from "@/lib/types";
import { productFixture } from "@/test/productFixture";

const productsResponse: Products = {
  products: [],
  total: 0,
  skip: 0,
  limit: 30,
};

afterEach(() => {
  vi.restoreAllMocks();
});

describe("product API helpers", () => {
  it("requests the full product list", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify(productsResponse), { status: 200 }),
    );

    await expect(getProducts()).resolves.toEqual(productsResponse);
    expect(fetchMock).toHaveBeenCalledWith("https://dummyjson.com/products");
  });

  it("encodes a search query and requests the search endpoint", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify(productsResponse), { status: 200 }),
    );

    await getProducts(" phone case ");

    expect(fetchMock).toHaveBeenCalledWith("https://dummyjson.com/products/search?q=phone%20case");
  });

  it("requests an individual product by ID", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify(productFixture), { status: 200 }),
    );

    await expect(getProductById(1)).resolves.toEqual(productFixture);
    expect(fetchMock).toHaveBeenCalledWith("https://dummyjson.com/products/1");
  });

  it("rejects unsuccessful API responses", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response(null, { status: 503 }));

    await expect(getProducts()).rejects.toThrow("DummyJSON request failed with status 503");
  });

  it("preserves a not-found status for individual products", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response(null, { status: 404 }));

    const error = await getProductById(999).catch((failure: unknown) => failure);

    expect(error).toBeInstanceOf(ProductsApiError);
    expect(error).toHaveProperty("status", 404);
  });
});