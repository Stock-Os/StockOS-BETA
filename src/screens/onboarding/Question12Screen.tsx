import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTheme } from '../../contexts/ThemeContext';
import { useUserData } from '../../contexts/UserDataContext';
import { Button } from '../../components/ui/Button';
import { BackButton } from '../../components/ui/BackButton';
import { OnboardingStackParamList } from '../../types';

type Question12ScreenNavigationProp = StackNavigationProp<OnboardingStackParamList, 'Question12'>;

interface Question12ScreenProps {
  navigation: Question12ScreenNavigationProp;
}

export const Question12Screen: React.FC<Question12ScreenProps> = ({ navigation }) => {
  const { theme } = useTheme();
  const { updateOnboardingData } = useUserData();
  
  const [selectedDuration, setSelectedDuration] = useState(45);

  const durationOptions = [
    { value: 15, label: '15 minutes', shortLabel: '15 min' },
    { value: 20, label: '20 minutes', shortLabel: '20 min' },
    { value: 30, label: '30 minutes', shortLabel: '30 min' },
    { value: 40, label: '40 minutes', shortLabel: '40 min' },
    { value: 45, label: '45 minutes', shortLabel: '45 min' },
    { value: 50, label: '50 minutes', shortLabel: '50 min' },
    { value: 60, label: '1 heure', shortLabel: '1h' },
    { value: 75, label: '1h15', shortLabel: '1h15' },
    { value: 90, label: '1h30', shortLabel: '1h30' },
    { value: 105, label: '1h45', shortLabel: '1h45' },
    { value: 120, label: '2 heures', shortLabel: '2h' },
    { value: 135, label: '2h15', shortLabel: '2h15' },
    { value: 150, label: '2h30', shortLabel: '2h30' },
    { value: 180, label: '3 heures', shortLabel: '3h' },
  ];

  const handleNext = () => {
    updateOnboardingData({ workoutDuration: selectedDuration });
    navigation.navigate('Question13');
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <View style={styles.backButtonContainer}>
            <BackButton onPress={handleBack} />
          </View>
          <View style={styles.progressContainer}>
            <View style={[styles.progressBar, { backgroundColor: theme.colors.neutral[200] }]}>
              <View 
                style={[
                  styles.progress, 
                  { 
                    backgroundColor: theme.colors.primary,
                    width: `${(12/26) * 100}%` 
                  }
                ]} 
              />
            </View>
            <Text style={[styles.progressText, { color: theme.colors.text.light }]}>
              12 / 26
            </Text>
          </View>
        </View>

        <View style={styles.content}>
          <Text style={[styles.title, { color: theme.colors.text.primary }]}>
            Combien de temps voulez-vous vous entraîner ?
          </Text>
          
          <Text style={[styles.subtitle, { color: theme.colors.text.secondary }]}>
            Durée souhaitée par séance d'entraînement
          </Text>

          <View style={styles.optionsContainer}>
            {durationOptions.map((option) => (
              <TouchableOpacity
                key={option.value}
                onPress={() => setSelectedDuration(option.value)}
                style={[
                  styles.option,
                  {
                    backgroundColor: selectedDuration === option.value ? theme.colors.primary + '20' : theme.colors.surface,
                    borderColor: selectedDuration === option.value ? theme.colors.primary : theme.colors.neutral[300],
                  }
                ]}
                activeOpacity={0.7}
              >
                <Text style={[
                  styles.optionText,
                  {
                    color: selectedDuration === option.value ? theme.colors.primary : theme.colors.text.primary,
                    fontWeight: selectedDuration === option.value ? '700' : '500',
                  }
                ]}>
                  {option.shortLabel}
                </Text>
                <Text style={[
                  styles.optionSubtext,
                  {
                    color: selectedDuration === option.value ? theme.colors.primary : theme.colors.text.secondary,
                  }
                ]}>
                  par séance
                </Text>
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
    flex: 1 
  },
  scrollContent: { 
    flexGrow: 1, 
    paddingHorizontal: 24, 
    paddingTop: 20, 
    paddingBottom: 32 
  },
  header: { 
    marginBottom: 40 
  },
  backButtonContainer: {
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  progressContainer: { 
    alignItems: 'center' 
  },
  progressBar: { 
    width: '100%', 
    height: 4, 
    borderRadius: 2, 
    marginBottom: 12 
  },
  progress: { 
    height: '100%', 
    borderRadius: 2 
  },
  progressText: { 
    fontSize: 14, 
    fontWeight: '500' 
  },
  content: { 
    flex: 1, 
    justifyContent: 'center' 
  },
  title: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    marginBottom: 16, 
    lineHeight: 36 
  },
  subtitle: { 
    fontSize: 16, 
    textAlign: 'center', 
    lineHeight: 24, 
    marginBottom: 48 
  },
  optionsContainer: {
    paddingHorizontal: 20,
  },
  option: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 2,
    marginBottom: 12,
    alignItems: 'center',
  },
  optionText: {
    fontSize: 18,
    marginBottom: 4,
  },
  optionSubtext: {
    fontSize: 14,
  },
  footer: { 
    paddingTop: 20 
  },
});