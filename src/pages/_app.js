import PropTypes from "prop-types";
import "@/styles/globals.css";
import NavBar from "@/components/NavBar";
import { SessionProvider } from "next-auth/react";
import Footer from "@/components/Footer.js";

export default function App({ Component, pageProps: { session, pageProps } }) {
  return (
    <div className="layoutGrid">
      <SessionProvider session={session}>
        <NavBar />
        <main className="pageContent">
          <Component {...pageProps} />
        </main>
        <Footer />
      </SessionProvider>
    </div>
  );
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object,
};
