import { render, screen } from "@testing-library/react";
import App from "@/pages/_app";
import About from "@/pages/about";
import RateDormPage from "@/pages/RateDormPage";
import Home from "@/pages/index";
import { useSession } from "next-auth/react";

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

describe("NavBar appears on all main pages", () => {
  beforeEach(() => {
    useSession.mockReturnValue({
      data: null,
      status: "unauthenticated",
    });
  });

  const pagesToTest = [
    { name: "Home", component: Home },
    { name: "About", component: About },
    { name: "RateDormPage", component: RateDormPage },
  ];

  pagesToTest.forEach(({ name, component }) => {
    test(`NavBar is present on the ${name} page`, async () => {
      render(<App Component={component} pageProps={{}} />);
      expect(await screen.findByRole("navigation")).toBeInTheDocument();
    });
  });
});

jest.mock("next-auth/react", () => ({
  ...jest.requireActual("next-auth/react"),
  useSession: jest.fn(),
}));

describe("NavBar login state", () => {
  test("shows login button when user is not logged in", async () => {
    useSession.mockReturnValueOnce({
      data: null,
      status: "unauthenticated",
    });

    render(<App Component={Home} pageProps={{}} />);
    expect(await screen.findByText(/login/i)).toBeInTheDocument();
  });

  test("shows profile image when user is logged in", async () => {
    useSession.mockReturnValueOnce({
      data: { user: { name: "Danny" } },
      status: "authenticated",
    });

    render(<App Component={Home} pageProps={{}} />);
    const profileImg = await screen.findByAltText("Profile");
    expect(profileImg).toBeInTheDocument();
  });
});
