import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react';
import { useChallengesContext } from './ChallengesContext';

interface CountdownContextData {
  minutes: number;
  seconds: number;
  isActive: boolean;
  hasFinished: boolean;
  customTime: number;
  resetCountdown: () => void;
  setCustomTime: (value: number) => void;
  setCustomCountdownTime: () => void;
}

interface CountdownProviderProps {
  children: ReactNode;
}

const CountdownContext = createContext({} as CountdownContextData);
let countdownTimeout: NodeJS.Timeout;

function CountdownProvider({ children }: CountdownProviderProps) {
  const { startNewChallenge } = useChallengesContext();

  const [customTime, setCustomTime] = useState(0);
  const [hasFinished, setHasFinished] = useState(false);

  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

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
    setHasFinished(false);
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
      startNewChallenge();
    }
  }, [isActive, time]);

  return (
    <CountdownContext.Provider
      value={{
        hasFinished,
        isActive,
        minutes,
        seconds,
        customTime,
        resetCountdown,
        setCustomTime,
        setCustomCountdownTime
      }}
    >
      {children}
    </CountdownContext.Provider>
  );
}

function useCountdownContext() {
  const context = useContext(CountdownContext);

  return context;
}

export { CountdownProvider, useCountdownContext };
