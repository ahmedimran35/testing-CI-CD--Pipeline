import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import FourthCard from "../../../../../src/pages/HomePage/WhyChooseUs/WCUComponets/FourthCard";

describe("Second Card", () => {
  test("should render correctly", () => {
    render(<FourthCard />);
    // screen.debug();

    const element = screen.getByRole("heading");
    expect(element).toBeInTheDocument();

    expect(screen.getByText("Easy Connect")).toBeDefined();
  });
});
