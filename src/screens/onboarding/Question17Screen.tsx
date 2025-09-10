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

type Question17ScreenNavigationProp = StackNavigationProp<OnboardingStackParamList, 'Question17'>;

interface Question17ScreenProps {
  navigation: Question17ScreenNavigationProp;
}

export const Question17Screen: React.FC<Question17ScreenProps> = ({ navigation }) => {
  const { theme } = useTheme();
  const { updateOnboardingData } = useUserData();
  
  const [selectedMeals, setSelectedMeals] = useState<number>(3);

  const mealOptions = [
    { 
      value: 2, 
      label: '2 repas par jour', 
      emoji: '🍽️', 
      description: 'Jeûne intermittent 16:8',
      examples: 'Déjeuner + Dîner'
    },
    { 
      value: 3, 
      label: '3 repas par jour', 
      emoji: '🍽️🍽️🍽️', 
      description: 'Rythme classique',
      examples: 'Petit-déjeuner + Déjeuner + Dîner'
    },
    { 
      value: 4, 
      label: '4 repas par jour', 
      emoji: '🍽️+', 
      description: 'Avec une collation',
      examples: '3 repas + 1 collation'
    },
    { 
      value: 5, 
      label: '5 repas par jour', 
      emoji: '🍽️++', 
      description: 'Fréquence élevée',
      examples: '3 repas + 2 collations'
    },
    { 
      value: 6, 
      label: '6 repas par jour', 
      emoji: '🍽️+++', 
      description: 'Très fréquent',
      examples: '3 repas + 3 collations'
    },
  ];

  const snackPreferences = [
    { id: 'healthy', label: 'Collations saines uniquement', emoji: '🥕', description: 'Fruits, noix, yaourt...' },
    { id: 'mixed', label: 'Mélange sain/plaisir', emoji: '⚖️', description: 'Équilibre entre les deux' },
    { id: 'flexible', label: 'Pas de restriction', emoji: '🍪', description: 'Toutes sortes de collations' },
  ];

  const [selectedSnackPref, setSelectedSnackPref] = useState<string>('healthy');

  const handleNext = () => {
    updateOnboardingData({ 
      mealsPerDay: selectedMeals,
      snackPreferences: selectedSnackPref
    });
    navigation.navigate('Question18');
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
                    width: `${(17/26) * 100}%` 
                  }
                ]} 
              />
            </View>
            <Text style={[styles.progressText, { color: theme.colors.text.light }]}>
              17 / 26
            </Text>
          </View>
        </View>

        <View style={styles.content}>
          <Text style={[styles.title, { color: theme.colors.text.primary }]}>
            Combien de repas par jour pensez-vous pouvoir consommer ?
          </Text>
          
          <Text style={[styles.subtitle, { color: theme.colors.text.secondary }]}>
            Choisissez le rythme alimentaire qui correspond à votre mode de vie
          </Text>

          <View style={styles.optionsContainer}>
            {mealOptions.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.option,
                  {
                    borderColor: selectedMeals === option.value ? theme.colors.primary : theme.colors.neutral[300],
                    backgroundColor: selectedMeals === option.value ? theme.colors.primary + '10' : theme.colors.surface,
                  }
                ]}
                onPress={() => setSelectedMeals(option.value)}
              >
                <View style={styles.optionHeader}>
                  <Text style={styles.emoji}>{option.emoji}</Text>
                  <View style={styles.optionContent}>
                    <Text style={[
                      styles.optionTitle,
                      {
                        color: selectedMeals === option.value ? theme.colors.primary : theme.colors.text.primary,
                        fontWeight: selectedMeals === option.value ? '600' : '500',
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
                  {selectedMeals === option.value && (
                    <Text style={[styles.checkmark, { color: theme.colors.primary }]}>✓</Text>
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {selectedMeals > 3 && (
            <>
              <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
                Quel type de collations préférez-vous ?
              </Text>

              <View style={styles.snackContainer}>
                {snackPreferences.map((pref) => (
                  <TouchableOpacity
                    key={pref.id}
                    style={[
                      styles.snackOption,
                      {
                        borderColor: selectedSnackPref === pref.id ? theme.colors.primary : theme.colors.neutral[300],
                        backgroundColor: selectedSnackPref === pref.id ? theme.colors.primary + '10' : theme.colors.surface,
                      }
                    ]}
                    onPress={() => setSelectedSnackPref(pref.id)}
                  >
                    <View style={styles.optionHeader}>
                      <Text style={styles.emoji}>{pref.emoji}</Text>
                      <View style={styles.optionContent}>
                        <Text style={[
                          styles.snackTitle,
                          {
                            color: selectedSnackPref === pref.id ? theme.colors.primary : theme.colors.text.primary,
                            fontWeight: selectedSnackPref === pref.id ? '600' : '500',
                          }
                        ]}>
                          {pref.label}
                        </Text>
                        <Text style={[styles.optionDescription, { color: theme.colors.text.light }]}>
                          {pref.description}
                        </Text>
                      </View>
                      {selectedSnackPref === pref.id && (
                        <Text style={[styles.checkmark, { color: theme.colors.primary }]}>✓</Text>
                      )}
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </>
          )}
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
  snackContainer: {
    gap: 12,
  },
  snackOption: {
    padding: 14,
    borderWidth: 2,
    borderRadius: 12,
  },
  snackTitle: {
    fontSize: 15,
    fontWeight: '500',
  },
  footer: {
    paddingTop: 20,
  },
});