import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import ProductDetails from "@/components/ProductDetails";
import ProductError from "@/app/products/[id]/error";
import ProductLoading from "@/app/products/[id]/loading";
import ProductNotFound from "@/app/products/[id]/not-found";
import { ProductsApiError } from "@/lib/products";
import type { Product } from "@/lib/types";
import { productFixture } from "@/test/productFixture";
import ProductPage from "./page";

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

describe("Product detail route", () => {
  beforeEach(() => {
    getProductByIdMock.mockReset();
  });

  it("loads a valid ID and returns the product detail component", async () => {
    getProductByIdMock.mockResolvedValue(productFixture);

    const result = await ProductPage({ params: Promise.resolve({ id: "1" }) });

    expect(getProductByIdMock).toHaveBeenCalledWith(1);
    expect(result.type).toBe(ProductDetails);
    expect(result.props.product).toEqual(productFixture satisfies Product);
  });

  it("uses the not-found boundary for an invalid ID", async () => {
    await expect(
      ProductPage({ params: Promise.resolve({ id: "not-a-number" }) }),
    ).rejects.toThrow("NEXT_HTTP_ERROR_FALLBACK;404");
    expect(getProductByIdMock).not.toHaveBeenCalled();
  });

  it("maps an API 404 to the not-found boundary", async () => {
    getProductByIdMock.mockRejectedValue(new ProductsApiError(404));

    await expect(
      ProductPage({ params: Promise.resolve({ id: "999" }) }),
    ).rejects.toThrow("NEXT_HTTP_ERROR_FALLBACK;404");
  });

  it("allows non-404 API errors to reach the error boundary", async () => {
    const apiError = new ProductsApiError(503);
    getProductByIdMock.mockRejectedValue(apiError);

    await expect(
      ProductPage({ params: Promise.resolve({ id: "1" }) }),
    ).rejects.toBe(apiError);
  });
});

describe("Product route states", () => {
  it("renders an announced loading state", () => {
    render(<ProductLoading />);

    expect(screen.getByRole("status")).toHaveTextContent("Cargando producto");
  });

  it("renders an accessible not-found message and return link", () => {
    render(<ProductNotFound />);

    expect(screen.getByRole("heading", { name: "Producto no encontrado" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Volver al catálogo" })).toHaveAttribute("href", "/");
  });

  it("retries after a product loading error", () => {
    const retry = vi.fn();
    render(<ProductError retry={retry} />);
    fireEvent.click(screen.getByRole("button", { name: "Reintentar" }));

    expect(retry).toHaveBeenCalledOnce();
  });
});