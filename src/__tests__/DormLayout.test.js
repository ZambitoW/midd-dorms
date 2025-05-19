import { render, screen } from "@testing-library/react";
import DormLayout from "@/components/DormLayout";
import "@testing-library/jest-dom";

jest.mock("next/router", () => ({
  useRouter: () => ({
    push: jest.fn(),
    pathname: "/",
    route: "/",
    query: {},
    asPath: "/",
  }),
}));

beforeEach(() => {
  global.fetch = jest.fn((url) => {
    if (url.includes("/api/dorms/gifford/reviews")) {
      return Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve([
            {
              id: 1,
              userId: 1,
              buildingId: "gifford",
              room_type: "single",
              storage_space: 2,
              clean: 2,
              size: 2,
              noise: 2,
              dining_hall_proximity: 2,
              ac_proximity: 2,
              public_bathrooms: 2,
              public_kitchens: 2,
              laundry: 2,
              comment:
                "1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890",
            },
          ]),
      });
    }
    if (url.includes("/api/dorms")) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve([]),
      });
    }

    if (url === "/api/auth/session") {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ user: { id: 1 } }),
      });
    }

    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve({}),
    });
  });
});


describe("DormLayout", () => {
  test("Shows dorm name and description", () => {
    render(
      <DormLayout
        dorm={{
          id: "gifford",
          name: "Gifford Hall",
          category: "sophomore",
          description: "Gifford description",
          roomTypes: ["single", "double", "suite"],
          building_type: "residence hall",
          residents: "100",
        }}
      />,
    );
    expect(screen.getByText("Gifford Hall")).toBeInTheDocument();
    expect(screen.getByText("Gifford description")).toBeInTheDocument();
  });


  test("Renders room type buttons", () => {
    render(
      <DormLayout
        dorm={{
          id: "gifford",
          name: "Gifford Hall",
          category: "sophomore",
          description: "Gifford description",
          roomTypes: ["single", "double", "suite"],
          building_type: "residence hall",
          residents: "100",
        }}
      />,
    );
    expect(screen.getByRole("button", { name: /all/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /single/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /double/i })).toBeInTheDocument();
  });

  test("Shows Edit and Delete buttons for current user's review", async () => {
    render(
      <DormLayout
        dorm={{
          id: "gifford",
          name: "Gifford Hall",
          category: "sophomore",
          description: "Gifford description",
          roomTypes: ["single", "double", "suite"],
          building_type: "residence hall",
          residents: "100",
        }}
      />,
    );
    await screen.findByText("Gifford Hall");
    const editButtons = screen.getAllByText("Edit Review");
    const deleteButtons = screen.getAllByText("Delete Review");
    expect(editButtons.length).toBe(1);
    expect(deleteButtons.length).toBe(1);
  });

});
