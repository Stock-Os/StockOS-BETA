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

type Question19ScreenNavigationProp = StackNavigationProp<OnboardingStackParamList, 'Question19'>;

interface Question19ScreenProps {
  navigation: Question19ScreenNavigationProp;
}

export const Question19Screen: React.FC<Question19ScreenProps> = ({ navigation }) => {
  const { theme } = useTheme();
  const { updateOnboardingData } = useUserData();
  
  const [selectedAllergies, setSelectedAllergies] = useState<string[]>([]);

  const allergies = [
    { id: 'none', label: 'Aucune allergie', emoji: '✅', description: 'Pas de restrictions alimentaires' },
    { id: 'gluten', label: 'Gluten / Blé', emoji: '🌾', description: 'Maladie cœliaque, sensibilité au gluten' },
    { id: 'dairy', label: 'Produits laitiers', emoji: '🥛', description: 'Lactose, caséine, produits laitiers' },
    { id: 'eggs', label: 'Œufs', emoji: '🥚', description: 'Allergie aux œufs de poule' },
    { id: 'nuts', label: 'Fruits à coque', emoji: '🥜', description: 'Amandes, noix, noisettes, etc.' },
    { id: 'peanuts', label: 'Cacahuètes', emoji: '🥜', description: 'Arachides' },
    { id: 'soy', label: 'Soja', emoji: '🫘', description: 'Tofu, sauce soja, lécithine' },
    { id: 'fish', label: 'Poissons', emoji: '🐟', description: 'Tous les poissons' },
    { id: 'shellfish', label: 'Crustacés', emoji: '🦐', description: 'Crevettes, crabes, homards' },
    { id: 'sesame', label: 'Graines de sésame', emoji: '🌰', description: 'Tahini, huile de sésame' },
    { id: 'sulfites', label: 'Sulfites', emoji: '🍷', description: 'Conservateurs dans le vin, fruits secs' },
    { id: 'nightshades', label: 'Solanacées', emoji: '🍅', description: 'Tomates, pommes de terre, poivrons' },
    { id: 'histamine', label: 'Histamine', emoji: '🧀', description: 'Fromages vieillis, charcuteries' },
    { id: 'fructose', label: 'Fructose', emoji: '🍎', description: 'Intolérance au fructose' },
    { id: 'fodmap', label: 'FODMAP', emoji: '🥬', description: 'Régime pauvre en FODMAP' },
    { id: 'other', label: 'Autre', emoji: '❓', description: 'Autres intolérances/allergies' },
  ];

  const handleAllergyToggle = (allergyId: string) => {
    setSelectedAllergies(prev => {
      if (allergyId === 'none') {
        return prev.includes('none') ? [] : ['none'];
      }
      
      const withoutNone = prev.filter(id => id !== 'none');
      if (withoutNone.includes(allergyId)) {
        return withoutNone.filter(id => id !== allergyId);
      } else {
        return [...withoutNone, allergyId];
      }
    });
  };

  const handleNext = () => {
    updateOnboardingData({ foodAllergies: selectedAllergies });
    navigation.navigate('Question20');
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
                    width: `${(19/26) * 100}%` 
                  }
                ]} 
              />
            </View>
            <Text style={[styles.progressText, { color: theme.colors.text.light }]}>
              19 / 26
            </Text>
          </View>
        </View>

        <View style={styles.content}>
          <Text style={[styles.title, { color: theme.colors.text.primary }]}>
            Avez-vous des allergies ou intolérances alimentaires ?
          </Text>
          
          <Text style={[styles.subtitle, { color: theme.colors.text.secondary }]}>
            Sélectionnez toutes vos allergies et intolérances pour adapter vos menus
          </Text>

          <View style={styles.optionsContainer}>
            {allergies.map((allergy) => (
              <TouchableOpacity
                key={allergy.id}
                style={[
                  styles.option,
                  {
                    borderColor: selectedAllergies.includes(allergy.id) ? theme.colors.primary : theme.colors.neutral[300],
                    backgroundColor: selectedAllergies.includes(allergy.id) ? theme.colors.primary + '10' : theme.colors.surface,
                  }
                ]}
                onPress={() => handleAllergyToggle(allergy.id)}
              >
                <View style={styles.optionHeader}>
                  <Text style={styles.emoji}>{allergy.emoji}</Text>
                  <View style={styles.optionContent}>
                    <Text style={[
                      styles.optionTitle,
                      {
                        color: selectedAllergies.includes(allergy.id) ? theme.colors.primary : theme.colors.text.primary,
                        fontWeight: selectedAllergies.includes(allergy.id) ? '600' : '500',
                      }
                    ]}>
                      {allergy.label}
                    </Text>
                    <Text style={[styles.optionDescription, { color: theme.colors.text.light }]}>
                      {allergy.description}
                    </Text>
                  </View>
                  {selectedAllergies.includes(allergy.id) && (
                    <Text style={[styles.checkmark, { color: theme.colors.primary }]}>✓</Text>
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
          
          <Text style={[styles.selectedCount, { color: theme.colors.text.secondary }]}>
            {selectedAllergies.length} allergie(s) sélectionnée(s)
          </Text>
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
  },
  option: {
    padding: 16,
    borderWidth: 2,
    borderRadius: 12,
  },
  optionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  emoji: {
    fontSize: 24,
    minWidth: 30,
    textAlign: 'center',
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
  checkmark: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  selectedCount: {
    textAlign: 'center',
    fontSize: 14,
    marginTop: 20,
    fontStyle: 'italic',
  },
  footer: {
    paddingTop: 20,
  },
});