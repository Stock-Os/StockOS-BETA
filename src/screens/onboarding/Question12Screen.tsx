import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTheme } from '../../contexts/ThemeContext';
import { useUserData } from '../../contexts/UserDataContext';
import { Button } from '../../components/ui/Button';
import { WheelPicker } from '../../components/ui/WheelPicker';
import { OnboardingStackParamList } from '../../types';

type Question12ScreenNavigationProp = StackNavigationProp<OnboardingStackParamList, 'Question12'>;

interface Question12ScreenProps {
  navigation: Question12ScreenNavigationProp;
}

export const Question12Screen: React.FC<Question12ScreenProps> = ({ navigation }) => {
  const { theme } = useTheme();
  const { updateOnboardingData } = useUserData();
  
  const [selectedDuration, setSelectedDuration] = useState(45);

  const durationOptions = [
    { value: 30, label: '30 minutes' },
    { value: 45, label: '45 minutes' },
    { value: 60, label: '1 heure' },
    { value: 75, label: '1h15' },
    { value: 90, label: '1h30' },
    { value: 120, label: '2 heures' },
  ];

  const handleNext = () => {
    updateOnboardingData({ workoutDuration: selectedDuration });
    // Temporary: jump to final screen for testing
    navigation.navigate('Question26');
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
                    width: `${(12/26) * 100}%` 
                  }
                ]} 
              />
            </View>
            <Text style={[styles.progressText, { color: theme.colors.text.light }]}>
              12 / 26
            </Text>
          </View>
        </View>

        <View style={styles.content}>
          <Text style={[styles.title, { color: theme.colors.text.primary }]}>
            Combien de temps voulez-vous vous entraîner ?
          </Text>
          
          <Text style={[styles.subtitle, { color: theme.colors.text.secondary }]}>
            Durée souhaitée par séance d'entraînement
          </Text>

          <View style={styles.pickerContainer}>
            <WheelPicker
              data={durationOptions}
              selectedValue={selectedDuration}
              onSelectionChange={setSelectedDuration}
              itemHeight={60}
              visibleItems={5}
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
  container: { flex: 1 },
  scrollContent: { flexGrow: 1, paddingHorizontal: 24, paddingTop: 20, paddingBottom: 32 },
  header: { marginBottom: 40 },
  progressContainer: { alignItems: 'center' },
  progressBar: { width: '100%', height: 4, borderRadius: 2, marginBottom: 12 },
  progress: { height: '100%', borderRadius: 2 },
  progressText: { fontSize: 14, fontWeight: '500' },
  content: { flex: 1, justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 16, lineHeight: 36 },
  subtitle: { fontSize: 16, textAlign: 'center', lineHeight: 24, marginBottom: 48 },
  pickerContainer: { height: 300, justifyContent: 'center' },
  footer: { paddingTop: 20 },
});