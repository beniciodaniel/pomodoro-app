import React from 'react';
import Head from 'next/head';

import { ChallengeBox } from '../components/ChallengeBox';
import { CountdownProvider } from '../contexts/CountdownContext';
import { CompletedChallenges } from '../components/CompletedChallenges';
import { Countdown } from '../components/Countdown';
import { Profile } from '../components/Profile';
import ExperienceBar from '../components/ExperienceBar';
import Navbar from '../components/Navbar';
import withAuth from '../components/WithAuth';

import styles from '../styles/pages/Home.module.css';
import { ChallengesProvider } from '../contexts/ChallengesContext';

export default withAuth(function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Início | Pomodoro</title>
      </Head>

      <Navbar />

      <ChallengesProvider>
        <ExperienceBar />

        <CountdownProvider>
          <section>
            <div>
              <Profile />
              <CompletedChallenges />
              <Countdown />
            </div>
            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
      </ChallengesProvider>
    </div>
  );
});
