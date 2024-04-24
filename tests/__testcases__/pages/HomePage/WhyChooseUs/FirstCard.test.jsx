import { render, screen } from "@testing-library/react";
import FirstCard from "../../../../../src/pages/HomePage/WhyChooseUs/WCUComponets/FirstCard";
import { describe, expect, test } from "vitest";

describe("First Card", () => {
  test("should render correctly", () => {
    render(<FirstCard />);
    // screen.debug();

    const element = screen.getByRole("heading");
    expect(element).toBeInTheDocument();
  });
});
