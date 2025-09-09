import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import Svg, { Path } from 'react-native-svg';

interface HydrationTrackerProps {
  onUpdate?: (glasses: number) => void;
  initialGlasses?: number;
  targetGlasses?: number;
}

export const HydrationTracker: React.FC<HydrationTrackerProps> = ({
  onUpdate,
  initialGlasses = 0,
  targetGlasses = 8,
}) => {
  const { theme } = useTheme();
  const [glasses, setGlasses] = useState(initialGlasses);

  const handleIncrement = () => {
    const newValue = Math.min(glasses + 1, targetGlasses * 2);
    setGlasses(newValue);
    onUpdate?.(newValue);
  };

  const handleDecrement = () => {
    const newValue = Math.max(glasses - 1, 0);
    setGlasses(newValue);
    onUpdate?.(newValue);
  };

  const progress = Math.min(glasses / targetGlasses, 1);

  const WaterDropIcon = () => (
    <Svg width={20} height={20} viewBox="0 0 24 24">
      <Path
        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        fill={theme.colors.primary}
      />
    </Svg>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.surface }]}>
      <Text style={[styles.title, { color: theme.colors.text.primary }]}>
        Hydratation
      </Text>
      
      <View style={styles.counterContainer}>
        <TouchableOpacity
          style={[styles.button, { borderColor: theme.colors.neutral[300] }]}
          onPress={handleDecrement}
        >
          <Text style={[styles.buttonText, { color: theme.colors.text.primary }]}>-</Text>
        </TouchableOpacity>
        
        <View style={styles.valueContainer}>
          <Text style={[styles.value, { color: theme.colors.primary }]}>
            {glasses}
          </Text>
          <Text style={[styles.unit, { color: theme.colors.text.light }]}>
            / {targetGlasses} verres
          </Text>
        </View>
        
        <TouchableOpacity
          style={[styles.button, { borderColor: theme.colors.neutral[300] }]}
          onPress={handleIncrement}
        >
          <Text style={[styles.buttonText, { color: theme.colors.text.primary }]}>+</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.glassesContainer}>
        {Array.from({ length: targetGlasses }, (_, index) => (
          <View
            key={index}
            style={[
              styles.glass,
              {
                backgroundColor: index < glasses ? theme.colors.primary : theme.colors.neutral[200],
              }
            ]}
          />
        ))}
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
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  button: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  valueContainer: {
    alignItems: 'center',
    marginHorizontal: 24,
  },
  value: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  unit: {
    fontSize: 14,
    marginTop: 4,
  },
  glassesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  glass: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  percentage: {
    fontSize: 14,
    textAlign: 'center',
  },
});