import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import PrimaryButton from "../../../src/components/buttons/PrimaryButton/PrimaryButton";
import { BrowserRouter } from "react-router-dom";

describe("Primary Button", () => {
  test("Should Render Correctly and render text correctly", () => {
    render(
      <BrowserRouter>
        <PrimaryButton text={"Create"} />
      </BrowserRouter>
    );
    // screen.debug();

    const element = screen.getByRole("button");
    expect(element).toBeInTheDocument();

    expect(screen.getByText("Create")).toBeDefined();
  }),
    test("Should Navigate Correctly", () => {
      render(
        <BrowserRouter>
          <PrimaryButton text={"Create"} />
        </BrowserRouter>
      );

      const allCategory = screen.getByRole("link");
      expect(allCategory).toBeInTheDocument();
      expect(allCategory).toHaveAttribute(
        "href",
        "/category-data?category=All"
      );
    });
});
