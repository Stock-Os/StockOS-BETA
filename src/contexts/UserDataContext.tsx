import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { OnboardingData } from '../types';

interface UserDataState {
  onboardingData: Partial<OnboardingData> | null;
  isOnboardingComplete: boolean;
  currentStep: number;
}

interface UserDataContextType {
  state: UserDataState;
  updateOnboardingData: (data: Partial<OnboardingData>) => Promise<void>;
  completeOnboarding: () => Promise<void>;
  resetOnboarding: () => Promise<void>;
  setCurrentStep: (step: number) => void;
}

const UserDataContext = createContext<UserDataContextType | undefined>(undefined);

export const useUserData = () => {
  const context = useContext(UserDataContext);
  if (!context) {
    throw new Error('useUserData must be used within a UserDataProvider');
  }
  return context;
};

type UserDataAction =
  | { type: 'RESTORE_DATA'; data: Partial<OnboardingData> | null; isComplete: boolean; step: number }
  | { type: 'UPDATE_DATA'; data: Partial<OnboardingData> }
  | { type: 'COMPLETE_ONBOARDING' }
  | { type: 'RESET_ONBOARDING' }
  | { type: 'SET_CURRENT_STEP'; step: number };

const userDataReducer = (prevState: UserDataState, action: UserDataAction): UserDataState => {
  switch (action.type) {
    case 'RESTORE_DATA':
      return {
        onboardingData: action.data,
        isOnboardingComplete: action.isComplete,
        currentStep: action.step,
      };
    case 'UPDATE_DATA':
      return {
        ...prevState,
        onboardingData: {
          ...prevState.onboardingData,
          ...action.data,
        },
      };
    case 'COMPLETE_ONBOARDING':
      return {
        ...prevState,
        isOnboardingComplete: true,
        currentStep: 26,
      };
    case 'RESET_ONBOARDING':
      return {
        onboardingData: null,
        isOnboardingComplete: false,
        currentStep: 1,
      };
    case 'SET_CURRENT_STEP':
      return {
        ...prevState,
        currentStep: action.step,
      };
  }
};

interface UserDataProviderProps {
  children: ReactNode;
}

export const UserDataProvider: React.FC<UserDataProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(userDataReducer, {
    onboardingData: null,
    isOnboardingComplete: false,
    currentStep: 1,
  });

  useEffect(() => {
    const restoreUserData = async () => {
      try {
        const onboardingDataStr = await AsyncStorage.getItem('onboardingData');
        const isCompleteStr = await AsyncStorage.getItem('isOnboardingComplete');
        const currentStepStr = await AsyncStorage.getItem('currentOnboardingStep');
        
        const onboardingData = onboardingDataStr ? JSON.parse(onboardingDataStr) : null;
        const isComplete = isCompleteStr === 'true';
        const step = currentStepStr ? parseInt(currentStepStr, 10) : 1;
        
        dispatch({
          type: 'RESTORE_DATA',
          data: onboardingData,
          isComplete,
          step,
        });
      } catch (error) {
        console.error('Failed to restore user data:', error);
      }
    };

    restoreUserData();
  }, []);

  const updateOnboardingData = async (data: Partial<OnboardingData>) => {
    try {
      const updatedData = {
        ...state.onboardingData,
        ...data,
      };
      
      await AsyncStorage.setItem('onboardingData', JSON.stringify(updatedData));
      dispatch({ type: 'UPDATE_DATA', data });
    } catch (error) {
      console.error('Failed to update onboarding data:', error);
      throw error;
    }
  };

  const completeOnboarding = async () => {
    try {
      await AsyncStorage.setItem('isOnboardingComplete', 'true');
      await AsyncStorage.setItem('currentOnboardingStep', '26');
      dispatch({ type: 'COMPLETE_ONBOARDING' });
    } catch (error) {
      console.error('Failed to complete onboarding:', error);
      throw error;
    }
  };

  const resetOnboarding = async () => {
    try {
      await AsyncStorage.removeItem('onboardingData');
      await AsyncStorage.removeItem('isOnboardingComplete');
      await AsyncStorage.removeItem('currentOnboardingStep');
      dispatch({ type: 'RESET_ONBOARDING' });
    } catch (error) {
      console.error('Failed to reset onboarding:', error);
      throw error;
    }
  };

  const setCurrentStep = async (step: number) => {
    try {
      await AsyncStorage.setItem('currentOnboardingStep', step.toString());
      dispatch({ type: 'SET_CURRENT_STEP', step });
    } catch (error) {
      console.error('Failed to set current step:', error);
    }
  };

  return (
    <UserDataContext.Provider
      value={{
        state,
        updateOnboardingData,
        completeOnboarding,
        resetOnboarding,
        setCurrentStep,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
};