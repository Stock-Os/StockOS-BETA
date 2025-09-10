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

type Question18ScreenNavigationProp = StackNavigationProp<OnboardingStackParamList, 'Question18'>;

interface Question18ScreenProps {
  navigation: Question18ScreenNavigationProp;
}

export const Question18Screen: React.FC<Question18ScreenProps> = ({ navigation }) => {
  const { theme } = useTheme();
  const { updateOnboardingData } = useUserData();
  
  const [selectedTime, setSelectedTime] = useState<string>('30min');

  const cookingTimes = [
    { 
      id: '15min', 
      label: '15 minutes ou moins', 
      emoji: '⚡', 
      description: 'Repas ultra-rapides',
      examples: 'Salade, sandwich, smoothie'
    },
    { 
      id: '30min', 
      label: '30 minutes', 
      emoji: '🍳', 
      description: 'Préparation standard',
      examples: 'Pâtes, omelette, sauté de légumes'
    },
    { 
      id: '45min', 
      label: '45 minutes', 
      emoji: '👨‍🍳', 
      description: 'Cuisine élaborée',
      examples: 'Risotto, plat mijoté, cuisson au four'
    },
    { 
      id: '1h', 
      label: '1 heure', 
      emoji: '🥘', 
      description: 'Plats complexes',
      examples: 'Ragoût, rôti, plat traditionnel'
    },
    { 
      id: '1h+', 
      label: '1 heure et plus', 
      emoji: '👑', 
      description: 'Grande cuisine',
      examples: 'Plats gastronomiques, meal prep'
    },
    { 
      id: 'no_cook', 
      label: 'Pas de cuisine', 
      emoji: '🥗', 
      description: 'Aliments prêts',
      examples: 'Salade, fruits, yaourt, plats préparés'
    },
  ];

  const mealPrepOptions = [
    { id: 'daily', label: 'Cuisine chaque jour', emoji: '📅', description: 'Repas frais quotidiens' },
    { id: 'batch', label: 'Meal prep hebdomadaire', emoji: '📦', description: 'Préparation en lot' },
    { id: 'mixed', label: 'Mixte', emoji: '🔄', description: 'Selon les jours' },
  ];

  const [selectedMealPrep, setSelectedMealPrep] = useState<string>('daily');

  const handleNext = () => {
    updateOnboardingData({ 
      cookingTime: selectedTime,
      mealPrepStyle: selectedMealPrep
    });
    navigation.navigate('Question19');
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
                    width: `${(18/26) * 100}%` 
                  }
                ]} 
              />
            </View>
            <Text style={[styles.progressText, { color: theme.colors.text.light }]}>
              18 / 26
            </Text>
          </View>
        </View>

        <View style={styles.content}>
          <Text style={[styles.title, { color: theme.colors.text.primary }]}>
            Combien de temps pouvez-vous consacrer à la cuisine ?
          </Text>
          
          <Text style={[styles.subtitle, { color: theme.colors.text.secondary }]}>
            Sélectionnez le temps que vous êtes prêt à passer en cuisine par repas
          </Text>

          <View style={styles.optionsContainer}>
            {cookingTimes.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.option,
                  {
                    borderColor: selectedTime === option.id ? theme.colors.primary : theme.colors.neutral[300],
                    backgroundColor: selectedTime === option.id ? theme.colors.primary + '10' : theme.colors.surface,
                  }
                ]}
                onPress={() => setSelectedTime(option.id)}
              >
                <View style={styles.optionHeader}>
                  <Text style={styles.emoji}>{option.emoji}</Text>
                  <View style={styles.optionContent}>
                    <Text style={[
                      styles.optionTitle,
                      {
                        color: selectedTime === option.id ? theme.colors.primary : theme.colors.text.primary,
                        fontWeight: selectedTime === option.id ? '600' : '500',
                      }
                    ]}>
                      {option.label}
                    </Text>
                    <Text style={[styles.optionDescription, { color: theme.colors.text.light }]}>
                      {option.description}
                    </Text>
                    <Text style={[styles.optionExamples, { color: theme.colors.text.secondary }]}>
                      {option.examples}
                    </Text>
                  </View>
                  {selectedTime === option.id && (
                    <Text style={[styles.checkmark, { color: theme.colors.primary }]}>✓</Text>
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
            Préférez-vous cuisiner ?
          </Text>

          <View style={styles.mealPrepContainer}>
            {mealPrepOptions.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.mealPrepOption,
                  {
                    borderColor: selectedMealPrep === option.id ? theme.colors.primary : theme.colors.neutral[300],
                    backgroundColor: selectedMealPrep === option.id ? theme.colors.primary + '10' : theme.colors.surface,
                  }
                ]}
                onPress={() => setSelectedMealPrep(option.id)}
              >
                <View style={styles.optionHeader}>
                  <Text style={styles.emoji}>{option.emoji}</Text>
                  <View style={styles.optionContent}>
                    <Text style={[
                      styles.mealPrepTitle,
                      {
                        color: selectedMealPrep === option.id ? theme.colors.primary : theme.colors.text.primary,
                        fontWeight: selectedMealPrep === option.id ? '600' : '500',
                      }
                    ]}>
                      {option.label}
                    </Text>
                    <Text style={[styles.optionDescription, { color: theme.colors.text.light }]}>
                      {option.description}
                    </Text>
                  </View>
                  {selectedMealPrep === option.id && (
                    <Text style={[styles.checkmark, { color: theme.colors.primary }]}>✓</Text>
                  )}
                </View>
              </TouchableOpacity>
            ))}
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
    marginBottom: 32,
  },
  option: {
    padding: 16,
    borderWidth: 2,
    borderRadius: 12,
  },
  optionHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  emoji: {
    fontSize: 24,
    minWidth: 30,
    textAlign: 'center',
    marginTop: 2,
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  optionDescription: {
    fontSize: 14,
    marginTop: 2,
  },
  optionExamples: {
    fontSize: 12,
    marginTop: 4,
    fontStyle: 'italic',
  },
  checkmark: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
  },
  mealPrepContainer: {
    gap: 12,
  },
  mealPrepOption: {
    padding: 14,
    borderWidth: 2,
    borderRadius: 12,
  },
  mealPrepTitle: {
    fontSize: 15,
    fontWeight: '500',
  },
  footer: {
    paddingTop: 20,
  },
});