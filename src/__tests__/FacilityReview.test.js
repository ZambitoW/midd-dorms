import { render, screen } from "@testing-library/react";
import FacilityReview from "@/components/FacilityReview";
import "@testing-library/jest-dom";

jest.mock("nanoid");
describe("FacilityReview", () => {
  test("Average rating is correct", () => {
    const facilityRatings = {
      storage_space: 2,
      clean: 2,
      size: 2,
      noise: 2,
      dining_hall_proximity: 2,
      ac_proximity: 4,
      public_bathrooms: 4,
      public_kitchens: 4,
      laundry: 5,
    };
    render(<FacilityReview facilityRatings={facilityRatings} />);
    expect(screen.getByText("3.0")).toBeInTheDocument;
  });
});
