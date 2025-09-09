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

type Question4ScreenNavigationProp = StackNavigationProp<OnboardingStackParamList, 'Question4'>;

interface Question4ScreenProps {
  navigation: Question4ScreenNavigationProp;
}

export const Question4Screen: React.FC<Question4ScreenProps> = ({ navigation }) => {
  const { theme } = useTheme();
  const { updateOnboardingData } = useUserData();
  
  const [selectedHeight, setSelectedHeight] = useState(170);

  const handleNext = () => {
    updateOnboardingData({ height: selectedHeight });
    navigation.navigate('Question5');
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
                    width: `${(4/26) * 100}%` 
                  }
                ]} 
              />
            </View>
            <Text style={[styles.progressText, { color: theme.colors.text.light }]}>
              4 / 26
            </Text>
          </View>
        </View>

        <View style={styles.content}>
          <Text style={[styles.title, { color: theme.colors.text.primary }]}>
            Quelle est votre taille ?
          </Text>
          
          <Text style={[styles.subtitle, { color: theme.colors.text.secondary }]}>
            Cette information nous aide à calculer vos besoins caloriques
          </Text>

          <View style={styles.pickerContainer}>
            <View style={styles.heightDisplay}>
              <Text style={[styles.heightValue, { color: theme.colors.primary }]}>
                {selectedHeight} cm
              </Text>
            </View>
            <RulerPicker
              min={140}
              max={220}
              step={1}
              fractionDigits={0}
              initialValue={selectedHeight}
              onValueChange={setSelectedHeight}
              onValueChangeComplete={setSelectedHeight}
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
  heightDisplay: {
    alignItems: 'center',
    marginBottom: 20,
  },
  heightValue: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  footer: {
    paddingTop: 20,
  },
});