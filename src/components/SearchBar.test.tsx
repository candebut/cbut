import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import SearchBar from "@/components/SearchBar";

const { push } = vi.hoisted(() => ({ push: vi.fn() }));

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push }),
}));

describe("SearchBar", () => {
  beforeEach(() => {
    push.mockReset();
  });

  it("submits the trimmed query as a shareable URL", () => {
    render(<SearchBar initialQuery="" />);
    fireEvent.change(screen.getByRole("searchbox", { name: "Buscar productos por nombre" }), {
      target: { value: " phone case " },
    });
    fireEvent.click(screen.getByRole("button", { name: "Buscar" }));

    expect(push).toHaveBeenCalledWith("/?q=phone%20case");
  });

  it("returns to the catalog when the query is blank", () => {
    render(<SearchBar initialQuery="phone" />);
    fireEvent.change(screen.getByRole("searchbox", { name: "Buscar productos por nombre" }), {
      target: { value: "   " },
    });
    fireEvent.click(screen.getByRole("button", { name: "Buscar" }));

    expect(push).toHaveBeenCalledWith("/");
  });
});