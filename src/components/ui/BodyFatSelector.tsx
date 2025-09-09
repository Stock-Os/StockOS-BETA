import React from 'react';
import { View, TouchableOpacity, Image, Text, StyleSheet, Dimensions } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { BodyFatLevel } from '../../types';

interface BodyFatOption {
  level: BodyFatLevel;
  label: string;
  maleImage: string;
  femaleImage: string;
  percentage: string;
}

interface BodyFatSelectorProps {
  selectedLevel?: BodyFatLevel;
  gender: 'male' | 'female';
  onLevelChange: (level: BodyFatLevel) => void;
}

const { width: screenWidth } = Dimensions.get('window');
const itemWidth = (screenWidth - 48) / 3; // 3 columns with padding

export const BodyFatSelector: React.FC<BodyFatSelectorProps> = ({
  selectedLevel,
  gender,
  onLevelChange,
}) => {
  const { theme } = useTheme();

  const bodyFatOptions: BodyFatOption[] = [
    {
      level: 'very_low',
      label: 'Très bas',
      maleImage: '👨‍💪',
      femaleImage: '👩‍💪',
      percentage: '< 10%',
    },
    {
      level: 'low',
      label: 'Bas',
      maleImage: '🧑‍💼',
      femaleImage: '👩‍💼',
      percentage: '10-15%',
    },
    {
      level: 'normal',
      label: 'Normal',
      maleImage: '🧑',
      femaleImage: '👩',
      percentage: '15-20%',
    },
    {
      level: 'high',
      label: 'Élevé',
      maleImage: '🧑‍🍳',
      femaleImage: '👩‍🍳',
      percentage: '20-25%',
    },
    {
      level: 'very_high',
      label: 'Très élevé',
      maleImage: '👨‍🎨',
      femaleImage: '👩‍🎨',
      percentage: '25-30%',
    },
    {
      level: 'obese',
      label: 'Obèse',
      maleImage: '🧑‍🎤',
      femaleImage: '👩‍🎤',
      percentage: '> 30%',
    },
  ];

  const renderOption = (option: BodyFatOption, index: number) => {
    const isSelected = selectedLevel === option.level;
    const isThirdColumn = (index + 1) % 3 === 0;

    return (
      <TouchableOpacity
        key={option.level}
        onPress={() => onLevelChange(option.level)}
        style={[
          styles.option,
          {
            width: itemWidth,
            backgroundColor: isSelected ? theme.colors.primary + '20' : theme.colors.surface,
            borderColor: isSelected ? theme.colors.primary : theme.colors.neutral[300],
            borderWidth: isSelected ? 2 : 1,
            marginRight: isThirdColumn ? 0 : 8,
          }
        ]}
        activeOpacity={0.7}
      >
        <View style={styles.imageContainer}>
          <Text style={styles.bodyImage}>
            {gender === 'male' ? option.maleImage : option.femaleImage}
          </Text>
        </View>
        
        <Text
          style={[
            styles.percentage,
            {
              color: isSelected ? theme.colors.primary : theme.colors.text.secondary,
              fontWeight: isSelected ? theme.fontWeight.bold : theme.fontWeight.medium,
            }
          ]}
        >
          {option.percentage}
        </Text>
        
        <Text
          style={[
            styles.label,
            {
              color: isSelected ? theme.colors.primary : theme.colors.text.light,
              fontWeight: isSelected ? theme.fontWeight.semibold : theme.fontWeight.normal,
            }
          ]}
        >
          {option.label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {bodyFatOptions.map(renderOption)}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  option: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
    minHeight: 120,
  },
  imageContainer: {
    marginBottom: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bodyImage: {
    fontSize: 32,
  },
  percentage: {
    fontSize: 14,
    marginBottom: 4,
  },
  label: {
    fontSize: 12,
    textAlign: 'center',
  },
});