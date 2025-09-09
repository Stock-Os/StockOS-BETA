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
        d="M9 9c0-1.66 1.34-3 3-3s3 1.34 3 3 1.34 3 3 3 3 1.34 3 3-1.34 3-3 3H9c-1.66 0-3-1.34-3-3s1.34-3 3-3zm0-2c-2.76 0-5 2.24-5 5s2.24 5 5 5h6c2.76 0 5-2.24 5-5s-2.24-5-5-5H9z"
        fill={selectedGender === 'male' ? theme.colors.primary : theme.colors.text.light}
      />
    </Svg>
  );

  const FemaleIcon = () => (
    <Svg width={48} height={48} viewBox="0 0 24 24">
      <Path
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-1.41-1.41L10 14.17V9h4v5.17l1.41 1.42L14 17h-4z"
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