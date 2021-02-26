import api from '../api';
import Navbar from '../components/Navbar';
import withAuth from '../components/WithAuth';
import styles from '../styles/pages/Ranking.module.scss';

export default withAuth(function Ranking({ users }) {
  function getFirstname(name: string) {
    return name.split(' ')[0];
  }

  const fallbackSource =
    'https://i.pinimg.com/474x/6c/e5/6f/6ce56f3ac0383536ce7734894d17e69e.jpg';

  return (
    <div className={styles.rankingContainer}>
      <Navbar />
      <section>
        <h3>Ranking</h3>

        <span className={styles.spanImage}>
          <img src="/crown.png" alt="Crown" />
        </span>

        <div>
          {users &&
            users.map((user) => (
              <div key={user.id} className={styles.listItemDiv}>
                <img
                  src={
                    user.photo_url.includes('.jpg') ||
                    user.photo_url.includes('.png')
                      ? user.photo_url
                      : fallbackSource
                  }
                  alt={user.name}
                />

                <div>
                  <span>
                    <strong>Nome</strong>
                    <p>{getFirstname(user.name)}</p>
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

export const getServerSideProps = async () => {
  const response = await api.get('/users');

  return {
    props: {
      users: response.data
    }
  };
};
