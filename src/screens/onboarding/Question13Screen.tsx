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

type Question13ScreenNavigationProp = StackNavigationProp<OnboardingStackParamList, 'Question13'>;

interface Question13ScreenProps {
  navigation: Question13ScreenNavigationProp;
}

export const Question13Screen: React.FC<Question13ScreenProps> = ({ navigation }) => {
  const { theme } = useTheme();
  const { updateOnboardingData } = useUserData();
  
  const [selectedTrainingTypes, setSelectedTrainingTypes] = useState<string[]>([]);

  const trainingTypes = [
    { id: 'powerlifting', label: 'Powerlifting', emoji: '🏋️‍♂️', description: 'Force pure - Squat, Bench, Deadlift' },
    { id: 'bodybuilding', label: 'Bodybuilding', emoji: '💪', description: 'Hypertrophie et esthétique' },
    { id: 'calisthenics', label: 'Callisthénie', emoji: '🤸‍♂️', description: 'Poids du corps - Tractions, dips, etc.' },
    { id: 'crossfit', label: 'CrossFit', emoji: '🔥', description: 'Entraînement fonctionnel varié' },
    { id: 'weightlifting', label: 'Haltérophilie', emoji: '🥇', description: 'Arraché et épaulé-jeté' },
    { id: 'strongman', label: 'Strongman', emoji: '🏆', description: 'Force fonctionnelle extrême' },
    { id: 'yoga', label: 'Yoga', emoji: '🧘‍♀️', description: 'Flexibilité et équilibre' },
    { id: 'pilates', label: 'Pilates', emoji: '🤹‍♀️', description: 'Core et stabilité' },
    { id: 'hiit', label: 'HIIT', emoji: '⚡', description: 'Haute intensité par intervalles' },
    { id: 'cardio', label: 'Cardio', emoji: '❤️', description: 'Endurance cardiovasculaire' },
    { id: 'running', label: 'Course à pied', emoji: '🏃‍♂️', description: 'Running et jogging' },
    { id: 'cycling', label: 'Cyclisme', emoji: '🚴‍♂️', description: 'Vélo et spinning' },
    { id: 'swimming', label: 'Natation', emoji: '🏊‍♂️', description: 'Sport complet aquatique' },
    { id: 'martial_arts', label: 'Arts martiaux', emoji: '🥋', description: 'Combat et self-défense' },
    { id: 'boxing', label: 'Boxe', emoji: '🥊', description: 'Noble art et fitness' },
    { id: 'climbing', label: 'Escalade', emoji: '🧗‍♂️', description: 'Force et coordination' },
    { id: 'functional', label: 'Entraînement fonctionnel', emoji: '⚙️', description: 'Mouvements du quotidien' },
    { id: 'dance', label: 'Danse fitness', emoji: '💃', description: 'Fitness dansé' },
    { id: 'stretching', label: 'Étirements', emoji: '🤸', description: 'Flexibilité et récupération' },
    { id: 'rehabilitation', label: 'Réhabilitation', emoji: '🏥', description: 'Récupération et prévention' },
  ];

  const handleTrainingTypeToggle = (trainingTypeId: string) => {
    setSelectedTrainingTypes(prev => {
      if (prev.includes(trainingTypeId)) {
        return prev.filter(id => id !== trainingTypeId);
      } else {
        return [...prev, trainingTypeId];
      }
    });
  };

  const handleNext = () => {
    if (selectedTrainingTypes.length === 0) return;
    
    updateOnboardingData({ trainingTypes: selectedTrainingTypes });
    navigation.navigate('Question14');
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
                    width: `${(13/26) * 100}%` 
                  }
                ]} 
              />
            </View>
            <Text style={[styles.progressText, { color: theme.colors.text.light }]}>
              13 / 26
            </Text>
          </View>
        </View>

        <View style={styles.content}>
          <Text style={[styles.title, { color: theme.colors.text.primary }]}>
            Quel(s) type(s) d'entraînement préférez-vous ?
          </Text>
          
          <Text style={[styles.subtitle, { color: theme.colors.text.secondary }]}>
            Sélectionnez tous les types d'entraînement qui vous intéressent (choix multiple)
          </Text>

          <View style={styles.optionsContainer}>
            {trainingTypes.map((type) => (
              <TouchableOpacity
                key={type.id}
                style={[
                  styles.option,
                  {
                    borderColor: selectedTrainingTypes.includes(type.id) ? theme.colors.primary : theme.colors.neutral[300],
                    backgroundColor: selectedTrainingTypes.includes(type.id) ? theme.colors.primary + '10' : theme.colors.surface,
                  }
                ]}
                onPress={() => handleTrainingTypeToggle(type.id)}
              >
                <View style={styles.optionHeader}>
                  <Text style={styles.emoji}>{type.emoji}</Text>
                  <View style={styles.optionContent}>
                    <Text style={[
                      styles.optionTitle,
                      {
                        color: selectedTrainingTypes.includes(type.id) ? theme.colors.primary : theme.colors.text.primary,
                        fontWeight: selectedTrainingTypes.includes(type.id) ? '600' : '500',
                      }
                    ]}>
                      {type.label}
                    </Text>
                    <Text style={[styles.optionDescription, { color: theme.colors.text.light }]}>
                      {type.description}
                    </Text>
                  </View>
                  {selectedTrainingTypes.includes(type.id) && (
                    <Text style={[styles.checkmark, { color: theme.colors.primary }]}>✓</Text>
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
          
          <Text style={[styles.selectedCount, { color: theme.colors.text.secondary }]}>
            {selectedTrainingTypes.length} type(s) sélectionné(s)
          </Text>
        </View>

        <View style={styles.footer}>
          <Button
            title="Continuer"
            onPress={handleNext}
            disabled={selectedTrainingTypes.length === 0}
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