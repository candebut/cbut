import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import FavoriteCountLink from "@/components/FavoriteCountLink";
import { FavoritesProvider } from "@/components/FavoritesProvider";
import { FAVORITES_STORAGE_KEY } from "@/lib/favorites";

describe("FavoriteCountLink", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("links to the favorites page and announces the saved count", async () => {
    window.localStorage.setItem(FAVORITES_STORAGE_KEY, "[2,5]");
    render(
      <FavoritesProvider>
        <FavoriteCountLink />
      </FavoritesProvider>,
    );

    expect(await screen.findByRole("link", { name: "Ver favoritos, 2" })).toHaveAttribute(
      "href",
      "/favorites",
    );
  });

  it("shows zero when there are no saved products", async () => {
    render(
      <FavoritesProvider>
        <FavoriteCountLink />
      </FavoritesProvider>,
    );

    expect(await screen.findByRole("link", { name: "Ver favoritos, 0" })).toBeInTheDocument();
  });
});