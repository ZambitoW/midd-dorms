import { render } from "@testing-library/react";
import Home from "@/pages/index";

jest.mock("next/router", () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
    pathname: "/",
    query: { alert: "test" },
  }),
}));

describe("End-to-end testing", () => {
  test("Render index.js component", () => {
    render(<Home />);
  });
});
