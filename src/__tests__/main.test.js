import { render } from "@testing-library/react";
import Home from "@/pages/index";

jest.mock("next/router", () => ({}));

describe("End-to-end testing", () => {
  test("Render index.js component", () => {
    render(<Home />);
  });
});
