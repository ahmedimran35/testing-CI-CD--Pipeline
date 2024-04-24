import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import SecondCard from "../../../../../src/pages/HomePage/WhyChooseUs/WCUComponets/SecondCard";

describe("Second Card", () => {
  test("should render correctly", () => {
    render(<SecondCard />);
    // screen.debug();

    const element = screen.getByRole("heading");
    expect(element).toBeInTheDocument();

    expect(screen.getByText("Market Place")).toBeDefined();
  });
});
