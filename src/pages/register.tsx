import { useState } from 'react';
import { useAuthContext } from '../contexts/AuthContext';
import Link from 'next/link';
import Input from '../components/Input';

import styles from '../styles/pages/Register.module.css';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');

  const { register } = useAuthContext();

  async function handleOnSubmit(e) {
    e.preventDefault();

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
            onChange={(e) => setName(e.target.value)}
            placeholder="Ex: José da Silva"
          />
          <Input
            name="email"
            label="Email"
            value={email}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Ex: jose@aol.com"
          />
          <Input
            name="password"
            type="password"
            label="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Crie uma senha para você"
          />
          <Input
            name="photo_url"
            type="text"
            label="URL da foto"
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
            placeholder="Ex: https://pbs.twimg.com/profile_images/1212841876895813632/4mzarqqS_400x400.jpg"
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
