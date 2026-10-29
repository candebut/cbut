import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { FavoritesProvider } from "@/components/FavoritesProvider";
import ProductCard from "@/components/ProductCard";
import ProductGrid from "@/components/ProductGrid";
import { productFixture } from "@/test/productFixture";

vi.mock("next/image", () => ({
  default: ({ alt, src }: { alt: string; src: string }) => (
    <div role="img" aria-label={alt} data-src={src} />
  ),
}));

describe("ProductGrid", () => {
  it("renders product details in a card", () => {
    render(
      <FavoritesProvider>
        <ProductGrid products={[productFixture]} query="" />
      </FavoritesProvider>,
    );

    expect(screen.getByRole("heading", { name: "Everyday Backpack" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Everyday Backpack" })).toHaveAttribute(
      "data-src",
      productFixture.thumbnail,
    );
    expect(screen.getByText(/42,50/)).toBeInTheDocument();
    expect(screen.getByText("4.5 / 5")).toBeInTheDocument();
  });

  it("renders the empty search state", () => {
    render(
      <FavoritesProvider>
        <ProductGrid products={[]} query="desk lamp" />
      </FavoritesProvider>,
    );

    expect(screen.getByText("No hay resultados.")).toBeInTheDocument();
    expect(screen.getByText("No encontramos productos para “desk lamp”.")).toBeInTheDocument();
  });
});

describe("ProductCard", () => {
  it("renders a favorite control for its product", async () => {
    render(
      <FavoritesProvider>
        <ProductCard product={productFixture} />
      </FavoritesProvider>,
    );

    expect(await screen.findByRole("button", { name: "Añadir a favoritos" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Ver detalle" })).toHaveAttribute(
      "href",
      "/products/1",
    );
  });
});