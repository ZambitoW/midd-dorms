import { render, screen } from "@testing-library/react";
import Reviewer from "@/components/Reviewer"; // Adjust the import path as necessary

describe("Reviewer", () => {
  test("Test if submit button is disable when first opening the page", () => {
    // Arrange
    const mockDormOptions = ["Gifford", "Battell"];
    const mockRoomTypes = ["Single", "Double", "Suites"];
    const mockComplete = false;

    render(
      <Reviewer
        dormOptions={mockDormOptions}
        roomTypes={mockRoomTypes}
        complete={mockComplete}
      />,
    );
    // Assert
    const submitButton = screen.getByText(/Submit/i);
    expect(submitButton).toBeDisabled();
  });
});
