import { useChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/LevelUpModal.module.scss';

export function LevelUpModal() {
  const { level, closeLevelUpModal } = useChallengesContext();

  return (
    <div className={styles.overlay} onClick={closeLevelUpModal}>
      <div className={styles.container}>
        <header>{level}</header>

        <strong>Parabéns</strong>
        <p>Você alcançou um novo level.</p>

        <button type="button" onClick={closeLevelUpModal}>
          <img src="/icons/close.svg" alt="Fechar" />
        </button>
      </div>
    </div>
  );
}
