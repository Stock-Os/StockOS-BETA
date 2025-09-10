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

type Question16ScreenNavigationProp = StackNavigationProp<OnboardingStackParamList, 'Question16'>;

interface Question16ScreenProps {
  navigation: Question16ScreenNavigationProp;
}

export const Question16Screen: React.FC<Question16ScreenProps> = ({ navigation }) => {
  const { theme } = useTheme();
  const { updateOnboardingData } = useUserData();
  
  const [selectedRestDays, setSelectedRestDays] = useState<string[]>([]);

  const days = [
    { id: 'monday', label: 'Lundi', emoji: '📅', short: 'Lun' },
    { id: 'tuesday', label: 'Mardi', emoji: '📅', short: 'Mar' },
    { id: 'wednesday', label: 'Mercredi', emoji: '📅', short: 'Mer' },
    { id: 'thursday', label: 'Jeudi', emoji: '📅', short: 'Jeu' },
    { id: 'friday', label: 'Vendredi', emoji: '📅', short: 'Ven' },
    { id: 'saturday', label: 'Samedi', emoji: '📅', short: 'Sam' },
    { id: 'sunday', label: 'Dimanche', emoji: '📅', short: 'Dim' },
  ];

  const restTypes = [
    { id: 'complete_rest', label: 'Repos complet', emoji: '😴', description: 'Aucune activité physique' },
    { id: 'active_recovery', label: 'Récupération active', emoji: '🚶', description: 'Marche, étirements légers' },
    { id: 'light_cardio', label: 'Cardio léger', emoji: '🚴', description: 'Vélo, natation douce' },
    { id: 'flexibility', label: 'Flexibilité/Mobilité', emoji: '🧘', description: 'Yoga, étirements' },
  ];

  const handleRestDayToggle = (dayId: string) => {
    setSelectedRestDays(prev => {
      if (prev.includes(dayId)) {
        return prev.filter(id => id !== dayId);
      } else {
        return [...prev, dayId];
      }
    });
  };

  const [selectedRestType, setSelectedRestType] = useState<string>('complete_rest');

  const handleNext = () => {
    updateOnboardingData({ 
      restDays: selectedRestDays,
      restType: selectedRestType
    });
    navigation.navigate('Question17');
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
                    width: `${(16/26) * 100}%` 
                  }
                ]} 
              />
            </View>
            <Text style={[styles.progressText, { color: theme.colors.text.light }]}>
              16 / 26
            </Text>
          </View>
        </View>

        <View style={styles.content}>
          <Text style={[styles.title, { color: theme.colors.text.primary }]}>
            Quels sont vos jours de repos préférés ?
          </Text>
          
          <Text style={[styles.subtitle, { color: theme.colors.text.secondary }]}>
            Sélectionnez les jours où vous préférez ne pas faire d'entraînement intense
          </Text>

          <View style={styles.daysContainer}>
            {days.map((day) => (
              <TouchableOpacity
                key={day.id}
                style={[
                  styles.dayOption,
                  {
                    borderColor: selectedRestDays.includes(day.id) ? theme.colors.primary : theme.colors.neutral[300],
                    backgroundColor: selectedRestDays.includes(day.id) ? theme.colors.primary + '20' : theme.colors.surface,
                  }
                ]}
                onPress={() => handleRestDayToggle(day.id)}
              >
                <Text style={[
                  styles.dayShort,
                  {
                    color: selectedRestDays.includes(day.id) ? theme.colors.primary : theme.colors.text.primary,
                    fontWeight: selectedRestDays.includes(day.id) ? '600' : '500',
                  }
                ]}>
                  {day.short}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
            Que préférez-vous faire les jours de repos ?
          </Text>

          <View style={styles.restTypesContainer}>
            {restTypes.map((type) => (
              <TouchableOpacity
                key={type.id}
                style={[
                  styles.option,
                  {
                    borderColor: selectedRestType === type.id ? theme.colors.primary : theme.colors.neutral[300],
                    backgroundColor: selectedRestType === type.id ? theme.colors.primary + '10' : theme.colors.surface,
                  }
                ]}
                onPress={() => setSelectedRestType(type.id)}
              >
                <View style={styles.optionHeader}>
                  <Text style={styles.emoji}>{type.emoji}</Text>
                  <View style={styles.optionContent}>
                    <Text style={[
                      styles.optionTitle,
                      {
                        color: selectedRestType === type.id ? theme.colors.primary : theme.colors.text.primary,
                        fontWeight: selectedRestType === type.id ? '600' : '500',
                      }
                    ]}>
                      {type.label}
                    </Text>
                    <Text style={[styles.optionDescription, { color: theme.colors.text.light }]}>
                      {type.description}
                    </Text>
                  </View>
                  {selectedRestType === type.id && (
                    <Text style={[styles.checkmark, { color: theme.colors.primary }]}>✓</Text>
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
          
          <Text style={[styles.selectedCount, { color: theme.colors.text.secondary }]}>
            {selectedRestDays.length} jour(s) de repos sélectionné(s)
          </Text>
        </View>

        <View style={styles.footer}>
          <Button
            title="Continuer"
            onPress={handleNext}
            disabled={selectedRestDays.length === 0}
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
  daysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 8,
    marginBottom: 32,
  },
  dayOption: {
    width: '13%',
    aspectRatio: 1,
    borderWidth: 2,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayShort: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
  },
  restTypesContainer: {
    gap: 12,
    marginBottom: 20,
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
    fontStyle: 'italic',
  },
  footer: {
    paddingTop: 20,
  },
});