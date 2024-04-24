import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import SubText from "../../../../../../src/pages/HomePage/BannerSection/bannerComponents/SubText";

describe('Sub Text', () => {
    test("should render properly", () => {
        render(<SubText/>);

        // screen.debug();

        const text = screen.getByText("Create your videos & designs 10X faster");
        expect(text).toBeInTheDocument();
    })
})