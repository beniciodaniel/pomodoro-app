import Head from 'next/head';
import { AuthProvider } from '../contexts/AuthContext';

import '../styles/global.css';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Head>
        <title>Pomodorin | Exercite-se</title>
      </Head>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
