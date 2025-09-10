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
import { BodyFatSelector } from '../../components/ui/BodyFatSelector';
import { OnboardingStackParamList, BodyFatLevel } from '../../types';

type Question9ScreenNavigationProp = StackNavigationProp<OnboardingStackParamList, 'Question9'>;

interface Question9ScreenProps {
  navigation: Question9ScreenNavigationProp;
}

export const Question9Screen: React.FC<Question9ScreenProps> = ({ navigation }) => {
  const { theme } = useTheme();
  const { updateOnboardingData, onboardingData } = useUserData();
  
  const [selectedBodyFat, setSelectedBodyFat] = useState<BodyFatLevel>('normal');

  const getBodyFatPercentage = (level: BodyFatLevel): number => {
    const mappings: Record<BodyFatLevel, number> = {
      'very_low': 4,
      'low': 6,
      'normal': 10,
      'high': 15,
      'very_high': 20,
      'obese': 27,
      'extremely_obese_1': 32,
      'extremely_obese_2': 37,
      'extremely_obese_3': 42,
    };
    return mappings[level];
  };

  const handleNext = () => {
    updateOnboardingData({ bodyFatPercentage: getBodyFatPercentage(selectedBodyFat) });
    navigation.navigate('Question10');
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
                    width: `${(9/26) * 100}%` 
                  }
                ]} 
              />
            </View>
            <Text style={[styles.progressText, { color: theme.colors.text.light }]}>
              9 / 26
            </Text>
          </View>
        </View>

        <View style={styles.content}>
          <Text style={[styles.title, { color: theme.colors.text.primary }]}>
            Estimez votre pourcentage de masse grasse
          </Text>
          
          <Text style={[styles.subtitle, { color: theme.colors.text.secondary }]}>
            Sélectionnez l'image qui correspond le mieux à votre physique actuel
          </Text>

          <View style={styles.selectorContainer}>
            <BodyFatSelector
              gender={onboardingData?.gender || 'male'}
              selectedLevel={selectedBodyFat}
              onLevelChange={setSelectedBodyFat}
            />
          </View>

          <View style={styles.infoContainer}>
            <Text style={[styles.infoText, { color: theme.colors.text.secondary }]}>
              Pourcentage sélectionné: {getBodyFatPercentage(selectedBodyFat)}%
            </Text>
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
  },
  infoContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  infoText: {
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    paddingTop: 20,
  },
});