import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTheme } from '../../contexts/ThemeContext';
import { useUserData } from '../../contexts/UserDataContext';
import { Button } from '../../components/ui/Button';
import { TextInput } from '../../components/ui/TextInput';
import { OnboardingStackParamList } from '../../types';

type Question1ScreenNavigationProp = StackNavigationProp<OnboardingStackParamList, 'Question1'>;

interface Question1ScreenProps {
  navigation: Question1ScreenNavigationProp;
}

export const Question1Screen: React.FC<Question1ScreenProps> = ({ navigation }) => {
  const { theme } = useTheme();
  const { updateOnboardingData } = useUserData();
  
  const [firstName, setFirstName] = useState('');
  const [error, setError] = useState('');

  const handleNext = () => {
    if (!firstName.trim()) {
      setError('Votre prénom est requis');
      return;
    }
    
    if (firstName.trim().length < 2) {
      setError('Votre prénom doit contenir au moins 2 caractères');
      return;
    }

    updateOnboardingData({ firstName: firstName.trim() });
    navigation.navigate('Question2');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <View style={styles.progressContainer}>
              <View style={[styles.progressBar, { backgroundColor: theme.colors.neutral[200] }]}>
                <View 
                  style={[
                    styles.progress, 
                    { 
                      backgroundColor: theme.colors.primary,
                      width: `${(1/26) * 100}%` 
                    }
                  ]} 
                />
              </View>
              <Text style={[styles.progressText, { color: theme.colors.text.light }]}>
                1 / 26
              </Text>
            </View>
          </View>

          <View style={styles.content}>
            <Text style={[styles.title, { color: theme.colors.text.primary }]}>
              Comment vous appelez-vous ?
            </Text>
            
            <Text style={[styles.subtitle, { color: theme.colors.text.secondary }]}>
              Nous aimerions personnaliser votre expérience Stock OS
            </Text>

            <TextInput
              label="Prénom"
              placeholder="Votre prénom"
              value={firstName}
              onChangeText={(text) => {
                setFirstName(text);
                if (error) setError('');
              }}
              error={error}
              autoCapitalize="words"
              autoCorrect={false}
              autoFocus
              containerStyle={styles.input}
            />
          </View>

          <View style={styles.footer}>
            <Button
              title="Continuer"
              onPress={handleNext}
              fullWidth
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 32,
  },
  header: {
    marginBottom: 40,
  },
  progressContainer: {
    alignItems: 'center',
  },
  progressBar: {
    width: '100%',
    height: 4,
    borderRadius: 2,
    marginBottom: 12,
  },
  progress: {
    height: '100%',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 14,
    fontWeight: '500',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 36,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
  },
  input: {
    marginBottom: 0,
  },
  footer: {
    paddingTop: 20,
  },
});