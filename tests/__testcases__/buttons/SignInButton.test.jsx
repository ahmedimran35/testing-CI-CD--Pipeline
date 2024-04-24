import { act, render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import SignInButton from "../../../src/components/buttons/SignInButton/SignInButton";
import AuthProviders from "../../../src/Providers/AuthProviders";
import { BrowserRouter } from "react-router-dom";

describe("Sign In Button", () => {
  test("should render properly", async () => {
    const mockUseAuth = vi.fn();
    mockUseAuth.mockReturnValue({
      googleSignIn: vi.fn(),
    });
    await act(async () => {
      await render(
        <AuthProviders>
          <BrowserRouter>
            <SignInButton />
          </BrowserRouter>
        </AuthProviders>
      );
    });
    screen.debug();
    const button = screen.getByText(/Sign In/i);
    expect(button).toBeInTheDocument();
  });
});
