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
import { OnboardingStackParamList } from '../../types';

type Question7ScreenNavigationProp = StackNavigationProp<OnboardingStackParamList, 'Question7'>;

interface Question7ScreenProps {
  navigation: Question7ScreenNavigationProp;
}

export const Question7Screen: React.FC<Question7ScreenProps> = ({ navigation }) => {
  const { theme } = useTheme();
  const { updateOnboardingData } = useUserData();
  
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);

  const goals = [
    { id: 'lose_weight', label: 'Perdre du poids', emoji: '⬇️' },
    { id: 'gain_weight', label: 'Prendre du poids', emoji: '⬆️' },
    { id: 'maintain_weight', label: 'Maintenir mon poids', emoji: '↔️' },
    { id: 'build_muscle', label: 'Prendre du muscle', emoji: '💪' },
    { id: 'tone_up', label: 'Me tonifier', emoji: '🎯' },
    { id: 'improve_health', label: 'Améliorer ma santé', emoji: '❤️' },
  ];

  const handleNext = () => {
    if (!selectedGoal) return;
    
    updateOnboardingData({ fitnessGoal: selectedGoal });
    navigation.navigate('Question8');
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
                    width: `${(7/26) * 100}%` 
                  }
                ]} 
              />
            </View>
            <Text style={[styles.progressText, { color: theme.colors.text.light }]}>
              7 / 26
            </Text>
          </View>
        </View>

        <View style={styles.content}>
          <Text style={[styles.title, { color: theme.colors.text.primary }]}>
            Quel est votre objectif principal ?
          </Text>
          
          <Text style={[styles.subtitle, { color: theme.colors.text.secondary }]}>
            Sélectionnez votre objectif prioritaire pour adapter votre programme
          </Text>

          <View style={styles.optionsContainer}>
            {goals.map((goal) => (
              <TouchableOpacity
                key={goal.id}
                style={[
                  styles.option,
                  {
                    borderColor: selectedGoal === goal.id ? theme.colors.primary : theme.colors.neutral[300],
                    backgroundColor: selectedGoal === goal.id ? theme.colors.primary + '10' : theme.colors.surface,
                  }
                ]}
                onPress={() => setSelectedGoal(goal.id)}
              >
                <Text style={styles.emoji}>{goal.emoji}</Text>
                <Text style={[
                  styles.optionText,
                  {
                    color: selectedGoal === goal.id ? theme.colors.primary : theme.colors.text.primary,
                    fontWeight: selectedGoal === goal.id ? '600' : '500',
                  }
                ]}>
                  {goal.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.footer}>
          <Button
            title="Continuer"
            onPress={handleNext}
            disabled={!selectedGoal}
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
    justifyContent: 'center',
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
    gap: 12,
  },
  emoji: {
    fontSize: 24,
  },
  optionText: {
    fontSize: 16,
    flex: 1,
  },
  footer: {
    paddingTop: 20,
  },
});