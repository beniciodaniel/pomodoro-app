import { useState } from 'react';
import { useAuthContext } from '../contexts/AuthContext';
import Link from 'next/link';
import Input from '../components/Input';

import styles from '../styles/pages/Login.module.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { logIn } = useAuthContext();

  async function handleOnSubmit(e) {
    e.preventDefault();

    logIn(email, password);
  }

  return (
    <div className={styles.loginContainer}>
      <section className={styles.imageSection}>
        <img src="/tomato-pixel.png" alt="Logo" />
      </section>
      <section className={styles.formSection}>
        <h2>Pomodorin</h2>
        {/* <h3>Login</h3> */}

        <form onSubmit={handleOnSubmit}>
          <Input
            name="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite o seu email"
          />
          <Input
            name="password"
            type="password"
            label="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Digite a sua senha"
          />
          <button type="submit">Entrar</button>
        </form>
        <div className={styles.linkContainer}>
          <Link href="/register">Cadastrar-se</Link>
        </div>
      </section>
    </div>
  );
}
