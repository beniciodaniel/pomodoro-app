import { useEffect, useState } from 'react';
import styles from '../styles/components/Countdown.module.css';

let countdownTimeout: NodeJS.Timeout;

export function Countdown() {
  const [customTime, setCustomTime] = useState(0);
  const [hasFinished, setHasFinished] = useState(false);

  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const [minuteLeft, minuteRight] = transformTimeIntoArrayOfString(minutes);
  const [secondLeft, secondRight] = transformTimeIntoArrayOfString(seconds);

  function transformTimeIntoArrayOfString(time: number) {
    return String(time).padStart(2, '0').split('');
  }

  function validInputField(event) {
    const value = event.target.value;

    if (isFinite(value)) {
      setCustomTime(value);
    }
  }

  function setCustomCountdownTime() {
    const defaultTime = 30;

    setTime(() => customTime * 60);

    if (!customTime) {
      setCustomTime(() => defaultTime);
      setTime(() => defaultTime * 60);
    }

    startCountdown();
  }

  function startCountdown() {
    setIsActive(true);
  }

  function resetCountdown() {
    clearTimeout(countdownTimeout);
    setIsActive(false);
    setTime(() => customTime * 60);
  }

  useEffect(() => {
    if (isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else if (isActive && time === 0) {
      setHasFinished(true);
      setIsActive(false);
    }
  }, [isActive, time]);

  return (
    <div>
      <div className={styles.countdownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>

      <input
        className={styles.countdownInput}
        type="text"
        placeholder="Digite o tempo"
        onChange={validInputField}
        value={customTime}
      />

      {hasFinished ? (
        <button disabled className={styles.countdownButton}>
          Ciclo encerrado
        </button>
      ) : isActive ? (
        <button
          onClick={resetCountdown}
          type="button"
          className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
        >
          Abandonar ciclo
        </button>
      ) : (
        <button
          onClick={setCustomCountdownTime}
          type="button"
          className={styles.countdownButton}
        >
          Iniciar um ciclo
        </button>
      )}
    </div>
  );
}
