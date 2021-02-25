import React, { InputHTMLAttributes } from 'react';

import styles from '../styles/components/Input.module.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
}

const Input: React.FC<InputProps> = ({
  name,
  label,
  ...atributosRestantes
}) => {
  return (
    <div className={styles.inputBlock}>
      <label htmlFor={name}>{label}</label>
      <input type="text" id={name} {...atributosRestantes} />
    </div>
  );
};

export default Input;
