 
import { render, screen, fireEvent } from "@testing-library/react";
import ProfilePage from "@/pages/user/ProfilePage";

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
});

describe("ProfilePage", () => {
  test("checks if the past reviews table is present", () => {
    render(<ProfilePage />);
    const table = screen.queryByRole("table");
    expect(table).toBeInTheDocument();
  });

  test("checks if the change graduation year button works", async () => {
    render(<ProfilePage />);

    const graduationYearText = await screen.findByText(
      /Graduation Year: 2028/i,
    );
    expect(graduationYearText).toBeInTheDocument();

    const button = screen.getByText(/Change Graduation Year/i);
    fireEvent.click(button);

    const input = screen.getByPlaceholderText(/Enter your graduation year/i);
    expect(input).toHaveValue(2028);

    fireEvent.change(input, { target: { value: "2027" } });
    const submitButton = screen.getByText(/Submit/i);
    fireEvent.click(submitButton);

    await screen.findByText(/Graduation Year: 2027/i);
  });
});
