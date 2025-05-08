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
  }),
}));

beforeEach(() => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: async () => ({ userInfo: {}, pastReviews: [] }),
  });
});

describe("NavBar appears on all main pages", () => {
  const pagesToTest = [
    { name: "Home", component: Home },
    { name: "About", component: About },
    { name: "ProfilePage", component: ProfilePage },
    { name: "RateDormPage", component: RateDormPage },
  ];

  pagesToTest.forEach(({ name, component }) => {
    test(`NavBar is present on the ${name} page`, async () => {
      render(<App Component={component} pageProps={{}} />);
      expect(await screen.findByRole("navigation")).toBeInTheDocument();
    });
  });
});
