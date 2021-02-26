import Head from 'next/head';
import Footer from '../components/Footer';
import { AuthProvider } from '../contexts/AuthContext';
import { ChallengesProvider } from '../contexts/ChallengesContext';
import { CountdownProvider } from '../contexts/CountdownContext';

import '../styles/global.css';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ChallengesProvider>
        <CountdownProvider>
          <Head>
            <title>Pomodorin | Exercite-se</title>
          </Head>
          <Component {...pageProps} />
        </CountdownProvider>
      </ChallengesProvider>
    </AuthProvider>
  );
}

export default MyApp;
