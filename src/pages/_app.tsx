import '../styles/globals.css';
import Head from 'next/head';

import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
  <>
  <Head>
    <title>GameSewer.com</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="cache-control" content="no-cache" />
    <meta http-equiv="expires" content="0" />
    <meta http-equiv="pragma" content="no-cache" />
  </Head>
  <Component {...pageProps} />
  </>);
}

export default MyApp;
