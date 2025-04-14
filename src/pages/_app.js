import PropTypes from "prop-types";
import "@/styles/globals.css";
import NavBar from "@/components/NavBar";
export default function App({ Component, pageProps }) {
  return (
    <div>
      <NavBar> </NavBar>
      <Component {...pageProps} />
    </div>
  );
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object,
};
