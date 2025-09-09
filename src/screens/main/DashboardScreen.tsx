import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../contexts/ThemeContext';
import { useUserData } from '../../contexts/UserDataContext';
import { useAuth } from '../../contexts/AuthContext';
import { StepsTracker } from '../../components/ui/StepsTracker';
import { CaloriesTracker } from '../../components/ui/CaloriesTracker';
import { HydrationTracker } from '../../components/ui/HydrationTracker';
import { MoodSelector } from '../../components/ui/MoodSelector';
import Svg, { Path, Circle } from 'react-native-svg';

export const DashboardScreen: React.FC = () => {
  const { theme } = useTheme();
  const { userData, dailyData, updateDailyData } = useUserData();
  const { user } = useAuth();
  
  const [currentDate] = useState(new Date().toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }));

  // Example daily goals based on user data
  const dailyGoals = {
    calories: 2200, // Would be calculated based on user profile
    steps: 10000,
    water: 8, // glasses
    workouts: userData?.workoutDaysPerWeek || 3,
  };

  const todayProgress = {
    calories: dailyData?.caloriesConsumed || 0,
    steps: dailyData?.steps || 0,
    water: dailyData?.waterGlasses || 0,
    mood: dailyData?.mood || 'neutral',
    workoutCompleted: dailyData?.workoutCompleted || false,
  };

  const FireIcon = () => (
    <Svg width={24} height={24} viewBox="0 0 24 24">
      <Path
        d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04.01 2.65-2.15 4.8-4.8 4.8z"
        fill={theme.colors.semantic.warning}
      />
    </Svg>
  );

  const DropletIcon = () => (
    <Svg width={24} height={24} viewBox="0 0 24 24">
      <Path
        d="M12 2l-7 9c0 3.87 3.13 7 7 7s7-3.13 7-7l-7-9z"
        fill={theme.colors.semantic.info}
      />
    </Svg>
  );

  const HeartIcon = () => (
    <Svg width={24} height={24} viewBox="0 0 24 24">
      <Path
        d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
        fill={theme.colors.semantic.error}
      />
    </Svg>
  );

  const TrophyIcon = () => (
    <Svg width={24} height={24} viewBox="0 0 24 24">
      <Path
        d="M7 4V2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v2h1a3 3 0 0 1 3 3v1a3 3 0 0 1-3 3h-1v1a4 4 0 0 1-4 4h-2a4 4 0 0 1-4-4v-1H6a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h1z"
        fill={theme.colors.primary}
      />
    </Svg>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={[styles.greeting, { color: theme.colors.text.secondary }]}>
              Bonjour {userData?.firstName || user?.displayName || 'Champion'} 👋
            </Text>
            <Text style={[styles.date, { color: theme.colors.text.primary }]}>
              {currentDate}
            </Text>
          </View>
          
          <TouchableOpacity style={[styles.streakBadge, { backgroundColor: theme.colors.primary + '20' }]}>
            <FireIcon />
            <Text style={[styles.streakText, { color: theme.colors.primary }]}>
              7j
            </Text>
          </TouchableOpacity>
        </View>

        {/* Quick Stats */}
        <View style={styles.quickStatsContainer}>
          <View style={[styles.quickStat, { backgroundColor: theme.colors.surface }]}>
            <HeartIcon />
            <Text style={[styles.quickStatNumber, { color: theme.colors.text.primary }]}>
              {Math.round((todayProgress.calories / dailyGoals.calories) * 100)}%
            </Text>
            <Text style={[styles.quickStatLabel, { color: theme.colors.text.secondary }]}>
              Calories
            </Text>
          </View>

          <View style={[styles.quickStat, { backgroundColor: theme.colors.surface }]}>
            <DropletIcon />
            <Text style={[styles.quickStatNumber, { color: theme.colors.text.primary }]}>
              {todayProgress.water}/{dailyGoals.water}
            </Text>
            <Text style={[styles.quickStatLabel, { color: theme.colors.text.secondary }]}>
              Verres
            </Text>
          </View>

          <View style={[styles.quickStat, { backgroundColor: theme.colors.surface }]}>
            <TrophyIcon />
            <Text style={[styles.quickStatNumber, { color: theme.colors.text.primary }]}>
              {todayProgress.workoutCompleted ? '✓' : '0/1'}
            </Text>
            <Text style={[styles.quickStatLabel, { color: theme.colors.text.secondary }]}>
              Workout
            </Text>
          </View>
        </View>

        {/* Today's Progress */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
            Progression du jour
          </Text>

          <View style={styles.trackersContainer}>
            <CaloriesTracker
              current={todayProgress.calories}
              goal={dailyGoals.calories}
              onUpdate={(calories) => updateDailyData({ caloriesConsumed: calories })}
            />

            <StepsTracker
              steps={todayProgress.steps}
              goal={dailyGoals.steps}
              onUpdate={(steps) => updateDailyData({ steps })}
            />

            <HydrationTracker
              current={todayProgress.water}
              goal={dailyGoals.water}
              onUpdate={(glasses) => updateDailyData({ waterGlasses: glasses })}
            />
          </View>
        </View>

        {/* Mood Check */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
            Comment vous sentez-vous ?
          </Text>

          <MoodSelector
            selectedMood={todayProgress.mood}
            onMoodChange={(mood) => updateDailyData({ mood })}
          />
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
            Actions rapides
          </Text>

          <View style={styles.actionsContainer}>
            <TouchableOpacity 
              style={[styles.actionButton, { backgroundColor: theme.colors.primary }]}
              onPress={() => Alert.alert('Workout', 'Fonctionnalité bientôt disponible')}
            >
              <Text style={[styles.actionButtonText, { color: theme.colors.text.inverse }]}>
                🏋️‍♂️ Commencer l'entraînement
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.actionButton, { backgroundColor: theme.colors.surface, borderWidth: 2, borderColor: theme.colors.primary }]}
              onPress={() => Alert.alert('Nutrition', 'Fonctionnalité bientôt disponible')}
            >
              <Text style={[styles.actionButtonText, { color: theme.colors.primary }]}>
                🍎 Scanner un aliment
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Weekly Overview */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
            Cette semaine
          </Text>

          <View style={[styles.weeklyCard, { backgroundColor: theme.colors.surface }]}>
            <View style={styles.weeklyRow}>
              <Text style={[styles.weeklyLabel, { color: theme.colors.text.secondary }]}>
                Entraînements
              </Text>
              <Text style={[styles.weeklyValue, { color: theme.colors.text.primary }]}>
                2/3
              </Text>
            </View>

            <View style={styles.weeklyRow}>
              <Text style={[styles.weeklyLabel, { color: theme.colors.text.secondary }]}>
                Calories moyennes
              </Text>
              <Text style={[styles.weeklyValue, { color: theme.colors.text.primary }]}>
                2.1k
              </Text>
            </View>

            <View style={styles.weeklyRow}>
              <Text style={[styles.weeklyLabel, { color: theme.colors.text.secondary }]}>
                Pas moyens
              </Text>
              <Text style={[styles.weeklyValue, { color: theme.colors.text.primary }]}>
                8.2k
              </Text>
            </View>
          </View>
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
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 100, // Account for tab bar
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  greeting: {
    fontSize: 16,
    marginBottom: 4,
  },
  date: {
    fontSize: 24,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  streakText: {
    fontSize: 14,
    fontWeight: '600',
  },
  quickStatsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
    gap: 12,
  },
  quickStat: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    gap: 8,
  },
  quickStatNumber: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  quickStatLabel: {
    fontSize: 12,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  trackersContainer: {
    gap: 16,
  },
  actionsContainer: {
    gap: 12,
  },
  actionButton: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  weeklyCard: {
    padding: 20,
    borderRadius: 16,
    gap: 16,
  },
  weeklyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  weeklyLabel: {
    fontSize: 14,
  },
  weeklyValue: {
    fontSize: 16,
    fontWeight: '600',
  },
});