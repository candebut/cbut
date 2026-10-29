import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { beforeEach, describe, expect, it } from "vitest";
import {
  FavoritesProvider,
  useFavorites,
} from "@/components/FavoritesProvider";
import { FAVORITES_STORAGE_KEY } from "@/lib/favorites";

function FavoritesProbe() {
  const { favoriteIds, isReady, toggleFavorite } = useFavorites();

  return (
    <div>
      <p>{isReady ? "Ready" : "Loading"}</p>
      <output>{favoriteIds.join(",")}</output>
      <button type="button" onClick={() => toggleFavorite(12)}>
        Toggle 12
      </button>
    </div>
  );
}

describe("FavoritesProvider", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("provides a ready state and persists toggle updates", async () => {
    render(
      <FavoritesProvider>
        <FavoritesProbe />
      </FavoritesProvider>,
    );

    expect(await screen.findByText("Ready")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Toggle 12" }));

    await waitFor(() => {
      expect(screen.getByText("12")).toBeInTheDocument();
      expect(window.localStorage.getItem(FAVORITES_STORAGE_KEY)).toBe("[12]");
    });
  });

  it("renders a stable loading snapshot before hydration", () => {
    const markup = renderToString(
      <FavoritesProvider>
        <FavoritesProbe />
      </FavoritesProvider>,
    );

    expect(markup).toContain("Loading");
  });

  it("restores saved IDs after the initial render", async () => {
    window.localStorage.setItem(FAVORITES_STORAGE_KEY, "[4,9]");

    render(
      <FavoritesProvider>
        <FavoritesProbe />
      </FavoritesProvider>,
    );

    expect(await screen.findByText("4,9")).toBeInTheDocument();
  });
});