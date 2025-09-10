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
import Svg, { Path } from 'react-native-svg';

type Question2ScreenNavigationProp = StackNavigationProp<OnboardingStackParamList, 'Question2'>;

interface Question2ScreenProps {
  navigation: Question2ScreenNavigationProp;
}

export const Question2Screen: React.FC<Question2ScreenProps> = ({ navigation }) => {
  const { theme } = useTheme();
  const { updateOnboardingData } = useUserData();
  
  const [selectedGender, setSelectedGender] = useState<'male' | 'female' | null>(null);

  const handleNext = () => {
    if (!selectedGender) return;
    
    updateOnboardingData({ gender: selectedGender });
    navigation.navigate('Question3');
  };

  const MaleIcon = () => (
    <Svg width={48} height={48} viewBox="0 0 24 24">
      <Path
        d="M15.5 7.5L19 4h-3V2h6v6h-2V5l-3.5 3.5c1.1 1.2 1.8 2.8 1.8 4.5 0 3.9-3.1 7-7 7s-7-3.1-7-7 3.1-7 7-7c1.7 0 3.3.7 4.5 1.8zM11 9c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4z"
        fill={selectedGender === 'male' ? theme.colors.primary : theme.colors.text.light}
      />
    </Svg>
  );

  const FemaleIcon = () => (
    <Svg width={48} height={48} viewBox="0 0 24 24">
      <Path
        d="M12 2C8.13 2 5 5.13 5 9c0 3.87 3.13 7 7 7s7-3.13 7-7c0-3.87-3.13-7-7-7zm0 12c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zM11 17h2v3h-2v-3zM10 16v1h4v-1h-4z"
        fill={selectedGender === 'female' ? theme.colors.primary : theme.colors.text.light}
      />
    </Svg>
  );

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
                    width: `${(2/26) * 100}%` 
                  }
                ]} 
              />
            </View>
            <Text style={[styles.progressText, { color: theme.colors.text.light }]}>
              2 / 26
            </Text>
          </View>
        </View>

        <View style={styles.content}>
          <Text style={[styles.title, { color: theme.colors.text.primary }]}>
            Vous êtes ?
          </Text>
          
          <Text style={[styles.subtitle, { color: theme.colors.text.secondary }]}>
            Cette information nous aide à personnaliser votre programme
          </Text>

          <View style={styles.optionsContainer}>
            <TouchableOpacity
              style={[
                styles.option,
                {
                  borderColor: selectedGender === 'male' ? theme.colors.primary : theme.colors.neutral[300],
                  backgroundColor: selectedGender === 'male' ? theme.colors.primary + '10' : theme.colors.surface,
                }
              ]}
              onPress={() => setSelectedGender('male')}
            >
              <MaleIcon />
              <Text style={[
                styles.optionText,
                {
                  color: selectedGender === 'male' ? theme.colors.primary : theme.colors.text.primary,
                  fontWeight: selectedGender === 'male' ? '600' : '500',
                }
              ]}>
                Homme
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.option,
                {
                  borderColor: selectedGender === 'female' ? theme.colors.primary : theme.colors.neutral[300],
                  backgroundColor: selectedGender === 'female' ? theme.colors.primary + '10' : theme.colors.surface,
                }
              ]}
              onPress={() => setSelectedGender('female')}
            >
              <FemaleIcon />
              <Text style={[
                styles.optionText,
                {
                  color: selectedGender === 'female' ? theme.colors.primary : theme.colors.text.primary,
                  fontWeight: selectedGender === 'female' ? '600' : '500',
                }
              ]}>
                Femme
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.footer}>
          <Button
            title="Continuer"
            onPress={handleNext}
            disabled={!selectedGender}
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
    marginBottom: 48,
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
  optionText: {
    fontSize: 18,
  },
  footer: {
    paddingTop: 20,
  },
});