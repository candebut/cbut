import { afterEach, describe, expect, it, vi } from "vitest";
import { getProductById, getProducts } from "@/lib/products";
import type { Product, Products } from "@/lib/types";

const productsResponse: Products = {
  products: [],
  total: 0,
  skip: 0,
  limit: 30,
};

const productResponse: Product = {
  id: 1,
  title: "Everyday Backpack",
  description: "A useful backpack for daily use.",
  category: "accessories",
  price: 42.5,
  discountPercentage: 10,
  rating: 4.5,
  stock: 12,
  tags: ["bags"],
  sku: "BAG-001",
  weight: 1,
  dimensions: { width: 30, height: 40, depth: 12 },
  warrantyInformation: "1 year warranty",
  shippingInformation: "Ships in 2 business days",
  availabilityStatus: "In Stock",
  reviews: [],
  returnPolicy: "30 days return policy",
  minimumOrderQuantity: 1,
  meta: {
    createdAt: "2025-01-01T00:00:00.000Z",
    updatedAt: "2025-01-01T00:00:00.000Z",
    barcode: "1234567890123",
    qrCode: "https://example.com/qr.png",
  },
  images: ["https://cdn.dummyjson.com/product-images/bag/1.webp"],
  thumbnail: "https://cdn.dummyjson.com/product-images/bag/thumbnail.webp",
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
      new Response(JSON.stringify(productResponse), { status: 200 }),
    );

    await expect(getProductById(1)).resolves.toEqual(productResponse);
    expect(fetchMock).toHaveBeenCalledWith("https://dummyjson.com/products/1");
  });

  it("rejects unsuccessful API responses", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response(null, { status: 503 }));

    await expect(getProducts()).rejects.toThrow("DummyJSON request failed with status 503");
  });
});