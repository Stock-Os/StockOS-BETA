import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Dimensions, Image } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { useTheme } from '../../contexts/ThemeContext';
import { BodyFatLevel } from '../../types';

interface BodyFatOption {
  level: BodyFatLevel;
  percentage: string;
  svgFile: string;
  description: string;
}

interface BodyFatSelectorProps {
  selectedLevel?: BodyFatLevel;
  gender: 'male' | 'female';
  onLevelChange: (level: BodyFatLevel) => void;
}

const { width: screenWidth } = Dimensions.get('window');
const itemWidth = (screenWidth - 80) / 3; // 3 columns with padding

// Import your SVG assets
const bodyfatAssets: Record<string, any> = {
  '3-4': require('../../../assets/bodyfat/3-4.svg'),
  '5-7': require('../../../assets/bodyfat/5-7.svg'),
  '8-12': require('../../../assets/bodyfat/8-12.svg'),
  '13-17': require('../../../assets/bodyfat/13-17.svg'),
  '18-23': require('../../../assets/bodyfat/18-23.svg'),
  '24-29': require('../../../assets/bodyfat/24-29.svg'),
  '30-34': require('../../../assets/bodyfat/30-34.svg'),
  '35-39': require('../../../assets/bodyfat/35-39.svg'),
  '40plus': require('../../../assets/bodyfat/40plus.svg'),
};

export const BodyFatSelector: React.FC<BodyFatSelectorProps> = ({
  selectedLevel,
  gender,
  onLevelChange,
}) => {
  const { theme } = useTheme();

  const bodyFatOptions: BodyFatOption[] = [
    {
      level: 'very_low',
      percentage: '3-4%',
      svgFile: '3-4',
      description: 'Très athlétique',
    },
    {
      level: 'low',
      percentage: '5-7%',
      svgFile: '5-7',
      description: 'Athlétique',
    },
    {
      level: 'normal',
      percentage: '8-12%',
      svgFile: '8-12',
      description: 'En forme',
    },
    {
      level: 'high',
      percentage: '13-17%',
      svgFile: '13-17',
      description: 'Moyen',
    },
    {
      level: 'very_high',
      percentage: '18-23%',
      svgFile: '18-23',
      description: 'Élevé',
    },
    {
      level: 'obese',
      percentage: '24-29%',
      svgFile: '24-29',
      description: 'Obèse I',
    },
    {
      level: 'extremely_obese_1',
      percentage: '30-34%',
      svgFile: '30-34',
      description: 'Obèse II',
    },
    {
      level: 'extremely_obese_2',
      percentage: '35-39%',
      svgFile: '35-39',
      description: 'Obèse III',
    },
    {
      level: 'extremely_obese_3',
      percentage: '40%+',
      svgFile: '40plus',
      description: 'Très obèse',
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
            marginRight: isThirdColumn ? 0 : 12,
            marginBottom: 16,
          }
        ]}
        activeOpacity={0.7}
      >
        <View style={[
          styles.circleContainer,
          {
            borderWidth: isSelected ? 3 : 1,
            borderColor: isSelected ? theme.colors.primary || '#007AFF' : '#555555',
            backgroundColor: isSelected ? 'rgba(0, 122, 255, 0.1)' : 'rgba(255, 255, 255, 0.05)',
          }
        ]}>
          <Image
            source={bodyfatAssets[option.svgFile]}
            style={[
              styles.svgImage,
              {
                width: itemWidth * 0.7,
                height: itemWidth * 0.7,
                opacity: 1,
              }
            ]}
            resizeMode="contain"
          />
        </View>
        
        <Text
          style={[
            styles.percentage,
            {
              color: theme.colors.text.primary || '#FFFFFF',
              fontWeight: isSelected ? '700' : '500',
            }
          ]}
        >
          {option.percentage}
        </Text>
        <Text
          style={[
            styles.description,
            {
              color: theme.colors.text.secondary || '#AAAAAA',
              fontWeight: isSelected ? '600' : '400',
            }
          ]}
        >
          {option.description}
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
    paddingHorizontal: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  option: {
    alignItems: 'center',
  },
  circleContainer: {
    width: itemWidth,
    height: itemWidth,
    borderRadius: itemWidth / 2,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  svgImage: {
    zIndex: 10,
    elevation: 10,
  },
  loadingPlaceholder: {
    borderRadius: 8,
  },
  percentage: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 4,
  },
  description: {
    fontSize: 10,
    textAlign: 'center',
    marginTop: 2,
  },
});