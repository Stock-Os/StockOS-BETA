import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTheme } from '../../contexts/ThemeContext';
import { useUserData } from '../../contexts/UserDataContext';
import { Button } from '../../components/ui/Button';
import { InjurySelector, BodyMuscle } from '../../components/ui/InjurySelector';
import { OnboardingStackParamList } from '../../types';

type Question10ScreenNavigationProp = StackNavigationProp<OnboardingStackParamList, 'Question10'>;

interface Question10ScreenProps {
  navigation: Question10ScreenNavigationProp;
}

export const Question10Screen: React.FC<Question10ScreenProps> = ({ navigation }) => {
  const { theme } = useTheme();
  const { updateOnboardingData, state } = useUserData();
  
  const [selectedMuscles, setSelectedMuscles] = useState<BodyMuscle[]>([]);

  const handleNext = () => {
    updateOnboardingData({ injuries: selectedMuscles });
    navigation.navigate('Question11');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <View style={styles.progressContainer}>
            <View style={[styles.progressBar, { backgroundColor: theme.colors.neutral[200] }]}>
              <View 
                style={[
                  styles.progress, 
                  { 
                    backgroundColor: theme.colors.primary,
                    width: `${(10/26) * 100}%` 
                  }
                ]} 
              />
            </View>
            <Text style={[styles.progressText, { color: theme.colors.text.light }]}>
              10 / 26
            </Text>
          </View>
        </View>

        <View style={styles.content}>
          <Text style={[styles.title, { color: theme.colors.text.primary }]}>
            Avez-vous des blessures ?
          </Text>
          
          <Text style={[styles.subtitle, { color: theme.colors.text.secondary }]}>
            Touchez les zones concernées pour que nous adaptions votre programme
          </Text>

          <View style={styles.selectorContainer}>
            <InjurySelector
              selectedMuscles={selectedMuscles}
              onMuscleToggle={(muscle) => {
                if (selectedMuscles.includes(muscle)) {
                  setSelectedMuscles(selectedMuscles.filter(m => m !== muscle));
                } else {
                  setSelectedMuscles([...selectedMuscles, muscle]);
                }
              }}
              gender={state.onboardingData?.gender === 'female' ? 'female' : 'male'}
            />
          </View>
        </View>

        <View style={styles.footer}>
          <Button
            title="Continuer"
            onPress={handleNext}
            fullWidth
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
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
    marginBottom: 32,
  },
  selectorContainer: {
    flex: 1,
    minHeight: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedContainer: {
    marginTop: 20,
    padding: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(254, 129, 76, 0.1)',
  },
  selectedTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  selectedList: {
    fontSize: 14,
  },
  footer: {
    paddingTop: 20,
  },
});