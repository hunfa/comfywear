import Head from "next/head";
import "../styles/globals.css";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "../styles/theme";
import { ThemeProvider } from "@mui/material/styles";
import Navbar from "../components/navbar";
import { useRouter } from "next/router";
import { store } from "../store/index";
import { Provider } from "react-redux";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  console.log(router.pathname.startsWith("/dashboard"));
  const showNavbar = router.pathname.startsWith("/dashboard");

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {showNavbar && <Navbar />}
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    </>
  );
}

export default MyApp;
