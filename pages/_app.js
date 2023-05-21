import Head from 'next/head'
import '../styles/globals.css'
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../styles/theme';
import { ThemeProvider } from '@mui/material/styles';
import Navbar from '../components/navbar';
import { useRouter } from 'next/router'



function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const showNavbar = router.pathname !== '/dashboard' ? false : router.pathname === '/login' ? false : true;
  return (
    <>

      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {showNavbar && <Navbar />}
        <Component {...pageProps} />

      </ThemeProvider>

    </>
  )
}

export default MyApp
