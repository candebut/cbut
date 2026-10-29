import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import FavoriteButton from "@/components/FavoriteButton";
import { FavoritesProvider } from "@/components/FavoritesProvider";
import { FAVORITES_STORAGE_KEY } from "@/lib/favorites";

describe("FavoriteButton", () => {
  it("toggles the accessible state and persists the product ID", async () => {
    window.localStorage.clear();
    render(
      <FavoritesProvider>
        <FavoriteButton productId={42} />
      </FavoritesProvider>,
    );

    const addButton = await screen.findByRole("button", { name: "Añadir a favoritos" });
    await waitFor(() => expect(addButton).toBeEnabled());
    fireEvent.click(addButton);

    const removeButton = await screen.findByRole("button", { name: "Quitar de favoritos" });
    expect(removeButton).toHaveAttribute("aria-pressed", "true");
    expect(window.localStorage.getItem(FAVORITES_STORAGE_KEY)).toBe("[42]");
  });

  it("renders a saved favorite as pressed", async () => {
    window.localStorage.setItem(FAVORITES_STORAGE_KEY, "[42]");
    render(
      <FavoritesProvider>
        <FavoriteButton productId={42} />
      </FavoritesProvider>,
    );

    const button = await screen.findByRole("button", { name: "Quitar de favoritos" });
    await waitFor(() => expect(button).toBeEnabled());
    expect(button).toHaveAttribute("aria-pressed", "true");
  });
});