import Head from 'next/head'
import '../styles/globals.css'
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../styles/theme';
import { ThemeProvider } from '@mui/material/styles';


function MyApp({ Component, pageProps }) {
  return (
    <>

      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
      <CssBaseline />

      <Component {...pageProps} />

      </ThemeProvider>

    </>
  )
}

export default MyApp
