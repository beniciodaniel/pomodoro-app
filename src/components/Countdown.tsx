import { useCountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/Countdown.module.css';

export function Countdown() {
  const {
    hasFinished,
    isActive,
    minutes,
    seconds,
    customTime,
    resetCountdown,
    setCustomTime,
    setCustomCountdownTime
  } = useCountdownContext();

  const [minuteLeft, minuteRight] = transformTimeIntoArrayOfString(minutes);
  const [secondLeft, secondRight] = transformTimeIntoArrayOfString(seconds);

  function transformTimeIntoArrayOfString(time: number) {
    return String(time).padStart(2, '0').split('');
  }

  function validInputFieldAndSetCustomTime(event) {
    const value = event.target.value;

    if (isFinite(value)) {
      setCustomTime(value);
    }
  }

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
        placeholder="Ex: 5"
        onChange={validInputFieldAndSetCustomTime}
        value={customTime ? customTime : ''}
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
