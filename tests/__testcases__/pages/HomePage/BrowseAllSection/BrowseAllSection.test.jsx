import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import BrowseAllSection from '../../../../../src/pages/HomePage/BrowseAllSection/BrowseAllSection';
import { BrowserRouter } from 'react-router-dom';

describe("BrowseAllSection", () => {
    test("should render properly", () => {
        render(
            <BrowserRouter>
                <BrowseAllSection />
            </BrowserRouter>
        )
        // screen.debug();

        const headings = screen.getAllByRole("heading");
        const link = screen.getByRole("link");

        expect(headings).toHaveLength(2);
        expect(link).toHaveAttribute("href", "/category-data?category=All")
    })
})