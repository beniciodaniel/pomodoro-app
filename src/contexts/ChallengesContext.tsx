import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react';
import challenges from '../../challenges.json';
import api from '../api';
import { useAuthContext } from './AuthContext';

interface Challenge {
  type: 'body' | 'eye';
  description: string;
  amount: number;
}
interface ChallengesContextData {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  experienceToNextLevel: number;
  activeChallenge: Challenge;
  levelUp: () => void;
  startNewChallenge: () => void;
  resetChallenge: () => void;
  completeChallenge: () => void;
}

interface ChallengesProviderProps {
  children: ReactNode;
}

const ChallengesContext = createContext({} as ChallengesContextData);

function ChallengesProvider({ children }: ChallengesProviderProps) {
  const { user } = useAuthContext();

  const [level, setLevel] = useState(0);
  const [currentExperience, setCurrentExperience] = useState(0);
  const [challengesCompleted, setChallengesCompleted] = useState(0);
  const [activeChallenge, setActiveChallenge] = useState(null);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  useEffect(() => {
    Notification.requestPermission();
  }, []);

  useEffect(() => {
    setLevel(() => user.level);
    setCurrentExperience(() => user.currentExperience);
    setChallengesCompleted(() => user.challengesCompleted);
  }, [user]);

  function levelUp() {
    setLevel(level + 1);
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);

    const challenge = challenges[randomChallengeIndex];

    setActiveChallenge(challenge);

    new Audio('/zelda1.mp3').play();

    if (Notification.permission === 'granted') {
      new Notification('Novo desafio! 🚀🔥', {
        body: `Valendo ${challenge.amount}XP!`
      });
    }
  }

  function resetChallenge() {
    setActiveChallenge(null);
  }

  async function completeChallenge() {
    if (!activeChallenge) {
      return;
    }

    const { amount } = activeChallenge;

    let finalExperience = currentExperience + amount;

    if (finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel;
      levelUp();
    }

    await api.patch(`/users/${user.id}`, {
      currentExperience: finalExperience,
      challengesCompleted: challengesCompleted + 1,
      level: level + 1
    });

    setCurrentExperience(() => finalExperience);
    setActiveChallenge(null);
    setChallengesCompleted(() => challengesCompleted + 1);
  }

  return (
    <ChallengesContext.Provider
      value={{
        level,
        currentExperience,
        challengesCompleted,
        activeChallenge,
        experienceToNextLevel,
        levelUp,
        startNewChallenge,
        resetChallenge,
        completeChallenge
      }}
    >
      {children}
    </ChallengesContext.Provider>
  );
}

function useChallengesContext() {
  const context = useContext(ChallengesContext);

  return context;
}

export { ChallengesProvider, useChallengesContext };
