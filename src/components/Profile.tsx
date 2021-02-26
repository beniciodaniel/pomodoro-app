import { useEffect, useState } from 'react';
import { useAuthContext } from '../contexts/AuthContext';
import { useChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Profile.module.css';

export function Profile() {
  const { user } = useAuthContext();
  const { level } = useChallengesContext();

  const [source, setSource] = useState('');
  const [isErrored, setIsErrored] = useState(false);
  const fallbackSource =
    'https://i.pinimg.com/474x/6c/e5/6f/6ce56f3ac0383536ce7734894d17e69e.jpg';

  useEffect(() => {
    setSource(user.photo_url);
  }, []);

  const onError = () => {
    if (!isErrored) {
      setSource(fallbackSource);
      setIsErrored(true);
    }
  };

  return (
    <div className={styles.profileContainer}>
      <img onError={onError} src={source} alt="Imagem de Perfil" />
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
