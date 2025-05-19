import { render, screen, fireEvent } from "@testing-library/react";
import LoginPage from "@/pages/login";
import { signIn } from "next-auth/react";

jest.mock("next/router", () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
    pathname: "/login",
    query: {},
    replace: jest.fn(),
  }),
}));

jest.mock("next-auth/react", () => ({
  signIn: jest.fn(),
}));

describe("LoginPage", () => {
  test("Make sure login button is there", () => {
    render(<LoginPage />);
    const button = screen.getByRole("button", { name: /sign in with google/i });
    expect(button).toBeInTheDocument();
  });

  test("Login button calls the signIn when clicked on it", () => {
    render(<LoginPage />);
    const button = screen.getByRole("button", { name: /sign in with google/i });
    fireEvent.click(button);
    expect(signIn).toHaveBeenCalledWith("google", { callbackUrl: "/" });
  });

  test("When the login page has alert =1 in its query, it gives out an alert that user must be logged in ", () => {
    const alertMock = jest.spyOn(window, "alert").mockImplementation(() => {});
    const router = require("next/router");
    router.useRouter.mockReturnValue({
      push: jest.fn(),
      pathname: "/login",
      query: { alert: "1" },
      replace: jest.fn(),
    });

    render(<LoginPage />);
    expect(alertMock).toHaveBeenCalledWith(
      "You must be logged in to view that page.",
    );
    alertMock.mockRestore();
  });
});
