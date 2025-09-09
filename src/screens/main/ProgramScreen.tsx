import React, { useState } from 'react';
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
import { Button } from '../../components/ui/Button';
import Svg, { Path, Circle } from 'react-native-svg';

export const ProgramScreen: React.FC = () => {
  const { theme } = useTheme();
  const { userData } = useUserData();
  
  const [selectedWeek, setSelectedWeek] = useState(1);

  const workoutProgram = {
    currentWeek: 1,
    totalWeeks: 12,
    workouts: [
      {
        id: 1,
        name: 'Push - Pectoraux, Épaules, Triceps',
        duration: '45 min',
        difficulty: 'Intermédiaire',
        exercises: 6,
        completed: false,
        date: 'Aujourd\'hui',
      },
      {
        id: 2,
        name: 'Pull - Dos, Biceps',
        duration: '45 min',
        difficulty: 'Intermédiaire',
        exercises: 5,
        completed: true,
        date: 'Hier',
      },
      {
        id: 3,
        name: 'Legs - Jambes, Fessiers',
        duration: '50 min',
        difficulty: 'Avancé',
        exercises: 7,
        completed: false,
        date: 'Demain',
      },
    ],
  };

  const PlayIcon = () => (
    <Svg width={24} height={24} viewBox="0 0 24 24">
      <Path
        d="M8 5v14l11-7z"
        fill={theme.colors.text.inverse}
      />
    </Svg>
  );

  const CheckIcon = () => (
    <Svg width={24} height={24} viewBox="0 0 24 24">
      <Path
        d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"
        fill={theme.colors.semantic.success}
      />
    </Svg>
  );

  const CalendarIcon = () => (
    <Svg width={20} height={20} viewBox="0 0 24 24">
      <Path
        d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.89-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.11-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"
        fill={theme.colors.text.light}
      />
    </Svg>
  );

  const FireIcon = () => (
    <Svg width={20} height={20} viewBox="0 0 24 24">
      <Path
        d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67z"
        fill={theme.colors.semantic.warning}
      />
    </Svg>
  );

  const startWorkout = (workoutId: number) => {
    Alert.alert(
      'Démarrer l\'entraînement',
      'Cette fonctionnalité sera bientôt disponible',
      [{ text: 'OK' }]
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.colors.text.primary }]}>
            Mon Programme
          </Text>
          <Text style={[styles.subtitle, { color: theme.colors.text.secondary }]}>
            Semaine {workoutProgram.currentWeek} sur {workoutProgram.totalWeeks}
          </Text>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressSection}>
          <View style={[styles.progressBar, { backgroundColor: theme.colors.neutral[200] }]}>
            <View 
              style={[
                styles.progress, 
                { 
                  backgroundColor: theme.colors.primary,
                  width: `${(workoutProgram.currentWeek / workoutProgram.totalWeeks) * 100}%`
                }
              ]} 
            />
          </View>
          <Text style={[styles.progressText, { color: theme.colors.text.light }]}>
            {Math.round((workoutProgram.currentWeek / workoutProgram.totalWeeks) * 100)}% du programme terminé
          </Text>
        </View>

        {/* Week Selector */}
        <View style={styles.weekSelector}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.weekSelectorContent}>
            {Array.from({ length: workoutProgram.totalWeeks }, (_, index) => (
              <TouchableOpacity
                key={index + 1}
                style={[
                  styles.weekButton,
                  {
                    backgroundColor: selectedWeek === index + 1 ? theme.colors.primary : theme.colors.surface,
                  }
                ]}
                onPress={() => setSelectedWeek(index + 1)}
              >
                <Text style={[
                  styles.weekButtonText,
                  {
                    color: selectedWeek === index + 1 ? theme.colors.text.inverse : theme.colors.text.primary,
                  }
                ]}>
                  S{index + 1}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Workouts */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
            Entraînements de la semaine
          </Text>

          {workoutProgram.workouts.map((workout) => (
            <View key={workout.id} style={[styles.workoutCard, { backgroundColor: theme.colors.surface }]}>
              <View style={styles.workoutHeader}>
                <View style={styles.workoutInfo}>
                  <Text style={[styles.workoutName, { color: theme.colors.text.primary }]}>
                    {workout.name}
                  </Text>
                  <View style={styles.workoutMeta}>
                    <View style={styles.metaItem}>
                      <CalendarIcon />
                      <Text style={[styles.metaText, { color: theme.colors.text.light }]}>
                        {workout.duration}
                      </Text>
                    </View>
                    <View style={styles.metaItem}>
                      <FireIcon />
                      <Text style={[styles.metaText, { color: theme.colors.text.light }]}>
                        {workout.exercises} exercices
                      </Text>
                    </View>
                  </View>
                </View>
                
                {workout.completed ? (
                  <View style={[styles.completedBadge, { backgroundColor: theme.colors.semantic.success + '20' }]}>
                    <CheckIcon />
                  </View>
                ) : (
                  <TouchableOpacity
                    style={[styles.playButton, { backgroundColor: theme.colors.primary }]}
                    onPress={() => startWorkout(workout.id)}
                  >
                    <PlayIcon />
                  </TouchableOpacity>
                )}
              </View>

              <View style={styles.workoutFooter}>
                <Text style={[styles.workoutDate, { color: theme.colors.text.secondary }]}>
                  {workout.date}
                </Text>
                <View style={[
                  styles.difficultyBadge,
                  {
                    backgroundColor: workout.difficulty === 'Avancé' ? theme.colors.semantic.error + '20' :
                      workout.difficulty === 'Intermédiaire' ? theme.colors.semantic.warning + '20' :
                      theme.colors.semantic.success + '20'
                  }
                ]}>
                  <Text style={[
                    styles.difficultyText,
                    {
                      color: workout.difficulty === 'Avancé' ? theme.colors.semantic.error :
                        workout.difficulty === 'Intermédiaire' ? theme.colors.semantic.warning :
                        theme.colors.semantic.success
                    }
                  ]}>
                    {workout.difficulty}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Quick Stats */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
            Mes statistiques
          </Text>

          <View style={[styles.statsCard, { backgroundColor: theme.colors.surface }]}>
            <View style={styles.statRow}>
              <Text style={[styles.statLabel, { color: theme.colors.text.secondary }]}>
                Entraînements cette semaine
              </Text>
              <Text style={[styles.statValue, { color: theme.colors.text.primary }]}>
                1/3
              </Text>
            </View>

            <View style={styles.statRow}>
              <Text style={[styles.statLabel, { color: theme.colors.text.secondary }]}>
                Temps total cette semaine
              </Text>
              <Text style={[styles.statValue, { color: theme.colors.text.primary }]}>
                45 min
              </Text>
            </View>

            <View style={styles.statRow}>
              <Text style={[styles.statLabel, { color: theme.colors.text.secondary }]}>
                Série actuelle
              </Text>
              <Text style={[styles.statValue, { color: theme.colors.primary }]}>
                7 jours 🔥
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
    paddingBottom: 100,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
  },
  progressSection: {
    marginBottom: 24,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    marginBottom: 8,
  },
  progress: {
    height: '100%',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    textAlign: 'center',
  },
  weekSelector: {
    marginBottom: 32,
  },
  weekSelectorContent: {
    paddingHorizontal: 4,
    gap: 8,
  },
  weekButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    minWidth: 50,
    alignItems: 'center',
  },
  weekButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  workoutCard: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
  },
  workoutHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  workoutInfo: {
    flex: 1,
    marginRight: 16,
  },
  workoutName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    lineHeight: 22,
  },
  workoutMeta: {
    flexDirection: 'row',
    gap: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 14,
  },
  playButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  completedBadge: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  workoutFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  workoutDate: {
    fontSize: 14,
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: '600',
  },
  statsCard: {
    padding: 20,
    borderRadius: 16,
    gap: 16,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 14,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '600',
  },
});