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
import RulerPicker from 'react-native-ruler-picker';
import { OnboardingStackParamList } from '../../types';

type Question5ScreenNavigationProp = StackNavigationProp<OnboardingStackParamList, 'Question5'>;

interface Question5ScreenProps {
  navigation: Question5ScreenNavigationProp;
}

export const Question5Screen: React.FC<Question5ScreenProps> = ({ navigation }) => {
  const { theme } = useTheme();
  const { updateOnboardingData } = useUserData();
  
  const [selectedWeight, setSelectedWeight] = useState(70);

  // Generate weight options from 40kg to 150kg
  const weightOptions = Array.from({ length: 111 }, (_, index) => ({
    value: index + 40,
    label: `${index + 40} kg`,
  }));

  const handleNext = () => {
    updateOnboardingData({ currentWeight: selectedWeight });
    navigation.navigate('Question6');
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
                    width: `${(5/26) * 100}%` 
                  }
                ]} 
              />
            </View>
            <Text style={[styles.progressText, { color: theme.colors.text.light }]}>
              5 / 26
            </Text>
          </View>
        </View>

        <View style={styles.content}>
          <Text style={[styles.title, { color: theme.colors.text.primary }]}>
            Quel est votre poids actuel ?
          </Text>
          
          <Text style={[styles.subtitle, { color: theme.colors.text.secondary }]}>
            Nous utiliserons cette information pour personnaliser vos objectifs
          </Text>

          <View style={styles.pickerContainer}>
            <View style={styles.weightDisplay}>
              <Text style={[styles.weightValue, { color: theme.colors.primary }]}>
                {selectedWeight} kg
              </Text>
            </View>
            <RulerPicker
              min={30}
              max={200}
              step={0.5}
              fractionDigits={1}
              initialValue={selectedWeight}
              onValueChange={setSelectedWeight}
              onValueChangeComplete={setSelectedWeight}
              width={300}
              height={100}
              indicatorColor={theme.colors.primary}
              indicatorSize={20}
              valueTextStyle={{ fontSize: 18, color: theme.colors.text.primary }}
              unitTextStyle={{ fontSize: 14, color: theme.colors.text.light }}
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
  },
  weightDisplay: {
    alignItems: 'center',
    marginBottom: 20,
  },
  weightValue: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  footer: {
    paddingTop: 20,
  },
});