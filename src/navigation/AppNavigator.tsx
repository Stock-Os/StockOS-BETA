import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../contexts/AuthContext';
import { useUserData } from '../contexts/UserDataContext';
import { AuthNavigator } from './AuthNavigator';
import { OnboardingNavigator } from './OnboardingNavigator';
import { MainNavigator } from './MainNavigator';
import { RootStackParamList } from '../types';

const Stack = createStackNavigator<RootStackParamList>();

const LoadingScreen: React.FC = () => {
  const { signOut } = useAuth();
  const { resetOnboarding } = useUserData();

  console.log('LoadingScreen: Rendering...');
  
  const handleDebugReset = async () => {
    console.log('DEBUG: Forcing logout and reset');
    try {
      await signOut();
      await resetOnboarding();
    } catch (error) {
      console.error('Debug reset failed:', error);
    }
  };

  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#007AFF" />
      <Text style={styles.loadingText}>Stock OS</Text>
      <Text style={styles.versionText}>v1.1.8</Text>
      <Text style={styles.debugText}>Chargement en cours...</Text>
      
      <TouchableOpacity 
        style={styles.debugButton}
        onPress={handleDebugReset}
      >
        <Text style={styles.debugButtonText}>🔄 DEBUG: Reset & Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export const AppNavigator: React.FC = () => {
  const { state: authState } = useAuth();
  const { state: userDataState } = useUserData();

  console.log('=== AppNavigator DEBUG ===');
  console.log('AppNavigator: authState.isLoading:', authState.isLoading);
  console.log('AppNavigator: authState.isAuthenticated:', authState.isAuthenticated);
  console.log('AppNavigator: authState.user:', authState.user?.email || 'null');
  console.log('AppNavigator: userDataState.isOnboardingComplete:', userDataState.isOnboardingComplete);
  console.log('AppNavigator: userDataState.currentStep:', userDataState.currentStep);
  console.log('=========================');

  if (authState.isLoading) {
    console.log('AppNavigator: Showing LoadingScreen');
    return <LoadingScreen />;
  }

  if (!authState.isAuthenticated) {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Auth" component={AuthNavigator} />
      </Stack.Navigator>
    );
  }

  if (!userDataState.isOnboardingComplete) {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Onboarding" component={OnboardingNavigator} />
      </Stack.Navigator>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={MainNavigator} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
  },
  versionText: {
    color: '#888888',
    fontSize: 16,
    marginTop: 5,
  },
  debugText: {
    color: '#FFFFFF',
    fontSize: 14,
    marginTop: 10,
    textAlign: 'center',
  },
  debugButton: {
    marginTop: 30,
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#FF4444',
    borderRadius: 8,
  },
  debugButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});