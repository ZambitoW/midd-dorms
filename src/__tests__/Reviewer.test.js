import { render, screen, fireEvent } from "@testing-library/react";
import Reviewer from "@/components/Reviewer";
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
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve([
          {
            id: "gifford",
            name: "Gifford Hall",
            roomTypes: ["single", "double", "suite"],
          },
        ]),
    }),
  );
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe("Reviewer", () => {
  test("Test that the user is notified when their review is too short", () => {
    render(<Reviewer />);

    const commentInput = screen.getByPlaceholderText("Type your comment here");
    expect(commentInput).toBeInTheDocument();

    fireEvent.change(commentInput, {
      target: { value: "This review is too short" },
    });

    expect(
      screen.getByText(/You need \d+ more characters/i),
    ).toBeInTheDocument();
  });

  test("Room button is enabled after dorm is selected", async () => {
    render(<Reviewer />);
    const dormInput = screen.getByLabelText(/select your dorm/i);

    //Type Gifford Hall into the input
    fireEvent.change(dormInput, { target: { value: "Gifford Hall" } });

    const option = await screen.findByText("Gifford Hall");
    fireEvent.click(option);

    const roomTypeInput = screen.getByLabelText(/select your room type/i);
    expect(roomTypeInput).not.toBeDisabled();
  });

  test("Test that submit button is enabled when conditions are met", async () => {
    render(<Reviewer />);

    //Assert that submit button is initially disabled
    const submitButton = screen.getByText(/submit/i);
    expect(submitButton).toBeDisabled();

    //Select Gifford as the dorm
    const dormInput = screen.getByLabelText(/select your dorm/i);
    fireEvent.change(dormInput, { target: { value: "Gifford Hall" } });
    const dormOption = await screen.findByText("Gifford Hall");
    fireEvent.click(dormOption);

    //Assert that after selecting Gifford, we are able to select a room type
    const roomTypeInput = screen.getByLabelText(/select your room type/i);
    expect(roomTypeInput).not.toBeDisabled();

    //Select double as the room type
    fireEvent.change(roomTypeInput, { target: { value: "double" } });
    const roomOption = await screen.findByText("double");
    fireEvent.click(roomOption);

    //Enter a comment over 100 characters
    const commentBox = screen.getByPlaceholderText(/type your comment here/i);
    fireEvent.change(commentBox, {
      target: {
        value:
          "1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890",
      },
    });

    //Assert that the submit button is no longer disabled
    expect(submitButton).not.toBeDisabled();
  });

  test("Correct review is sent on submit", async () => {
    render(<Reviewer />);

    //Enter a dorm
    const dormInput = screen.getByLabelText(/select your dorm/i);
    fireEvent.change(dormInput, { target: { value: "Gifford" } });
    const dormOption = await screen.findByText("Gifford Hall");
    fireEvent.click(dormOption);

    //Enter a room type
    const roomTypeInput = screen.getByLabelText(/select your room type/i);
    fireEvent.change(roomTypeInput, { target: { value: "single" } });
    const roomTypeOption = await screen.findByText("single");
    fireEvent.click(roomTypeOption);

    //Enter a comment
    const commentBox = screen.getByPlaceholderText(/type your comment here/i);
    fireEvent.change(commentBox, {
      target: {
        value:
          "1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890",
      },
    });

    //Move every rating to the right one tick making them all 4s
    const sliders = screen.getAllByRole("slider");
    for (const slider of sliders) {
      fireEvent.keyDown(slider, { key: "ArrowRight", code: "ArrowRight" });
    }

    //Use a different mocked fetch from the one we GET one we used in the component
    const mockFetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      }),
    );
    global.fetch = mockFetch;

    //Submit review
    const submitButton = screen.getByText(/submit/i);
    expect(submitButton).not.toBeDisabled();
    fireEvent.click(submitButton);

    //Assert that the body that we pass in the API call is what we would expect
    const body = JSON.parse(mockFetch.mock.calls[0][1].body);

    expect(body).toMatchObject({
      dorm: "gifford",
      roomType: "single",
      responses: {
        storage_space: 4,
        clean: 4,
        noise: 4,
        size: 4,
        dining_hall_proximity: 4,
        laundry: 4,
        public_bathrooms: 4,
        public_kitchens: 4,
        ac_proximity: 4,
      },
      comment:
        "1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890",
    });
  });
});
