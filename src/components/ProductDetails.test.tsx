import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { FavoritesProvider } from "@/components/FavoritesProvider";
import ProductDetails from "@/components/ProductDetails";
import { productFixture } from "@/test/productFixture";

vi.mock("next/image", () => ({
  default: ({ alt, src }: { alt: string; src: string }) => (
    <div role="img" aria-label={alt} data-src={src} />
  ),
}));

describe("ProductDetails", () => {
  it("renders product information, a return link, and its favorite control", async () => {
    render(
      <FavoritesProvider>
        <ProductDetails product={productFixture} />
      </FavoritesProvider>,
    );

    expect(screen.getByRole("heading", { level: 1, name: "Everyday Backpack" })).toBeInTheDocument();
    expect(screen.getByText("A useful backpack for daily use.")).toBeInTheDocument();
    expect(screen.getByText("42,50 €")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Everyday Backpack" })).toHaveAttribute(
      "data-src",
      productFixture.images[0],
    );
    expect(screen.getByRole("link", { name: "Volver al catálogo" })).toHaveAttribute("href", "/");
    expect(await screen.findByRole("button", { name: "Añadir a favoritos" })).toBeInTheDocument();
  });
});