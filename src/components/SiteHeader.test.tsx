import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { FavoritesProvider } from "@/components/FavoritesProvider";
import SiteHeader from "@/components/SiteHeader";

describe("SiteHeader", () => {
  it("renders the home link and favorites navigation", () => {
    render(
      <FavoritesProvider>
        <SiteHeader />
      </FavoritesProvider>,
    );

    expect(screen.getByRole("link", { name: "Punto, inicio" })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: "Ver favoritos, 0" })).toHaveAttribute(
      "href",
      "/favorites",
    );
  });
});