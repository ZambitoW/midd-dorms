import { render, screen } from "@testing-library/react";
import App from "@/pages/_app";
import About from "@/pages/about";
import ProfilePage from "@/pages/user/ProfilePage";
import RateDormPage from "@/pages/RateDormPage";
import Home from "@/pages/index";

jest.mock("next/router", () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
    pathname: "/",
    query: {},
  }),
}));

beforeEach(() => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: async () => ({ userInfo: {}, pastReviews: [] }),
  });
});

describe("Footer appears on all main pages", () => {
  const pagesToTest = [
    { name: "Home", component: Home },
    { name: "About", component: About },
    { name: "ProfilePage", component: ProfilePage },
    { name: "RateDormPage", component: RateDormPage },
  ];

  pagesToTest.forEach(({ name, component }) => {
    test(`Footer is present on the ${name} page`, async () => {
      render(<App Component={component} pageProps={{}} />);
      expect(
        await screen.findByText(/© Middlebury Dorms/i),
      ).toBeInTheDocument();
    });
  });
});

describe("Footer links and content", () => {
  test("contains internal and external links", async () => {
    render(<App Component={Home} pageProps={{}} />);

    // Internal links
    expect(screen.getByRole("link", { name: /about us/i })).toHaveAttribute(
      "href",
      "/about",
    );
    expect(screen.getByRole("link", { name: /faqs/i })).toHaveAttribute(
      "href",
      "/faq",
    );

    // External links
    expect(
      screen.getByRole("link", { name: /housing process/i }),
    ).toHaveAttribute(
      "href",
      expect.stringContaining("middlebury.edu/residential-life"),
    );
    expect(
      screen.getByRole("link", { name: /housing portal/i }),
    ).toHaveAttribute("href", expect.stringContaining("middlebury.datacenter"));
    expect(screen.getByRole("link", { name: /reslife/i })).toHaveAttribute(
      "href",
      expect.stringContaining("middlebury.edu/residential-life"),
    );
    expect(
      screen.getByRole("link", { name: /feedback form/i }),
    ).toHaveAttribute("href", expect.stringContaining("docs.google.com"));
  });
});
