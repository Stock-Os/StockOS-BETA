import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { useTheme } from '../../contexts/ThemeContext';
import { MoodRating } from '../../types';

interface MoodOption {
  value: MoodRating;
  emoji: string;
  label: string;
  color: string;
}

interface MoodSelectorProps {
  selectedMood?: MoodRating;
  onMoodChange: (mood: MoodRating) => void;
  showLabels?: boolean;
}

export const MoodSelector: React.FC<MoodSelectorProps> = ({
  selectedMood,
  onMoodChange,
  showLabels = true,
}) => {
  const { theme } = useTheme();
  
  const moodOptions: MoodOption[] = [
    { value: 5, emoji: '😊', label: 'Excellent', color: theme.colors.rating.excellent },
    { value: 4, emoji: '🙂', label: 'Bien', color: theme.colors.rating.good },
    { value: 3, emoji: '😐', label: 'Neutre', color: theme.colors.rating.neutral },
    { value: 2, emoji: '😕', label: 'Aïe', color: theme.colors.rating.bad },
    { value: 1, emoji: '😢', label: 'Terrible', color: theme.colors.rating.terrible },
  ];

  const renderMoodOption = (option: MoodOption) => {
    const isSelected = selectedMood === option.value;
    const scaleValue = useSharedValue(isSelected ? 1.1 : 1);
    
    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [{ scale: withSpring(scaleValue.value) }],
      };
    });

    const handlePress = () => {
      scaleValue.value = withSpring(1.2, { damping: 10 }, () => {
        scaleValue.value = withSpring(1.1);
      });
      onMoodChange(option.value);
    };

    return (
      <TouchableOpacity
        key={option.value}
        onPress={handlePress}
        style={styles.moodOption}
        activeOpacity={0.7}
      >
        <Animated.View
          style={[
            styles.moodCircle,
            {
              backgroundColor: isSelected ? option.color : theme.colors.surface,
              borderColor: isSelected ? option.color : theme.colors.neutral[300],
              borderWidth: isSelected ? 3 : 2,
            },
            animatedStyle,
          ]}
        >
          <Text style={styles.moodEmoji}>{option.emoji}</Text>
        </Animated.View>
        {showLabels && (
          <Text
            style={[
              styles.moodLabel,
              {
                color: isSelected ? option.color : theme.colors.text.light,
                fontWeight: isSelected ? theme.fontWeight.bold : theme.fontWeight.normal,
              }
            ]}
          >
            {option.label}
          </Text>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {moodOptions.map(renderMoodOption)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  moodOption: {
    alignItems: 'center',
    padding: 8,
  },
  moodCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  moodEmoji: {
    fontSize: 28,
  },
  moodLabel: {
    fontSize: 12,
    textAlign: 'center',
    minWidth: 50,
  },
});