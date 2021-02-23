import { useEffect, useState } from 'react';
import styles from '../styles/components/Countdown.module.css';

export function Countdown() {
  const [customTime, setCustomTime] = useState(0);

  const [time, setTime] = useState(0);
  const [active, setActive] = useState(false);

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
    setActive(true);
  }

  useEffect(() => {
    if (active && time > 0) {
      setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    }
  }, [active, time]);

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

      <button
        onClick={setCustomCountdownTime}
        type="button"
        className={styles.countdownButton}
      >
        Iniciar um ciclo
      </button>
    </div>
  );
}
