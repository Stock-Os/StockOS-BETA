import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTheme } from '../../contexts/ThemeContext';
import { useUserData } from '../../contexts/UserDataContext';
import { Button } from '../../components/ui/Button';
import Ruler from '../../components/ui/Ruler';
import { OnboardingStackParamList } from '../../types';

type Question6ScreenNavigationProp = StackNavigationProp<OnboardingStackParamList, 'Question6'>;

interface Question6ScreenProps {
  navigation: Question6ScreenNavigationProp;
}

export const Question6Screen: React.FC<Question6ScreenProps> = ({ navigation }) => {
  const { theme } = useTheme();
  const { updateOnboardingData } = useUserData();
  
  const [selectedWeight, setSelectedWeight] = useState(70);

  const handleNext = () => {
    updateOnboardingData({ targetWeight: selectedWeight });
    navigation.navigate('Question7');
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
                    width: `${(6/26) * 100}%` 
                  }
                ]} 
              />
            </View>
            <Text style={[styles.progressText, { color: theme.colors.text.light }]}>
              6 / 26
            </Text>
          </View>
        </View>

        <View style={styles.content}>
          <Text style={[styles.title, { color: theme.colors.text.primary }]}>
            Quel est votre poids objectif ?
          </Text>
          
          <Text style={[styles.subtitle, { color: theme.colors.text.secondary }]}>
            Définissons ensemble votre objectif de poids idéal
          </Text>

          <View style={styles.pickerContainer}>
            <View style={styles.weightDisplay}>
              <Text style={[styles.weightValue, { color: theme.colors.primary }]}>
                {selectedWeight} kg
              </Text>
            </View>
            <Ruler
              min={40}
              max={150}
              step={0.5}
              initialValue={selectedWeight}
              fractionDigits={1}
              unit="kg"
              onValueChange={(value) => setSelectedWeight(value)}
              onValueChangeEnd={(value) => setSelectedWeight(value)}
              indicatorColor={theme.colors.primary}
              shortTickColor={theme.colors.neutral[300]}
              longTickColor={theme.colors.neutral[600]}
              labelColor={theme.colors.text.secondary}
            />
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
  pickerContainer: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  weightDisplay: {
    alignItems: 'center',
    marginBottom: 30,
  },
  weightValue: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  footer: {
    paddingTop: 20,
  },
});