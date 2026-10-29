import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import FavoritesPage from "@/app/favorites/page";

vi.mock("@/components/FavoriteProducts", () => ({
  default: () => <div>Favorite product list</div>,
}));

describe("FavoritesPage", () => {
  it("provides a link back to all products", () => {
    render(<FavoritesPage />);

    expect(screen.getByRole("link", { name: "Volver a todos los productos" })).toHaveAttribute(
      "href",
      "/",
    );
  });
});