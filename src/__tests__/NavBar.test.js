import { render, screen } from "@testing-library/react";
import App from "@/pages/_app";
import About from "@/pages/about";
import ProfilePage from "@/pages/user/ProfilePage";
import RateDormPage from "@/pages/RateDormPage";
import Home from "@/pages/index";

// This code below is to mock the router, if not the test won't pass
jest.mock("next/router", () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
    pathname: "/",
  }),
}));

describe("NavBar appears on all main pages", () => {
  const pagesToTest = [
    { name: "Home", component: Home },
    { name: "About", component: About },
    { name: "ProfilePage", component: ProfilePage },
    { name: "RateDormPage", component: RateDormPage },
  ];

  pagesToTest.forEach(({ name, component }) => {
    test(`NavBar is present on the ${name} page`, () => {
      render(<App Component={component} pageProps={{}} />);
      expect(screen.getByRole("navigation")).toBeInTheDocument();
    });
  });
});
