import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import ThirdCard from "../../../../../src/pages/HomePage/WhyChooseUs/WCUComponets/ThirdCard";

describe("Second Card", () => {
  test("should render correctly", () => {
    render(<ThirdCard />);
    // screen.debug();

    const element = screen.getByRole("heading");
    expect(element).toBeInTheDocument();

    expect(screen.getByText("Powerful Tools")).toBeDefined();
  });
});
