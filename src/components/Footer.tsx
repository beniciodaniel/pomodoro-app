import styles from '../styles/components/Footer.module.scss';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div>
        <p>
          made by @beniciohasegawa in{' '}
          <a href="https://nextlevelweek.com/">nlw</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
