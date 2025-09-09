import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, AuthState } from '../types';

interface AuthContextType {
  state: AuthState;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithApple: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

type AuthAction =
  | { type: 'RESTORE_TOKEN'; user: User | null }
  | { type: 'SIGN_IN'; user: User }
  | { type: 'SIGN_OUT' }
  | { type: 'SET_LOADING'; isLoading: boolean };

const authReducer = (prevState: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'RESTORE_TOKEN':
      return {
        ...prevState,
        user: action.user,
        isLoading: false,
        isAuthenticated: !!action.user,
      };
    case 'SIGN_IN':
      return {
        ...prevState,
        user: action.user,
        isLoading: false,
        isAuthenticated: true,
      };
    case 'SIGN_OUT':
      return {
        ...prevState,
        user: null,
        isLoading: false,
        isAuthenticated: false,
      };
    case 'SET_LOADING':
      return {
        ...prevState,
        isLoading: action.isLoading,
      };
  }
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isLoading: true,
    isAuthenticated: false,
  });

  useEffect(() => {
    const bootstrapAsync = async () => {
      let user: User | null = null;

      try {
        const userToken = await AsyncStorage.getItem('userToken');
        const userData = await AsyncStorage.getItem('userData');
        
        if (userToken && userData) {
          user = JSON.parse(userData);
        }
      } catch (error) {
        console.error('Restoring token failed:', error);
      }

      dispatch({ type: 'RESTORE_TOKEN', user });
    };

    bootstrapAsync();
  }, []);

  const signIn = async (email: string, password: string) => {
    dispatch({ type: 'SET_LOADING', isLoading: true });
    
    try {
      // Mock authentication - replace with real API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const user: User = {
        id: '1',
        email,
        name: 'Demo User',
        createdAt: new Date().toISOString(),
        isPremium: false,
      };

      await AsyncStorage.setItem('userToken', 'mock-token');
      await AsyncStorage.setItem('userData', JSON.stringify(user));
      
      dispatch({ type: 'SIGN_IN', user });
    } catch (error) {
      dispatch({ type: 'SET_LOADING', isLoading: false });
      throw error;
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    dispatch({ type: 'SET_LOADING', isLoading: true });
    
    try {
      // Mock registration - replace with real API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const user: User = {
        id: '1',
        email,
        name,
        createdAt: new Date().toISOString(),
        isPremium: false,
      };

      await AsyncStorage.setItem('userToken', 'mock-token');
      await AsyncStorage.setItem('userData', JSON.stringify(user));
      
      dispatch({ type: 'SIGN_IN', user });
    } catch (error) {
      dispatch({ type: 'SET_LOADING', isLoading: false });
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('userData');
      await AsyncStorage.removeItem('onboardingData');
      
      dispatch({ type: 'SIGN_OUT' });
    } catch (error) {
      console.error('Sign out failed:', error);
    }
  };

  const signInWithGoogle = async () => {
    // Implement Google Sign-In
    throw new Error('Google Sign-In not implemented');
  };

  const signInWithApple = async () => {
    // Implement Apple Sign-In
    throw new Error('Apple Sign-In not implemented');
  };

  return (
    <AuthContext.Provider
      value={{
        state,
        signIn,
        signUp,
        signOut,
        signInWithGoogle,
        signInWithApple,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};