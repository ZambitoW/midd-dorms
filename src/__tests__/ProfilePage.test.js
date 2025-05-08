import { render, screen } from "@testing-library/react";
import ProfilePage from "@/pages/user/ProfilePage";
import { SessionProvider } from "next-auth/react"; // Import SessionProvider
import { useRouter } from "next/router"; // Import useRouter

// Mocking useRouter
jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

beforeEach(() => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: async () => ({
      userInfo: {
        id: 1,
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        classYear: 2028,
      },
      pastReviews: [],
    }),
  });

  // Mock the return value of useRouter
  useRouter.mockReturnValue({
    push: jest.fn(),
    pathname: "/profile", // Adjust the pathname as needed
  });
});

describe("ProfilePage", () => {
  test("checks if the past reviews table is present", () => {
    render(
      <SessionProvider session={{}}>
        <ProfilePage />
      </SessionProvider>,
    );
    const table = screen.queryByRole("table");
    expect(table).toBeInTheDocument();
  });
});
