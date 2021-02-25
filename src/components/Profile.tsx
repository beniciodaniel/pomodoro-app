import { useAuthContext } from '../contexts/AuthContext';
import { useChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Profile.module.css';

export function Profile() {
  const { user } = useAuthContext();
  const { level } = useChallengesContext();

  return (
    <div className={styles.profileContainer}>
      <img src={user.photo_url} alt="Imagem de Perfil" />
      <div>
        <strong>{user.name}</strong>
        <p>
          <img src="icons/level.svg" alt="Level image" />
          Level {level}
        </p>
      </div>
    </div>
  );
}
