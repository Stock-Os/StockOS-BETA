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

type Question14ScreenNavigationProp = StackNavigationProp<OnboardingStackParamList, 'Question14'>;

interface Question14ScreenProps {
  navigation: Question14ScreenNavigationProp;
}

export const Question14Screen: React.FC<Question14ScreenProps> = ({ navigation }) => {
  const { theme } = useTheme();
  const { updateOnboardingData } = useUserData();
  
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  const locations = [
    { 
      id: 'gym_commercial', 
      label: 'Salle de sport commerciale', 
      emoji: '🏢', 
      description: 'Fitness Park, Basic Fit, L\'Orange Bleue...' 
    },
    { 
      id: 'gym_independent', 
      label: 'Salle indépendante', 
      emoji: '🏋️', 
      description: 'Salle locale, club de musculation' 
    },
    { 
      id: 'home_equipped', 
      label: 'Domicile équipé', 
      emoji: '🏠', 
      description: 'Home gym avec équipements' 
    },
    { 
      id: 'home_minimal', 
      label: 'Domicile avec peu d\'équipement', 
      emoji: '🪑', 
      description: 'Haltères, tapis, élastiques...' 
    },
    { 
      id: 'home_bodyweight', 
      label: 'Domicile au poids du corps', 
      emoji: '🤸', 
      description: 'Aucun équipement' 
    },
    { 
      id: 'outdoor', 
      label: 'Extérieur', 
      emoji: '🌳', 
      description: 'Parc, street workout, course...' 
    },
    { 
      id: 'office', 
      label: 'Bureau/Travail', 
      emoji: '🏢', 
      description: 'Salle de sport d\'entreprise' 
    },
    { 
      id: 'multiple', 
      label: 'Plusieurs lieux', 
      emoji: '🔄', 
      description: 'Combinaison selon les jours' 
    },
  ];

  const handleNext = () => {
    if (!selectedLocation) return;
    
    updateOnboardingData({ trainingLocation: selectedLocation });
    navigation.navigate('Question15');
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
                    width: `${(14/26) * 100}%` 
                  }
                ]} 
              />
            </View>
            <Text style={[styles.progressText, { color: theme.colors.text.light }]}>
              14 / 26
            </Text>
          </View>
        </View>

        <View style={styles.content}>
          <Text style={[styles.title, { color: theme.colors.text.primary }]}>
            Où vous entraînez-vous principalement ?
          </Text>
          
          <Text style={[styles.subtitle, { color: theme.colors.text.secondary }]}>
            Sélectionnez votre lieu d'entraînement principal pour adapter vos programmes
          </Text>

          <View style={styles.optionsContainer}>
            {locations.map((location) => (
              <TouchableOpacity
                key={location.id}
                style={[
                  styles.option,
                  {
                    borderColor: selectedLocation === location.id ? theme.colors.primary : theme.colors.neutral[300],
                    backgroundColor: selectedLocation === location.id ? theme.colors.primary + '10' : theme.colors.surface,
                  }
                ]}
                onPress={() => setSelectedLocation(location.id)}
              >
                <View style={styles.optionHeader}>
                  <Text style={styles.emoji}>{location.emoji}</Text>
                  <View style={styles.optionContent}>
                    <Text style={[
                      styles.optionTitle,
                      {
                        color: selectedLocation === location.id ? theme.colors.primary : theme.colors.text.primary,
                        fontWeight: selectedLocation === location.id ? '600' : '500',
                      }
                    ]}>
                      {location.label}
                    </Text>
                    <Text style={[styles.optionDescription, { color: theme.colors.text.light }]}>
                      {location.description}
                    </Text>
                  </View>
                  {selectedLocation === location.id && (
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
            disabled={!selectedLocation}
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
  footer: {
    paddingTop: 20,
  },
});