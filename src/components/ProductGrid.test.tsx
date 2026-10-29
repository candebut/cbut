import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ProductGrid from "@/components/ProductGrid";
import type { Product } from "@/lib/types";

vi.mock("next/image", () => ({
  default: ({ alt, src }: { alt: string; src: string }) => (
    <div role="img" aria-label={alt} data-src={src} />
  ),
}));

const product: Product = {
  id: 1,
  title: "Everyday Backpack",
  description: "A useful backpack for daily use.",
  category: "accessories",
  price: 42.5,
  discountPercentage: 10,
  rating: 4.5,
  stock: 12,
  tags: ["bags"],
  brand: "Northstar",
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

describe("ProductGrid", () => {
  it("renders product details in a card", () => {
    render(<ProductGrid products={[product]} query="" />);

    expect(screen.getByRole("heading", { name: "Everyday Backpack" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Everyday Backpack" })).toHaveAttribute(
      "data-src",
      product.thumbnail,
    );
    expect(screen.getByText(/42,50/)).toBeInTheDocument();
    expect(screen.getByText("4.5 / 5")).toBeInTheDocument();
  });

  it("renders the empty search state", () => {
    render(<ProductGrid products={[]} query="desk lamp" />);

    expect(screen.getByText("No hay resultados.")).toBeInTheDocument();
    expect(screen.getByText("No encontramos productos para “desk lamp”.")).toBeInTheDocument();
  });
});