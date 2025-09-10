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

type Question21ScreenNavigationProp = StackNavigationProp<OnboardingStackParamList, 'Question21'>;

interface Question21ScreenProps {
  navigation: Question21ScreenNavigationProp;
}

export const Question21Screen: React.FC<Question21ScreenProps> = ({ navigation }) => {
  const { theme } = useTheme();
  const { updateOnboardingData } = useUserData();
  
  const [selectedStressLevel, setSelectedStressLevel] = useState<string>('');

  const stressOptions = [
    { id: 'very_low', label: 'Très faible', description: 'Très zen, pas de stress' },
    { id: 'low', label: 'Faible', description: 'Quelques tensions occasionnelles' },
    { id: 'moderate', label: 'Modéré', description: 'Stress normal du quotidien' },
    { id: 'high', label: 'Élevé', description: 'Stress fréquent et intense' },
    { id: 'very_high', label: 'Très élevé', description: 'Stress constant et épuisant' },
  ];

  const handleNext = () => {
    if (!selectedStressLevel) return;
    
    updateOnboardingData({ stressLevel: selectedStressLevel });
    navigation.navigate('Question22');
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
                    width: `${(21/26) * 100}%` 
                  }
                ]} 
              />
            </View>
            <Text style={[styles.progressText, { color: theme.colors.text.light }]}>
              21 / 26
            </Text>
          </View>
        </View>

        <View style={styles.content}>
          <Text style={[styles.title, { color: theme.colors.text.primary }]}>
            Quel est votre niveau de stress quotidien ?
          </Text>
          
          <Text style={[styles.subtitle, { color: theme.colors.text.secondary }]}>
            Le stress influence votre récupération et vos besoins nutritionnels
          </Text>

          <View style={styles.optionsContainer}>
            {stressOptions.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.option,
                  {
                    borderColor: selectedStressLevel === option.id ? theme.colors.primary : theme.colors.neutral[300],
                    backgroundColor: selectedStressLevel === option.id ? theme.colors.primary + '10' : theme.colors.surface,
                  }
                ]}
                onPress={() => setSelectedStressLevel(option.id)}
              >
                <View style={styles.optionContent}>
                  <Text style={[
                    styles.optionLabel,
                    {
                      color: selectedStressLevel === option.id ? theme.colors.primary : theme.colors.text.primary,
                      fontWeight: selectedStressLevel === option.id ? '600' : '500',
                    }
                  ]}>
                    {option.label}
                  </Text>
                  <Text style={[styles.optionDescription, { color: theme.colors.text.light }]}>
                    {option.description}
                  </Text>
                </View>
                {selectedStressLevel === option.id && (
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
            disabled={!selectedStressLevel}
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