import { render, screen, waitFor } from "@testing-library/react";
import HomeCreator from "@/components/HomePage";
import dorms from "../../data/buildingseed.json";

describe("Dorm filtering", () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => dorms,
    });
  });

  test("renders all dorms when no filters are selected", async () => {
    render(<HomeCreator />);

    const expectedDorms = dorms.filter((dorm) => {
      const category = dorm.category?.toLowerCase();
      return (
        category.includes("freshman") ||
        category.includes("sophomore") ||
        category.includes("upper")
      );
    });

    for (const dorm of expectedDorms) {
      await waitFor(() => {
        expect(screen.getAllByText(dorm.name).length).toBeGreaterThan(0);
      });
    }
  });
});
