import { render, screen, waitFor, within } from "@testing-library/react";
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
  test("filters dorms by amenity: elevator", async () => {
    render(<HomeCreator />);

    const elevatorFilter = await screen.findByText(/elevator/i);

    elevatorFilter.click();

    await waitFor(() => {
      const matches = screen.getAllByText(/hepburn/i);
      expect(matches.length).toBeGreaterThan(0);
    });

    expect(screen.queryByText(/stewart/i)).not.toBeInTheDocument();
  });

  test("renders no dorms when triples are selected", async () => {
    render(<HomeCreator />);

    const tripleFilter = await screen.findByText(/triple/i);
    tripleFilter.click();

    await waitFor(() => {
      const dormSections = screen.getAllByRole("region");

      for (const section of dormSections) {
        const links = within(section).queryAllByRole("link");
        expect(links.length).toBe(0);
      }
    });
  });
});
