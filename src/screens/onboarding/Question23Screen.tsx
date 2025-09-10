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

type Question23ScreenNavigationProp = StackNavigationProp<OnboardingStackParamList, 'Question23'>;

interface Question23ScreenProps {
  navigation: Question23ScreenNavigationProp;
}

export const Question23Screen: React.FC<Question23ScreenProps> = ({ navigation }) => {
  const { theme } = useTheme();
  const { updateOnboardingData } = useUserData();
  
  const [selectedDietaryRestrictions, setSelectedDietaryRestrictions] = useState<string>('');

  const dietaryOptions = [
    { id: 'none', label: 'Aucune restriction', description: 'Je mange de tout' },
    { id: 'vegetarian', label: 'Végétarien', description: 'Pas de viande ni poisson' },
    { id: 'vegan', label: 'Végétalien', description: 'Aucun produit animal' },
    { id: 'halal', label: 'Halal', description: 'Alimentation halal' },
    { id: 'kosher', label: 'Casher', description: 'Alimentation casher' },
    { id: 'low_carb', label: 'Pauvre en glucides', description: 'Régime low-carb' },
    { id: 'keto', label: 'Cétogène', description: 'Régime kéto' },
    { id: 'other', label: 'Autre', description: 'Autres restrictions' },
  ];

  const handleNext = () => {
    if (!selectedDietaryRestrictions) return;
    
    updateOnboardingData({ dietaryRestrictions: selectedDietaryRestrictions });
    navigation.navigate('Question24');
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
                    width: `${(23/26) * 100}%` 
                  }
                ]} 
              />
            </View>
            <Text style={[styles.progressText, { color: theme.colors.text.light }]}>
              23 / 26
            </Text>
          </View>
        </View>

        <View style={styles.content}>
          <Text style={[styles.title, { color: theme.colors.text.primary }]}>
            Avez-vous des restrictions alimentaires particulières ?
          </Text>
          
          <Text style={[styles.subtitle, { color: theme.colors.text.secondary }]}>
            Nous adapterons vos recommandations nutritionnelles
          </Text>

          <View style={styles.optionsContainer}>
            {dietaryOptions.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.option,
                  {
                    borderColor: selectedDietaryRestrictions === option.id ? theme.colors.primary : theme.colors.neutral[300],
                    backgroundColor: selectedDietaryRestrictions === option.id ? theme.colors.primary + '10' : theme.colors.surface,
                  }
                ]}
                onPress={() => setSelectedDietaryRestrictions(option.id)}
              >
                <View style={styles.optionContent}>
                  <Text style={[
                    styles.optionLabel,
                    {
                      color: selectedDietaryRestrictions === option.id ? theme.colors.primary : theme.colors.text.primary,
                      fontWeight: selectedDietaryRestrictions === option.id ? '600' : '500',
                    }
                  ]}>
                    {option.label}
                  </Text>
                  <Text style={[styles.optionDescription, { color: theme.colors.text.light }]}>
                    {option.description}
                  </Text>
                </View>
                {selectedDietaryRestrictions === option.id && (
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
            disabled={!selectedDietaryRestrictions}
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