import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react';
import { useRouter } from 'next/router';
import api from '../api';

interface CreateRequestDTO {
  name: string;
  email: string;
  password: string;
  photo_url: string;
}

interface User {
  id: string;
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  name: string;
  email: string;
  photo_url: string;
}
interface AuthContextData {
  user: User;
  logIn: (email: string, password: string) => void;
  logOut: () => void;
  register: ({ email, name, password, photo_url }: CreateRequestDTO) => void;
  isLoading: boolean;
  isAuthenticated: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter();
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [user, setUser] = useState({} as User);

  async function register({
    email,
    name,
    password,
    photo_url
  }: CreateRequestDTO) {
    try {
      await api.post('/users', {
        email,
        password,
        name,
        photo_url
      });

      router.push('/');
    } catch (error) {
      alert('Erro ao fazer cadastro! Tente novamente :)');
    }
  }

  async function logIn(email: string, password: string) {
    try {
      const { data } = await api.post('/login', {
        email,
        password
      });

      setUser(() => data);
      setLoading(false);
      setAuthenticated(true);
      router.push('/pomodoro');
    } catch (error) {
      alert('Erro ao fazer login! Tente novamente :)');
    }
  }

  function logOut() {
    setUser({} as User);
    setAuthenticated(false);
    router.push('/');
  }

  return (
    <AuthContext.Provider
      value={{ user, logIn, logOut, register, isLoading, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuthContext() {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuthContext };
