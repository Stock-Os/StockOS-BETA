import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';

interface CaloriesTrackerProps {
  onUpdate?: (calories: number) => void;
  initialCalories?: number;
  targetCalories?: number;
}

export const CaloriesTracker: React.FC<CaloriesTrackerProps> = ({
  onUpdate,
  initialCalories = 0,
  targetCalories = 2000,
}) => {
  const { theme } = useTheme();
  const [calories, setCalories] = useState(initialCalories.toString());

  const handleCaloriesChange = (text: string) => {
    const numericValue = text.replace(/[^0-9]/g, '');
    setCalories(numericValue);
    if (onUpdate && numericValue) {
      onUpdate(parseInt(numericValue, 10));
    }
  };

  const progress = Math.min((parseInt(calories, 10) || 0) / targetCalories, 1);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.surface }]}>
      <Text style={[styles.title, { color: theme.colors.text.primary }]}>
        Calories consommées
      </Text>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={[
            styles.input,
            {
              color: theme.colors.text.primary,
              borderColor: theme.colors.neutral[300],
            }
          ]}
          value={calories}
          onChangeText={handleCaloriesChange}
          placeholder="0"
          placeholderTextColor={theme.colors.text.light}
          keyboardType="numeric"
        />
        <Text style={[styles.unit, { color: theme.colors.text.light }]}>
          / {targetCalories} kcal
        </Text>
      </View>

      <View style={[styles.progressBar, { backgroundColor: theme.colors.neutral[200] }]}>
        <View
          style={[
            styles.progressFill,
            {
              backgroundColor: theme.colors.primary,
              width: `${progress * 100}%`,
            }
          ]}
        />
      </View>

      <Text style={[styles.percentage, { color: theme.colors.text.light }]}>
        {Math.round(progress * 100)}% de l'objectif
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 12,
    marginVertical: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 12,
  },
  input: {
    fontSize: 24,
    fontWeight: 'bold',
    borderBottomWidth: 1,
    paddingBottom: 4,
    marginRight: 8,
    minWidth: 60,
  },
  unit: {
    fontSize: 16,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  percentage: {
    fontSize: 14,
    textAlign: 'center',
  },
});