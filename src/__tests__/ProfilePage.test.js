import { render, screen, fireEvent } from "@testing-library/react";
import ProfilePage from "@/pages/user/ProfilePage";

describe("ProfilePage", () => {
  test("checks if the past reviews table is present", () => {
    render(<ProfilePage />);
    const table = screen.queryByRole("table");
    expect(table).toBeInTheDocument();
  });

  test("testing if the change graduation year button works ", () => {
    render(<ProfilePage />);
    // Arrange
    const graduationYearText = screen.getByText(/Graduation Year: 2028/i);
    expect(graduationYearText).toBeInTheDocument();
    // Act
    const button = screen.getByText(/Change Graduation Year/i);
    fireEvent.click(button);
    // Assert
    const input = screen.getByPlaceholderText(/Enter your graduation year/i);
    expect(input).toHaveValue(2028);
    // Submit
    fireEvent.change(input, { target: { value: "2027" } });
    const submitButton = screen.getByText(/Submit/i);
    fireEvent.click(submitButton);
    //Assert
    expect(screen.getByText(/Graduation Year: 2027/i)).toBeInTheDocument();
  });
});
