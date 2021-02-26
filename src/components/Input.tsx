import React, { InputHTMLAttributes } from 'react';

import styles from '../styles/components/Input.module.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  isErrored?: boolean;
}

const Input: React.FC<InputProps> = ({
  name,
  label,
  isErrored,
  ...atributosRestantes
}) => {
  return (
    <div className={styles.inputBlock}>
      <div className={isErrored ? styles.errored : ''}>
        <label htmlFor={name}>{label}</label>
        <input type="text" id={name} {...atributosRestantes} />
      </div>
    </div>
  );
};

export default Input;
