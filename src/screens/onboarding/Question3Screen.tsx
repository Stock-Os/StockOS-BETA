import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { useTheme } from '../../contexts/ThemeContext';
import { useUserData } from '../../contexts/UserDataContext';
import { Button } from '../../components/ui/Button';
import { OnboardingStackParamList } from '../../types';

type Question3ScreenNavigationProp = StackNavigationProp<OnboardingStackParamList, 'Question3'>;

interface Question3ScreenProps {
  navigation: Question3ScreenNavigationProp;
}

export const Question3Screen: React.FC<Question3ScreenProps> = ({ navigation }) => {
  const { theme } = useTheme();
  const { updateOnboardingData } = useUserData();
  
  const [selectedAge, setSelectedAge] = useState(25);

  const handleNext = () => {
    updateOnboardingData({ age: selectedAge });
    navigation.navigate('Question4');
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
                    width: `${(3/26) * 100}%` 
                  }
                ]} 
              />
            </View>
            <Text style={[styles.progressText, { color: theme.colors.text.light }]}>
              3 / 26
            </Text>
          </View>
        </View>

        <View style={styles.content}>
          <Text style={[styles.title, { color: theme.colors.text.primary }]}>
            Quel âge avez-vous ?
          </Text>
          
          <Text style={[styles.subtitle, { color: theme.colors.text.secondary }]}>
            Votre âge nous aide à adapter l'intensité de vos programmes
          </Text>

          <View style={styles.pickerContainer}>
            <View style={styles.ageDisplay}>
              <Text style={[styles.ageValue, { color: theme.colors.primary }]}>
                {selectedAge} ans
              </Text>
            </View>
            <View style={styles.sliderContainer}>
              <MultiSlider
                values={[selectedAge]}
                min={14}
                max={80}
                step={1}
                sliderLength={280}
                onValuesChange={(values) => setSelectedAge(values[0])}
                selectedStyle={{
                  backgroundColor: theme.colors.primary,
                }}
                unselectedStyle={{
                  backgroundColor: theme.colors.neutral[200],
                }}
                markerStyle={{
                  backgroundColor: theme.colors.primary,
                  height: 25,
                  width: 25,
                  borderRadius: 12.5,
                  borderWidth: 2,
                  borderColor: '#FFFFFF',
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 5,
                }}
                trackStyle={{
                  height: 6,
                  borderRadius: 3,
                }}
                touchDimensions={{
                  height: 40,
                  width: 40,
                  borderRadius: 20,
                  slipDisplacement: 40,
                }}
              />
              <View style={styles.sliderLabels}>
                <Text style={[styles.sliderLabel, { color: theme.colors.text.light }]}>14</Text>
                <Text style={[styles.sliderLabel, { color: theme.colors.text.light }]}>80</Text>
              </View>
            </View>
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
  ageDisplay: {
    alignItems: 'center',
    marginBottom: 40,
  },
  ageValue: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  sliderContainer: {
    width: '100%',
    alignItems: 'center',
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 280,
    marginTop: 10,
    paddingHorizontal: 5,
  },
  sliderLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  footer: {
    paddingTop: 20,
  },
});