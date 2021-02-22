import Head from 'next/head';
import ExperienceBar from '../components/ExperienceBar';

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Pomodoro</title>
      </Head>

      <ExperienceBar />
    </div>
  );
}