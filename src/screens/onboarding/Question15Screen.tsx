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

type Question15ScreenNavigationProp = StackNavigationProp<OnboardingStackParamList, 'Question15'>;

interface Question15ScreenProps {
  navigation: Question15ScreenNavigationProp;
}

export const Question15Screen: React.FC<Question15ScreenProps> = ({ navigation }) => {
  const { theme } = useTheme();
  const { updateOnboardingData } = useUserData();
  
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([]);

  const equipment = [
    { id: 'barbell', label: 'Barre olympique', emoji: '🏋️', description: 'Barre de 20kg + poids' },
    { id: 'dumbbells', label: 'Haltères', emoji: '💪', description: 'Haltères réglables ou fixes' },
    { id: 'kettlebells', label: 'Kettlebells', emoji: '⚫', description: 'Poids russes' },
    { id: 'cable_machine', label: 'Machine à câbles', emoji: '🔗', description: 'Poulie haute/basse' },
    { id: 'pull_up_bar', label: 'Barre de traction', emoji: '⬆️', description: 'Fixe ou de porte' },
    { id: 'bench', label: 'Banc de musculation', emoji: '🪑', description: 'Inclinable ou plat' },
    { id: 'squat_rack', label: 'Rack à squat', emoji: '🏗️', description: 'Power rack ou squat stand' },
    { id: 'resistance_bands', label: 'Élastiques', emoji: '🔴', description: 'Bandes de résistance' },
    { id: 'suspension_trainer', label: 'Sangles TRX', emoji: '🔶', description: 'Suspension trainer' },
    { id: 'cardio_machine', label: 'Machine cardio', emoji: '🏃', description: 'Tapis, vélo, elliptique...' },
    { id: 'medicine_ball', label: 'Medecine ball', emoji: '🏀', description: 'Ballon lesté' },
    { id: 'foam_roller', label: 'Rouleau de massage', emoji: '🌊', description: 'Pour récupération' },
    { id: 'yoga_mat', label: 'Tapis de yoga', emoji: '🧘', description: 'Tapis d\'exercice' },
    { id: 'ab_wheel', label: 'Roue abdos', emoji: '⭕', description: 'Ab roller' },
    { id: 'parallettes', label: 'Parallettes', emoji: '=', description: 'Barres parallèles basses' },
    { id: 'none', label: 'Aucun équipement', emoji: '🚫', description: 'Poids du corps uniquement' },
  ];

  const handleEquipmentToggle = (equipmentId: string) => {
    setSelectedEquipment(prev => {
      if (equipmentId === 'none') {
        return prev.includes('none') ? [] : ['none'];
      }
      
      const withoutNone = prev.filter(id => id !== 'none');
      if (withoutNone.includes(equipmentId)) {
        return withoutNone.filter(id => id !== equipmentId);
      } else {
        return [...withoutNone, equipmentId];
      }
    });
  };

  const handleNext = () => {
    updateOnboardingData({ availableEquipment: selectedEquipment });
    navigation.navigate('Question16');
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
                    width: `${(15/26) * 100}%` 
                  }
                ]} 
              />
            </View>
            <Text style={[styles.progressText, { color: theme.colors.text.light }]}>
              15 / 26
            </Text>
          </View>
        </View>

        <View style={styles.content}>
          <Text style={[styles.title, { color: theme.colors.text.primary }]}>
            Quel équipement avez-vous à disposition ?
          </Text>
          
          <Text style={[styles.subtitle, { color: theme.colors.text.secondary }]}>
            Sélectionnez tout l'équipement disponible (choix multiple)
          </Text>

          <View style={styles.optionsContainer}>
            {equipment.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.option,
                  {
                    borderColor: selectedEquipment.includes(item.id) ? theme.colors.primary : theme.colors.neutral[300],
                    backgroundColor: selectedEquipment.includes(item.id) ? theme.colors.primary + '10' : theme.colors.surface,
                  }
                ]}
                onPress={() => handleEquipmentToggle(item.id)}
              >
                <View style={styles.optionHeader}>
                  <Text style={styles.emoji}>{item.emoji}</Text>
                  <View style={styles.optionContent}>
                    <Text style={[
                      styles.optionTitle,
                      {
                        color: selectedEquipment.includes(item.id) ? theme.colors.primary : theme.colors.text.primary,
                        fontWeight: selectedEquipment.includes(item.id) ? '600' : '500',
                      }
                    ]}>
                      {item.label}
                    </Text>
                    <Text style={[styles.optionDescription, { color: theme.colors.text.light }]}>
                      {item.description}
                    </Text>
                  </View>
                  {selectedEquipment.includes(item.id) && (
                    <Text style={[styles.checkmark, { color: theme.colors.primary }]}>✓</Text>
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
          
          <Text style={[styles.selectedCount, { color: theme.colors.text.secondary }]}>
            {selectedEquipment.length} équipement(s) sélectionné(s)
          </Text>
        </View>

        <View style={styles.footer}>
          <Button
            title="Continuer"
            onPress={handleNext}
            disabled={selectedEquipment.length === 0}
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
    padding: 16,
    borderWidth: 2,
    borderRadius: 12,
  },
  optionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  emoji: {
    fontSize: 24,
    minWidth: 30,
    textAlign: 'center',
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  optionDescription: {
    fontSize: 14,
    marginTop: 2,
  },
  checkmark: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  selectedCount: {
    textAlign: 'center',
    fontSize: 14,
    marginTop: 20,
    fontStyle: 'italic',
  },
  footer: {
    paddingTop: 20,
  },
});