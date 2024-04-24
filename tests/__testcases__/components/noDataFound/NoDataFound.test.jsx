import { render, screen } from '@testing-library/react';
import NoDataFound from '../../../../src/components/NoDataFound/NoDataFound';
import { describe, expect, test } from 'vitest';

describe('No Data Found Component', () => {
    test("should render correctly", () => {
        render(<NoDataFound/>)

        // screen.debug();

        const element = screen.getByRole("heading");
        expect(element).toBeInTheDocument();
    })
})