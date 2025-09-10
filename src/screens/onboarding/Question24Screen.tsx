import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTheme } from '../../contexts/ThemeContext';
import { useUserData } from '../../contexts/UserDataContext';
import { Button } from '../../components/ui/Button';
import { BackButton } from '../../components/ui/BackButton';
import { OnboardingStackParamList } from '../../types';

type Question24ScreenNavigationProp = StackNavigationProp<OnboardingStackParamList, 'Question24'>;

interface Question24ScreenProps {
  navigation: Question24ScreenNavigationProp;
}

export const Question24Screen: React.FC<Question24ScreenProps> = ({ navigation }) => {
  const { theme } = useTheme();
  const { updateOnboardingData } = useUserData();
  
  const [selectedWaterIntake, setSelectedWaterIntake] = useState<string>('');

  const waterOptions = [
    { id: 'less_than_1', label: 'Moins de 1L', description: 'Hydratation insuffisante' },
    { id: '1_to_1_5', label: '1-1,5L', description: 'Hydratation faible' },
    { id: '1_5_to_2', label: '1,5-2L', description: 'Hydratation correcte' },
    { id: '2_to_2_5', label: '2-2,5L', description: 'Bonne hydratation' },
    { id: '2_5_to_3', label: '2,5-3L', description: 'Très bonne hydratation' },
    { id: 'more_than_3', label: 'Plus de 3L', description: 'Hydratation excellente' },
  ];

  const handleNext = () => {
    if (!selectedWaterIntake) return;
    
    updateOnboardingData({ waterIntake: selectedWaterIntake });
    navigation.navigate('Question25');
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <BackButton onPress={handleBack} />
          <View style={styles.progressContainer}>
            <View style={[styles.progressBar, { backgroundColor: theme.colors.neutral[200] }]}>
              <View 
                style={[
                  styles.progress, 
                  { 
                    backgroundColor: theme.colors.primary,
                    width: `${(24/26) * 100}%` 
                  }
                ]} 
              />
            </View>
            <Text style={[styles.progressText, { color: theme.colors.text.light }]}>
              24 / 26
            </Text>
          </View>
        </View>

        <View style={styles.content}>
          <Text style={[styles.title, { color: theme.colors.text.primary }]}>
            Combien de litres d'eau buvez-vous par jour ?
          </Text>
          
          <Text style={[styles.subtitle, { color: theme.colors.text.secondary }]}>
            L'hydratation est essentielle pour vos performances et votre santé
          </Text>

          <View style={styles.optionsContainer}>
            {waterOptions.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.option,
                  {
                    borderColor: selectedWaterIntake === option.id ? theme.colors.primary : theme.colors.neutral[300],
                    backgroundColor: selectedWaterIntake === option.id ? theme.colors.primary + '10' : theme.colors.surface,
                  }
                ]}
                onPress={() => setSelectedWaterIntake(option.id)}
              >
                <View style={styles.optionContent}>
                  <Text style={[
                    styles.optionLabel,
                    {
                      color: selectedWaterIntake === option.id ? theme.colors.primary : theme.colors.text.primary,
                      fontWeight: selectedWaterIntake === option.id ? '600' : '500',
                    }
                  ]}>
                    {option.label}
                  </Text>
                  <Text style={[styles.optionDescription, { color: theme.colors.text.light }]}>
                    {option.description}
                  </Text>
                </View>
                {selectedWaterIntake === option.id && (
                  <Text style={[styles.checkmark, { color: theme.colors.primary }]}>✓</Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.footer}>
          <Button
            title="Continuer"
            onPress={handleNext}
            disabled={!selectedWaterIntake}
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
    marginTop: 20,
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
  optionsContainer: {
    gap: 12,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderWidth: 2,
    borderRadius: 12,
  },
  optionContent: {
    flex: 1,
  },
  optionLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
  },
  optionDescription: {
    fontSize: 14,
  },
  checkmark: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  footer: {
    paddingTop: 20,
  },
});