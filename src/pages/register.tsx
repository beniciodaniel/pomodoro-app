import { useEffect, useState } from 'react';
import { useAuthContext } from '../contexts/AuthContext';
import Link from 'next/link';
import Input from '../components/Input';

import styles from '../styles/pages/Register.module.css';

export default function Register() {
  const { register } = useAuthContext();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');

  const [isNameErrored, setIsNameErrored] = useState(false);
  const [isEmailErrored, setIsEmailErrored] = useState(false);
  const [isPasswordErrored, setIsPasswordErrored] = useState(false);
  const [isConfirmPasswordErrored, setIsConfirmPasswordErrored] = useState(
    false
  );
  const [isPhotoUrlErrored, setIsPhotoUrlErrored] = useState(false);

  useEffect(() => {
    if (password && confirmPassword !== password) {
      setIsConfirmPasswordErrored(true);
      return;
    }
    setIsConfirmPasswordErrored(false);
  }, [confirmPassword, password]);

  function handleOnChange(e) {
    const inputId = e.target.id;
    const value = e.target.value;

    if (inputId === 'name') {
      setName(value);
      setIsNameErrored(false);
    } else if (inputId === 'email') {
      setEmail(value);
      setIsEmailErrored(false);
    } else if (inputId === 'password') {
      setPassword(value);
      setIsPasswordErrored(false);
    } else if (inputId === 'photo_url') {
      setPhotoUrl(value);
      setIsPhotoUrlErrored(false);
    } else if (inputId === 'confirmPassword') {
      setConfirmPassword(value);
      setIsConfirmPasswordErrored(false);
    }
  }

  async function handleOnSubmit(e) {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      if (!name) {
        setIsNameErrored(true);
      }

      if (!email) {
        setIsEmailErrored(true);
      }

      if (!password) {
        setIsPasswordErrored(true);
      }

      if (!confirmPassword) {
        setIsConfirmPasswordErrored(true);
      }

      return;
    }

    register({ email, password, name, photo_url: photoUrl });
  }

  return (
    <div className={styles.registerContainer}>
      <section className={styles.imageSection}>
        <img src="/tomato-pixel.png" alt="Logo" />
      </section>
      <section className={styles.formSection}>
        <h2>Pomodorin</h2>

        <form onSubmit={handleOnSubmit}>
          <Input
            name="name"
            label="Nome"
            value={name}
            onChange={handleOnChange}
            placeholder="Ex: José da Silva"
            isErrored={isNameErrored}
          />
          <Input
            name="email"
            label="Email"
            value={email}
            type="email"
            onChange={handleOnChange}
            placeholder="Ex: jose@aol.com"
            isErrored={isEmailErrored}
          />

          <Input
            name="password"
            type="password"
            label="Senha"
            value={password}
            onChange={handleOnChange}
            placeholder="Crie uma senha para você"
            isErrored={isPasswordErrored}
          />

          <Input
            name="confirmPassword"
            type="password"
            label="Confirmar Senha"
            value={confirmPassword}
            onChange={handleOnChange}
            placeholder="Redigite a senha"
            isErrored={isConfirmPasswordErrored}
          />
          {isConfirmPasswordErrored && confirmPassword && (
            <span className={styles.confirmPasswordNotification}>
              As senhas não estão iguais
            </span>
          )}

          <Input
            name="photo_url"
            type="text"
            label="URL da foto"
            value={photoUrl}
            onChange={handleOnChange}
            placeholder="Ex: https://pbs.twimg.com/profile_images/1212841876895813632/4mzarqqS_400x400.jpg"
            isErrored={isPhotoUrlErrored}
          />
          <button type="submit">Criar usuário</button>
        </form>
        <div className={styles.linkContainer}>
          <Link href="/">Voltar para login</Link>
        </div>
      </section>
    </div>
  );
}
