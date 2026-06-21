import { render } from "@testing-library/react";
import Home from "@/pages/index";

jest.mock("next/router", () => ({
  useRouter: jest.fn(() => ({
    query: {},
    push: jest.fn(),
    replace: jest.fn(),
    pathname: "/",
  })),
}));

describe("End-to-end testing", () => {
  test("Render index.js component", () => {
    render(<Home />);
  });
});
