import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import auth, { signOut } from '@react-native-firebase/auth';
import { Alert } from 'react-native';
import { showAlert } from '@src/utils';
import { useDispatch } from 'react-redux';
import { resetTodoData } from '@src/store';

type UserType = {
  multiFactor: {
    enrolledFactors: any[]; // Replace 'any' with a more specific type if known
  };
  metadata: {
    lastSignInTime: number;
    creationTime: number;
  };
  photoURL: string | null;
  phoneNumber: string | null;
  tenantId: string | null;
  displayName: string | null;
  emailVerified: boolean;
  isAnonymous: boolean;
  uid: string;
  email: string;
  providerData: Array<{
    email: string;
    providerId: string;
    photoURL: string | null;
    phoneNumber: string | null;
    displayName: string | null;
    uid: string;
  }>;
  providerId: string;
} | null;

export type AuthContextType = {
  /**
   * This variable is of type Auth and is used to store Auth  data.
   */
  initializing: boolean;
  user: UserType;
  setUser: React.Dispatch<UserType>;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw Error('useAuth must be used inside AuthContext');
  return context;
};

export const AuthProvider = ({ children }: React.PropsWithChildren) => {
  const [user, setUser] = useState<UserType>(null);
  const [initializing, setInitializing] = useState(true);
  const dispatch = useDispatch();
  // Handle user state changes
  function onAuthStateChanged(user: any) {
    console.log('onAuthStateChanged', user);

    setUser(user);
    if (initializing) setInitializing(false);
  }

  async function register(email: string, password: string) {
    return (
      auth()
        .createUserWithEmailAndPassword(email, password)
        //   .createUserWithEmailAndPassword('jane.doe@example.com', 'SuperSecretPassword!')
        .then(() => {
          console.log('User account created & signed in!');
          return true;
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
            showAlert('That email address is already in use!');
          }

          if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
            showAlert('That email address is invalid!');
          }

          console.error(error);
          return false;
        })
    );
  }
  async function login(email: string, password: string) {
    return (
      auth()
        .signInWithEmailAndPassword(email, password)
        //   .createUserWithEmailAndPassword('jane.doe@example.com', 'SuperSecretPassword!')
        .then(() => {
          console.log('signed in!');
          return true;
        })
        .catch(error => {
          // [auth/invalid-credential]

          showAlert(
            'The supplied auth credential is incorrect, malformed or has expired.'
          );

          console.error(error);
          return false;
        })
    );
  }

  const logout = async () => {
    await auth().signOut();
    dispatch(resetTodoData());
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const value: AuthContextType = useMemo(() => {
    return {
      initializing,
      user,
      setUser,
      login,
      register,
      logout,
    };
  }, [user, setUser]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
