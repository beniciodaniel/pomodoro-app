import styles from '../styles/components/Profile.module.css';

export function Profile() {
  return (
    <div className={styles.profileContainer}>
      <img
        src="https://avatars.githubusercontent.com/u/52285940?s=460&u=62458ff1b9ec02aac67bb56fed2eaadb0ad16b33&v=4"
        alt="Imagem de Perfil"
      />
      <div>
        <strong>Benicrazy</strong>
        <p>
          <img src="icons/level.svg" alt="Level image" />
          Level 1
        </p>
      </div>
    </div>
  );
}
