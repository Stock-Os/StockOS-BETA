import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useUserData } from '../contexts/UserDataContext';

// Import onboarding screens (implemented)
import { Question1Screen } from '../screens/onboarding/Question1Screen'; // Name
import { Question2Screen } from '../screens/onboarding/Question2Screen'; // Gender
import { Question3Screen } from '../screens/onboarding/Question3Screen'; // Age
import { Question4Screen } from '../screens/onboarding/Question4Screen'; // Height
import { Question5Screen } from '../screens/onboarding/Question5Screen'; // Current Weight
import { Question6Screen } from '../screens/onboarding/Question6Screen'; // Target Weight
import { Question7Screen } from '../screens/onboarding/Question7Screen'; // Fitness Goal
import { Question8Screen } from '../screens/onboarding/Question8Screen'; // Activity Level
import { Question9Screen } from '../screens/onboarding/Question9Screen'; // Body Fat %
import { Question10Screen } from '../screens/onboarding/Question10Screen'; // Injuries
import { Question11Screen } from '../screens/onboarding/Question11Screen'; // Workout Days per Week
import { Question12Screen } from '../screens/onboarding/Question12Screen'; // Workout Duration
import { Question13Screen } from '../screens/onboarding/Question13Screen'; // Training Types
import { Question14Screen } from '../screens/onboarding/Question14Screen'; // Training Location
import { Question15Screen } from '../screens/onboarding/Question15Screen'; // Equipment
import { Question16Screen } from '../screens/onboarding/Question16Screen'; // Rest Days
import { Question17Screen } from '../screens/onboarding/Question17Screen'; // Meals
import { Question18Screen } from '../screens/onboarding/Question18Screen'; // Cooking Time
import { Question19Screen } from '../screens/onboarding/Question19Screen'; // Allergies
import { Question20Screen } from '../screens/onboarding/Question20Screen'; // Sleep Hours
import { Question21Screen } from '../screens/onboarding/Question21Screen'; // Stress Level
import { Question22Screen } from '../screens/onboarding/Question22Screen'; // Mobility Level
import { Question23Screen } from '../screens/onboarding/Question23Screen'; // Dietary Restrictions
import { Question24Screen } from '../screens/onboarding/Question24Screen'; // Water Intake
import { Question25Screen } from '../screens/onboarding/Question25Screen'; // Alcohol Consumption
import { Question26Screen } from '../screens/onboarding/Question26Screen'; // Final Generation

// Placeholder component for missing questions
const PlaceholderScreen = () => null;

import { OnboardingStackParamList } from '../types';

const Stack = createStackNavigator<OnboardingStackParamList>();

export const OnboardingNavigator: React.FC = () => {
  const { state } = useUserData();
  
  // Determine initial route based on current step
  const getInitialRouteName = () => {
    return `Question${state.currentStep}` as keyof OnboardingStackParamList;
  };

  return (
    <Stack.Navigator 
      initialRouteName={getInitialRouteName()}
      screenOptions={{ 
        headerShown: false,
        gestureEnabled: false, // Prevent going back
      }}
    >
      <Stack.Screen name="Question1" component={Question1Screen} />
      <Stack.Screen name="Question2" component={Question2Screen} />
      <Stack.Screen name="Question3" component={Question3Screen} />
      <Stack.Screen name="Question4" component={Question4Screen} />
      <Stack.Screen name="Question5" component={Question5Screen} />
      <Stack.Screen name="Question6" component={Question6Screen} />
      <Stack.Screen name="Question7" component={Question7Screen} />
      <Stack.Screen name="Question8" component={Question8Screen} />
      <Stack.Screen name="Question9" component={Question9Screen} />
      <Stack.Screen name="Question10" component={Question10Screen} />
      <Stack.Screen name="Question11" component={Question11Screen} />
      <Stack.Screen name="Question12" component={Question12Screen} />
      <Stack.Screen name="Question13" component={Question13Screen} />
      <Stack.Screen name="Question14" component={Question14Screen} />
      <Stack.Screen name="Question15" component={Question15Screen} />
      <Stack.Screen name="Question16" component={Question16Screen} />
      <Stack.Screen name="Question17" component={Question17Screen} />
      <Stack.Screen name="Question18" component={Question18Screen} />
      <Stack.Screen name="Question19" component={Question19Screen} />
      <Stack.Screen name="Question20" component={Question20Screen} />
      <Stack.Screen name="Question21" component={Question21Screen} />
      <Stack.Screen name="Question22" component={Question22Screen} />
      <Stack.Screen name="Question23" component={Question23Screen} />
      <Stack.Screen name="Question24" component={Question24Screen} />
      <Stack.Screen name="Question25" component={Question25Screen} />
      <Stack.Screen name="Question26" component={Question26Screen} />
    </Stack.Navigator>
  );
};