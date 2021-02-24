import styles from '../styles/components/ChallengeBox.module.css';

export function ChallengeBox() {
  const hasActiveChallenge = true;

  return (
    <div className={styles.challengeBoxContainer}>
      {hasActiveChallenge ? (
        <div className={styles.challengeActive}>
          <header>Ganhe 400 xp</header>

          <main>
            <img src="icons/body.svg" alt="body" />
            <strong>Novo desafio</strong>
            <p>Levante e caminhe por 1 minuto</p>
          </main>

          <footer>
            <button className={styles.challengeFailedButton} type="button">
              Falhei
            </button>
            <button className={styles.challengeCompletedButton} type="button">
              Completei
            </button>
          </footer>
        </div>
      ) : (
        <div className={styles.challengeNotActive}>
          <strong>Finalize um ciclo para receber desafios</strong>
          <p>
            <img src="icons/level-up.svg" alt="Up" />
            Avance de level completando desafios
          </p>
        </div>
      )}
    </div>
  );
}
