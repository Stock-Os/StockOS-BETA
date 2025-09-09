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
import { Button } from '../../components/ui/Button';
import Svg, { Path, Circle } from 'react-native-svg';

export const NutritionScreen: React.FC = () => {
  const { theme } = useTheme();
  
  const dailyGoals = {
    calories: 2200,
    protein: 165, // g
    carbs: 275, // g
    fat: 73, // g
    fiber: 28, // g
  };

  const consumed = {
    calories: 1650,
    protein: 120,
    carbs: 180,
    fat: 55,
    fiber: 18,
  };

  const meals = [
    {
      id: 1,
      name: 'Petit-déjeuner',
      time: '07:30',
      calories: 450,
      foods: ['Avoine', 'Banane', 'Amandes', 'Lait d\'amande'],
      completed: true,
    },
    {
      id: 2,
      name: 'Collation',
      time: '10:30',
      calories: 200,
      foods: ['Pomme', 'Beurre de cacahuète'],
      completed: true,
    },
    {
      id: 3,
      name: 'Déjeuner',
      time: '13:00',
      calories: 600,
      foods: ['Poulet grillé', 'Riz complet', 'Brocolis', 'Avocat'],
      completed: true,
    },
    {
      id: 4,
      name: 'Collation pré-workout',
      time: '16:00',
      calories: 150,
      foods: ['Banane', 'Café'],
      completed: false,
    },
    {
      id: 5,
      name: 'Dîner',
      time: '19:30',
      calories: 550,
      foods: ['Saumon', 'Quinoa', 'Légumes verts', 'Huile d\'olive'],
      completed: false,
    },
  ];

  const ScanIcon = () => (
    <Svg width={24} height={24} viewBox="0 0 24 24">
      <Path
        d="M9.5 6.5v3h-3v-3h3M11 5H5v6h6V5zm-1.5 9.5v3h-3v-3h3M11 13H5v6h6v-6zm6.5-6.5v3h-3v-3h3M19 5h-6v6h6V5zm-6.5 9.5v3h-3v-3h3M13 13h6v6h-6v-6z"
        fill={theme.colors.text.inverse}
      />
    </Svg>
  );

  const AddIcon = () => (
    <Svg width={24} height={24} viewBox="0 0 24 24">
      <Path
        d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"
        fill={theme.colors.primary}
      />
    </Svg>
  );

  const CheckIcon = () => (
    <Svg width={20} height={20} viewBox="0 0 24 24">
      <Path
        d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"
        fill={theme.colors.semantic.success}
      />
    </Svg>
  );

  const getPercentage = (current: number, goal: number) => {
    return Math.min((current / goal) * 100, 100);
  };

  const getColorForMacro = (macro: string) => {
    switch (macro) {
      case 'protein': return theme.colors.semantic.error;
      case 'carbs': return theme.colors.semantic.warning;
      case 'fat': return theme.colors.semantic.info;
      default: return theme.colors.primary;
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.colors.text.primary }]}>
            Nutrition
          </Text>
          <Text style={[styles.subtitle, { color: theme.colors.text.secondary }]}>
            {consumed.calories} / {dailyGoals.calories} kcal aujourd'hui
          </Text>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity 
            style={[styles.actionButton, { backgroundColor: theme.colors.primary }]}
            onPress={() => Alert.alert('Scanner', 'Fonctionnalité bientôt disponible')}
          >
            <ScanIcon />
            <Text style={[styles.actionButtonText, { color: theme.colors.text.inverse }]}>
              Scanner
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.actionButton, { backgroundColor: theme.colors.surface, borderWidth: 2, borderColor: theme.colors.primary }]}
            onPress={() => Alert.alert('Ajouter', 'Fonctionnalité bientôt disponible')}
          >
            <AddIcon />
            <Text style={[styles.actionButtonText, { color: theme.colors.primary }]}>
              Ajouter
            </Text>
          </TouchableOpacity>
        </View>

        {/* Calories Progress */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
            Calories aujourd'hui
          </Text>

          <View style={[styles.caloriesCard, { backgroundColor: theme.colors.surface }]}>
            <View style={styles.caloriesHeader}>
              <Text style={[styles.caloriesConsumed, { color: theme.colors.text.primary }]}>
                {consumed.calories}
              </Text>
              <Text style={[styles.caloriesGoal, { color: theme.colors.text.secondary }]}>
                / {dailyGoals.calories} kcal
              </Text>
            </View>

            <View style={[styles.progressBar, { backgroundColor: theme.colors.neutral[200] }]}>
              <View 
                style={[
                  styles.progress, 
                  { 
                    backgroundColor: theme.colors.primary,
                    width: `${getPercentage(consumed.calories, dailyGoals.calories)}%`
                  }
                ]} 
              />
            </View>

            <Text style={[styles.remainingText, { color: theme.colors.text.secondary }]}>
              Reste {dailyGoals.calories - consumed.calories} kcal
            </Text>
          </View>
        </View>

        {/* Macros */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
            Macronutriments
          </Text>

          <View style={styles.macrosContainer}>
            <View style={[styles.macroCard, { backgroundColor: theme.colors.surface }]}>
              <Text style={[styles.macroName, { color: theme.colors.text.secondary }]}>Protéines</Text>
              <Text style={[styles.macroValue, { color: theme.colors.text.primary }]}>
                {consumed.protein}g
              </Text>
              <View style={[styles.macroProgressBar, { backgroundColor: theme.colors.neutral[200] }]}>
                <View 
                  style={[
                    styles.macroProgress, 
                    { 
                      backgroundColor: getColorForMacro('protein'),
                      width: `${getPercentage(consumed.protein, dailyGoals.protein)}%`
                    }
                  ]} 
                />
              </View>
              <Text style={[styles.macroGoal, { color: theme.colors.text.light }]}>
                /{dailyGoals.protein}g
              </Text>
            </View>

            <View style={[styles.macroCard, { backgroundColor: theme.colors.surface }]}>
              <Text style={[styles.macroName, { color: theme.colors.text.secondary }]}>Glucides</Text>
              <Text style={[styles.macroValue, { color: theme.colors.text.primary }]}>
                {consumed.carbs}g
              </Text>
              <View style={[styles.macroProgressBar, { backgroundColor: theme.colors.neutral[200] }]}>
                <View 
                  style={[
                    styles.macroProgress, 
                    { 
                      backgroundColor: getColorForMacro('carbs'),
                      width: `${getPercentage(consumed.carbs, dailyGoals.carbs)}%`
                    }
                  ]} 
                />
              </View>
              <Text style={[styles.macroGoal, { color: theme.colors.text.light }]}>
                /{dailyGoals.carbs}g
              </Text>
            </View>

            <View style={[styles.macroCard, { backgroundColor: theme.colors.surface }]}>
              <Text style={[styles.macroName, { color: theme.colors.text.secondary }]}>Lipides</Text>
              <Text style={[styles.macroValue, { color: theme.colors.text.primary }]}>
                {consumed.fat}g
              </Text>
              <View style={[styles.macroProgressBar, { backgroundColor: theme.colors.neutral[200] }]}>
                <View 
                  style={[
                    styles.macroProgress, 
                    { 
                      backgroundColor: getColorForMacro('fat'),
                      width: `${getPercentage(consumed.fat, dailyGoals.fat)}%`
                    }
                  ]} 
                />
              </View>
              <Text style={[styles.macroGoal, { color: theme.colors.text.light }]}>
                /{dailyGoals.fat}g
              </Text>
            </View>
          </View>
        </View>

        {/* Meals */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
            Mes repas
          </Text>

          {meals.map((meal) => (
            <View key={meal.id} style={[styles.mealCard, { backgroundColor: theme.colors.surface }]}>
              <View style={styles.mealHeader}>
                <View style={styles.mealInfo}>
                  <Text style={[styles.mealName, { color: theme.colors.text.primary }]}>
                    {meal.name}
                  </Text>
                  <Text style={[styles.mealTime, { color: theme.colors.text.secondary }]}>
                    {meal.time} • {meal.calories} kcal
                  </Text>
                </View>

                {meal.completed && (
                  <View style={[styles.completedIcon, { backgroundColor: theme.colors.semantic.success + '20' }]}>
                    <CheckIcon />
                  </View>
                )}
              </View>

              <View style={styles.foodsList}>
                {meal.foods.map((food, index) => (
                  <Text key={index} style={[styles.foodItem, { color: theme.colors.text.light }]}>
                    {food}
                  </Text>
                ))}
              </View>

              {!meal.completed && (
                <Button
                  title="Marquer comme consommé"
                  onPress={() => Alert.alert('Repas', 'Fonctionnalité bientôt disponible')}
                  variant="outline"
                  size="small"
                  style={styles.mealButton}
                />
              )}
            </View>
          ))}
        </View>

        {/* Water */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
            Hydratation
          </Text>

          <View style={[styles.waterCard, { backgroundColor: theme.colors.surface }]}>
            <Text style={[styles.waterText, { color: theme.colors.text.primary }]}>
              6 / 8 verres d'eau 💧
            </Text>
            <Button
              title="+ 1 verre"
              onPress={() => Alert.alert('Eau', 'Fonctionnalité bientôt disponible')}
              variant="outline"
              size="small"
            />
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
  quickActions: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 32,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  actionButtonText: {
    fontSize: 16,
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
  caloriesCard: {
    padding: 20,
    borderRadius: 16,
  },
  caloriesHeader: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 16,
  },
  caloriesConsumed: {
    fontSize: 32,
    fontWeight: 'bold',
    marginRight: 8,
  },
  caloriesGoal: {
    fontSize: 16,
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
  remainingText: {
    fontSize: 14,
    textAlign: 'center',
  },
  macrosContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  macroCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  macroName: {
    fontSize: 12,
    marginBottom: 8,
  },
  macroValue: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  macroProgressBar: {
    width: '100%',
    height: 4,
    borderRadius: 2,
    marginBottom: 4,
  },
  macroProgress: {
    height: '100%',
    borderRadius: 2,
  },
  macroGoal: {
    fontSize: 11,
  },
  mealCard: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 12,
  },
  mealHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  mealInfo: {
    flex: 1,
  },
  mealName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  mealTime: {
    fontSize: 14,
  },
  completedIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  foodsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  foodItem: {
    fontSize: 14,
    backgroundColor: 'rgba(254, 129, 76, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  mealButton: {
    marginTop: 8,
  },
  waterCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderRadius: 16,
  },
  waterText: {
    fontSize: 16,
    fontWeight: '600',
  },
});