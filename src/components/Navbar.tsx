import { useRouter } from 'next/router';
import { useAuthContext } from '../contexts/AuthContext';

import styles from '../styles/components/Navbar.module.css';

const Navbar = () => {
  const { logOut } = useAuthContext();
  const router = useRouter();

  function redirectToRanking() {
    router.push('/ranking');
  }

  function redirectToPomodoro() {
    router.push('/pomodoro');
  }

  return (
    <nav className={styles.navbar}>
      <div onClick={redirectToPomodoro}>
        <img src="/tomato-pixel.png" alt="Logo" />
      </div>
      <div>
        <button onClick={redirectToRanking}>Ranking</button>
        <button onClick={redirectToPomodoro}>Desafios</button>
        <button onClick={logOut}>Sair</button>
      </div>
    </nav>
  );
};

export default Navbar;
