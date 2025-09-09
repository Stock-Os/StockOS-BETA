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

type Question8ScreenNavigationProp = StackNavigationProp<OnboardingStackParamList, 'Question8'>;

interface Question8ScreenProps {
  navigation: Question8ScreenNavigationProp;
}

export const Question8Screen: React.FC<Question8ScreenProps> = ({ navigation }) => {
  const { theme } = useTheme();
  const { updateOnboardingData } = useUserData();
  
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);

  const levels = [
    {
      id: 'beginner',
      label: 'Débutant',
      description: 'Je fais peu ou pas d\'exercice',
      icon: '🌱'
    },
    {
      id: 'intermediate',
      label: 'Intermédiaire',
      description: 'Je fais de l\'exercice 2-3 fois par semaine',
      icon: '🏃‍♂️'
    },
    {
      id: 'advanced',
      label: 'Avancé',
      description: 'Je fais de l\'exercice 4-5 fois par semaine',
      icon: '💪'
    },
    {
      id: 'expert',
      label: 'Expert',
      description: 'Je fais de l\'exercice 6+ fois par semaine',
      icon: '🏆'
    },
  ];

  const handleNext = () => {
    if (!selectedLevel) return;
    
    updateOnboardingData({ activityLevel: selectedLevel });
    navigation.navigate('Question9');
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
                    width: `${(8/26) * 100}%` 
                  }
                ]} 
              />
            </View>
            <Text style={[styles.progressText, { color: theme.colors.text.light }]}>
              8 / 26
            </Text>
          </View>
        </View>

        <View style={styles.content}>
          <Text style={[styles.title, { color: theme.colors.text.primary }]}>
            Quel est votre niveau d'activité ?
          </Text>
          
          <Text style={[styles.subtitle, { color: theme.colors.text.secondary }]}>
            Cela nous aide à adapter l'intensité de vos entraînements
          </Text>

          <View style={styles.optionsContainer}>
            {levels.map((level) => (
              <TouchableOpacity
                key={level.id}
                style={[
                  styles.option,
                  {
                    borderColor: selectedLevel === level.id ? theme.colors.primary : theme.colors.neutral[300],
                    backgroundColor: selectedLevel === level.id ? theme.colors.primary + '10' : theme.colors.surface,
                  }
                ]}
                onPress={() => setSelectedLevel(level.id)}
              >
                <Text style={styles.icon}>{level.icon}</Text>
                <View style={styles.optionContent}>
                  <Text style={[
                    styles.optionTitle,
                    {
                      color: selectedLevel === level.id ? theme.colors.primary : theme.colors.text.primary,
                      fontWeight: selectedLevel === level.id ? '600' : '500',
                    }
                  ]}>
                    {level.label}
                  </Text>
                  <Text style={[styles.optionDescription, { color: theme.colors.text.secondary }]}>
                    {level.description}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.footer}>
          <Button
            title="Continuer"
            onPress={handleNext}
            disabled={!selectedLevel}
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
    gap: 16,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderWidth: 2,
    borderRadius: 16,
    gap: 16,
  },
  icon: {
    fontSize: 32,
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 14,
    lineHeight: 18,
  },
  footer: {
    paddingTop: 20,
  },
});