import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTheme } from '../../contexts/ThemeContext';
import { useUserData } from '../../contexts/UserDataContext';
import { Button } from '../../components/ui/Button';
import { BackButton } from '../../components/ui/BackButton';
import { OnboardingStackParamList } from '../../types';

type Question11ScreenNavigationProp = StackNavigationProp<OnboardingStackParamList, 'Question11'>;

interface Question11ScreenProps {
  navigation: Question11ScreenNavigationProp;
}

export const Question11Screen: React.FC<Question11ScreenProps> = ({ navigation }) => {
  const { theme } = useTheme();
  const { updateOnboardingData } = useUserData();
  
  const [selectedDays, setSelectedDays] = useState(3);

  const daysOptions = [1, 2, 3, 4, 5, 6, 7];

  const handleNext = () => {
    updateOnboardingData({ workoutDaysPerWeek: selectedDays });
    navigation.navigate('Question12');
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
                    width: `${(11/26) * 100}%` 
                  }
                ]} 
              />
            </View>
            <Text style={[styles.progressText, { color: theme.colors.text.light }]}>
              11 / 26
            </Text>
          </View>
        </View>

        <View style={styles.content}>
          <Text style={[styles.title, { color: theme.colors.text.primary }]}>
            Combien de jours par semaine voulez-vous vous entraîner ?
          </Text>
          
          <Text style={[styles.subtitle, { color: theme.colors.text.secondary }]}>
            Nous adapterons votre programme à votre disponibilité
          </Text>

          <View style={styles.optionsContainer}>
            {daysOptions.map((days) => (
              <TouchableOpacity
                key={days}
                onPress={() => setSelectedDays(days)}
                style={[
                  styles.option,
                  {
                    backgroundColor: selectedDays === days ? theme.colors.primary + '20' : theme.colors.surface,
                    borderColor: selectedDays === days ? theme.colors.primary : theme.colors.neutral[300],
                  }
                ]}
                activeOpacity={0.7}
              >
                <Text style={[
                  styles.optionText,
                  {
                    color: selectedDays === days ? theme.colors.primary : theme.colors.text.primary,
                    fontWeight: selectedDays === days ? '700' : '500',
                  }
                ]}>
                  {days} jour{days > 1 ? 's' : ''}
                </Text>
                <Text style={[
                  styles.optionSubtext,
                  {
                    color: selectedDays === days ? theme.colors.primary : theme.colors.text.secondary,
                  }
                ]}>
                  par semaine
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