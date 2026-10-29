import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import FavoriteProducts from "@/components/FavoriteProducts";
import { FavoritesProvider } from "@/components/FavoritesProvider";
import { FAVORITES_STORAGE_KEY } from "@/lib/favorites";
import { productFixture } from "@/test/productFixture";

const { getProductByIdMock } = vi.hoisted(() => ({
  getProductByIdMock: vi.fn(),
}));

vi.mock("@/lib/products", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/products")>();
  return { ...actual, getProductById: getProductByIdMock };
});

vi.mock("next/image", () => ({
  default: ({ alt }: { alt: string }) => <div role="img" aria-label={alt} />,
}));

describe("FavoriteProducts", () => {
  beforeEach(() => {
    window.localStorage.clear();
    getProductByIdMock.mockReset();
  });

  it("loads and renders saved products in the product grid", async () => {
    window.localStorage.setItem(FAVORITES_STORAGE_KEY, "[1]");
    getProductByIdMock.mockResolvedValue(productFixture);
    render(
      <FavoritesProvider>
        <FavoriteProducts />
      </FavoritesProvider>,
    );

    expect(await screen.findByRole("heading", { name: "Everyday Backpack" })).toBeInTheDocument();
    expect(getProductByIdMock).toHaveBeenCalledWith(1);
  });

  it("renders an empty state when no products are saved", async () => {
    render(
      <FavoritesProvider>
        <FavoriteProducts />
      </FavoritesProvider>,
    );

    expect(await screen.findByText("Aún no tienes favoritos.")).toBeInTheDocument();
    expect(getProductByIdMock).not.toHaveBeenCalled();
  });

  it("retries when all saved products fail to load", async () => {
    window.localStorage.setItem(FAVORITES_STORAGE_KEY, "[1]");
    getProductByIdMock
      .mockRejectedValueOnce(new Error("Offline"))
      .mockResolvedValue(productFixture);
    render(
      <FavoritesProvider>
        <FavoriteProducts />
      </FavoritesProvider>,
    );

    fireEvent.click(await screen.findByRole("button", { name: "Reintentar" }));

    expect(await screen.findByRole("heading", { name: "Everyday Backpack" })).toBeInTheDocument();
    expect(getProductByIdMock).toHaveBeenCalledTimes(2);
  });
});