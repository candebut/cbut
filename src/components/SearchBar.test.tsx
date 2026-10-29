import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import SearchBar from "@/components/SearchBar";

const { push, replace } = vi.hoisted(() => ({ push: vi.fn(), replace: vi.fn() }));

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push, replace }),
}));

describe("SearchBar", () => {
  beforeEach(() => {
    push.mockReset();
    replace.mockReset();
  });

  afterEach(() => {
    vi.useRealTimers();
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

  it("replaces the URL after the user stops typing", () => {
    vi.useFakeTimers();
    render(<SearchBar initialQuery="" />);
    fireEvent.change(screen.getByRole("searchbox", { name: "Buscar productos por nombre" }), {
      target: { value: "phone" },
    });

    vi.advanceTimersByTime(349);
    expect(replace).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1);
    expect(replace).toHaveBeenCalledWith("/?q=phone");
  });

  it("returns to the full catalog when the input is cleared", () => {
    vi.useFakeTimers();
    render(<SearchBar initialQuery="phone" />);
    fireEvent.change(screen.getByRole("searchbox", { name: "Buscar productos por nombre" }), {
      target: { value: "" },
    });

    vi.advanceTimersByTime(350);

    expect(replace).toHaveBeenCalledWith("/");
  });

  it("submits immediately without waiting for the debounce", () => {
    vi.useFakeTimers();
    render(<SearchBar initialQuery="" />);
    fireEvent.change(screen.getByRole("searchbox", { name: "Buscar productos por nombre" }), {
      target: { value: "phone" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Buscar" }));

    expect(push).toHaveBeenCalledWith("/?q=phone");
    vi.advanceTimersByTime(350);
    expect(replace).not.toHaveBeenCalled();
  });
});