import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import MainSearch from "../../../../../../src/pages/HomePage/BannerSection/bannerComponents/MainSearch";

describe("Main Search", () => {
  const renderComponent = () => {
    render(<MainSearch />);

    return {
      input: screen.getByRole("textbox"),
      button: screen.getByRole("button"),
    };
  };

  test("should render properly", () => {
    const { input, button } = renderComponent();
    // screen.debug();
    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });
});
