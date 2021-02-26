import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../contexts/AuthContext';
import Link from 'next/link';
import Input from '../components/Input';

import styles from '../styles/pages/Login.module.css';
import Footer from '../components/Footer';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailErrored, setIsEmailErrored] = useState(false);
  const [isPasswordErrored, setIsPasswordErrored] = useState(false);

  const { logIn } = useAuthContext();

  function handleOnChange(e) {
    const inputId = e.target.id;
    const value = e.target.value;
    if (inputId === 'email') {
      setEmail(value);
      setIsEmailErrored(false);
    } else if (inputId === 'password') {
      setPassword(value);
      setIsPasswordErrored(false);
    }
  }

  async function handleOnSubmit(e) {
    e.preventDefault();

    if (!email || !password) {
      if (!email) {
        setIsEmailErrored(true);
      }

      if (!password) {
        setIsPasswordErrored(true);
      }
      return;
    }

    logIn(email, password);
  }

  return (
    <>
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
              type="email"
              label="Email"
              value={email}
              onChange={handleOnChange}
              placeholder="Digite o seu email"
              isErrored={isEmailErrored}
            />
            <Input
              name="password"
              type="password"
              label="Senha"
              value={password}
              onChange={handleOnChange}
              placeholder="Digite a sua senha"
              isErrored={isPasswordErrored}
            />
            <button type="submit">Entrar</button>
          </form>
          <div className={styles.linkContainer}>
            <Link href="/register">Cadastrar-se</Link>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
