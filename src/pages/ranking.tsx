import { useEffect, useState } from 'react';
import api from '../api';
import Navbar from '../components/Navbar';
import withAuth from '../components/WithAuth';
import styles from '../styles/pages/Ranking.module.scss';

export default withAuth(function Ranking() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.get('/users').then((response) => setUsers(response.data));
  }, []);

  return (
    <div className={styles.rankingContainer}>
      <Navbar />
      <section>
        <h3>Ranking</h3>

        <div>
          {users &&
            users.map((user) => (
              <div key={user.id} className={styles.listItemDiv}>
                <img src={user.photo_url} alt={user.name} />

                <div>
                  <span>
                    <strong>Nome</strong>
                    <p>{user.name}</p>
                  </span>

                  <span>
                    <strong>Level</strong>
                    <p>{user.level}</p>
                  </span>

                  <span>
                    <strong>XP</strong>
                    <p>{user.currentExperience}</p>
                  </span>

                  <span>
                    <strong>Desafios</strong>
                    <p>{user.challengesCompleted}</p>
                  </span>
                </div>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
});
