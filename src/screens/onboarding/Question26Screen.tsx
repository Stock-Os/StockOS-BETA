import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTheme } from '../../contexts/ThemeContext';
import { useUserData } from '../../contexts/UserDataContext';
import { Button } from '../../components/ui/Button';
import { OnboardingStackParamList } from '../../types';
import Svg, { Path, Circle } from 'react-native-svg';

type Question26ScreenNavigationProp = StackNavigationProp<OnboardingStackParamList, 'Question26'>;

interface Question26ScreenProps {
  navigation: Question26ScreenNavigationProp;
}

export const Question26Screen: React.FC<Question26ScreenProps> = ({ navigation }) => {
  const { theme } = useTheme();
  const { updateOnboardingData, completeOnboarding, onboardingData } = useUserData();
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState('');

  const generateProgram = async () => {
    setIsGenerating(true);
    
    try {
      // Simulation de la génération IA du programme
      setGenerationStep('Analyse de votre profil...');
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setGenerationStep('Calcul de vos besoins caloriques...');
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setGenerationStep('Création de votre programme d\'entraînement...');
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setGenerationStep('Génération de vos plans de repas...');
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setGenerationStep('Finalisation...');
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Finaliser l'onboarding
      await completeOnboarding();
      
      Alert.alert(
        'Programme généré !',
        'Votre programme personnalisé Stock OS est prêt. Bienvenue dans votre transformation !',
        [
          {
            text: 'Commencer',
            onPress: () => navigation.reset({
              index: 0,
              routes: [{ name: 'MainTabs' as any }],
            }),
          }
        ]
      );
      
    } catch (error) {
      Alert.alert('Erreur', 'Une erreur est survenue lors de la génération de votre programme');
    } finally {
      setIsGenerating(false);
    }
  };

  const LoadingIcon = () => (
    <Svg width={80} height={80} viewBox="0 0 24 24">
      <Circle
        cx={12}
        cy={12}
        r={10}
        stroke={theme.colors.primary}
        strokeWidth={2}
        fill="none"
        strokeLinecap="round"
        strokeDasharray="60"
        strokeDashoffset="60"
      >
        {/* Animation serait ajoutée avec Reanimated */}
      </Circle>
      <Path
        d="M12 6V12l4 2"
        stroke={theme.colors.primary}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );

  const SuccessIcon = () => (
    <Svg width={80} height={80} viewBox="0 0 24 24">
      <Circle
        cx={12}
        cy={12}
        r={10}
        fill={theme.colors.primary}
      />
      <Path
        d="M9 12l2 2 4-4"
        stroke="white"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
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
                    width: '100%'
                  }
                ]} 
              />
            </View>
            <Text style={[styles.progressText, { color: theme.colors.text.light }]}>
              26 / 26
            </Text>
          </View>
        </View>

        <View style={styles.content}>
          {!isGenerating ? (
            <>
              <Text style={[styles.title, { color: theme.colors.text.primary }]}>
                Félicitations {onboardingData?.firstName} !
              </Text>
              
              <Text style={[styles.subtitle, { color: theme.colors.text.secondary }]}>
                Vous avez terminé votre évaluation. Nous allons maintenant générer votre programme personnalisé Stock OS basé sur vos réponses.
              </Text>

              <View style={styles.summaryContainer}>
                <Text style={[styles.summaryTitle, { color: theme.colors.text.primary }]}>
                  Votre profil :
                </Text>
                <Text style={[styles.summaryText, { color: theme.colors.text.secondary }]}>
                  • {onboardingData?.gender === 'male' ? 'Homme' : 'Femme'}, {onboardingData?.age} ans
                </Text>
                <Text style={[styles.summaryText, { color: theme.colors.text.secondary }]}>
                  • {onboardingData?.height}cm, {onboardingData?.currentWeight}kg → {onboardingData?.targetWeight}kg
                </Text>
                <Text style={[styles.summaryText, { color: theme.colors.text.secondary }]}>
                  • Niveau: {onboardingData?.activityLevel}
                </Text>
                <Text style={[styles.summaryText, { color: theme.colors.text.secondary }]}>
                  • {onboardingData?.workoutDaysPerWeek} jours/semaine, {onboardingData?.workoutDuration}min/séance
                </Text>
              </View>
            </>
          ) : (
            <>
              <View style={styles.loadingIcon}>
                <LoadingIcon />
              </View>
              
              <Text style={[styles.loadingTitle, { color: theme.colors.text.primary }]}>
                Génération en cours...
              </Text>
              
              <Text style={[styles.loadingSubtitle, { color: theme.colors.primary }]}>
                {generationStep}
              </Text>
            </>
          )}
        </View>

        <View style={styles.footer}>
          {!isGenerating && (
            <Button
              title="Générer mon programme Stock OS"
              onPress={generateProgram}
              fullWidth
            />
          )}
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
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 40,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
  },
  summaryContainer: {
    backgroundColor: 'rgba(254, 129, 76, 0.1)',
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  summaryText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 4,
  },
  loadingIcon: {
    marginBottom: 24,
  },
  loadingTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  loadingSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '500',
  },
  footer: {
    paddingTop: 20,
  },
});