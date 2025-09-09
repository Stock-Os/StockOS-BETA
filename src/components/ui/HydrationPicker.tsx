import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import Svg, { Path, Rect } from 'react-native-svg';
import { useTheme } from '../../contexts/ThemeContext';

interface HydrationPickerProps {
  selectedLiters: number;
  onLitersChange: (liters: number) => void;
  minLiters?: number;
  maxLiters?: number;
}

const BOTTLE_CAPACITY = 1.5; // Litres par bouteille

export const HydrationPicker: React.FC<HydrationPickerProps> = ({
  selectedLiters,
  onLitersChange,
  minLiters = 1,
  maxLiters = 5,
}) => {
  const { theme } = useTheme();

  const renderBottle = (bottleIndex: number) => {
    const totalBottlesNeeded = Math.ceil(selectedLiters / BOTTLE_CAPACITY);
    const isActiveBottle = bottleIndex < totalBottlesNeeded;
    
    let fillPercentage = 0;
    if (isActiveBottle) {
      const remainingLiters = selectedLiters - (bottleIndex * BOTTLE_CAPACITY);
      fillPercentage = Math.min(remainingLiters / BOTTLE_CAPACITY, 1) * 100;
    }

    const scaleValue = useSharedValue(isActiveBottle ? 1 : 0.9);
    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [{ scale: withSpring(scaleValue.value) }],
      };
    });

    return (
      <Animated.View key={bottleIndex} style={[styles.bottleContainer, animatedStyle]}>
        <Svg width={60} height={100} viewBox="0 0 60 100">
          {/* Bottle outline */}
          <Path
            d="M15 20 L15 85 Q15 90 20 90 L40 90 Q45 90 45 85 L45 20 Q45 15 40 15 L35 15 L35 5 Q35 2 32 2 L28 2 Q25 2 25 5 L25 15 L20 15 Q15 15 15 20 Z"
            fill="none"
            stroke={isActiveBottle ? theme.colors.primary : theme.colors.neutral[300]}
            strokeWidth="2"
          />
          
          {/* Water fill */}
          {fillPercentage > 0 && (
            <Path
              d={`M17 ${85 - (fillPercentage * 0.65)} L17 85 Q17 88 20 88 L40 88 Q43 88 43 85 L43 ${85 - (fillPercentage * 0.65)} Z`}
              fill={theme.colors.primary + '60'}
            />
          )}
          
          {/* Bottle cap */}
          <Rect
            x="25"
            y="2"
            width="10"
            height="13"
            rx="2"
            fill={isActiveBottle ? theme.colors.primary : theme.colors.neutral[300]}
          />
        </Svg>
        
        <Text style={[
          styles.bottleLabel,
          { color: isActiveBottle ? theme.colors.primary : theme.colors.neutral[400] }
        ]}>
          1,5L
        </Text>
      </Animated.View>
    );
  };

  const renderLiterOptions = () => {
    const options = [];
    for (let i = minLiters; i <= maxLiters; i += 0.5) {
      const isSelected = Math.abs(selectedLiters - i) < 0.1;
      
      options.push(
        <TouchableOpacity
          key={i}
          onPress={() => onLitersChange(i)}
          style={[
            styles.literOption,
            {
              backgroundColor: isSelected ? theme.colors.primary : 'transparent',
              borderColor: isSelected ? theme.colors.primary : theme.colors.neutral[300],
            }
          ]}
        >
          <Text
            style={[
              styles.literText,
              {
                color: isSelected ? theme.colors.surface : theme.colors.text.secondary,
                fontWeight: isSelected ? theme.fontWeight.bold : theme.fontWeight.normal,
              }
            ]}
          >
            {i}L
          </Text>
        </TouchableOpacity>
      );
    }
    return options;
  };

  const maxBottles = Math.ceil(maxLiters / BOTTLE_CAPACITY);
  const bottles = Array.from({ length: maxBottles }, (_, index) => renderBottle(index));

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: theme.colors.text.primary }]}>
        Objectif d'hydratation quotidien
      </Text>
      
      <View style={styles.bottlesContainer}>
        {bottles}
      </View>
      
      <View style={styles.selectedValue}>
        <Text style={[styles.selectedText, { color: theme.colors.primary }]}>
          {selectedLiters}L par jour
        </Text>
      </View>
      
      <View style={styles.optionsContainer}>
        {renderLiterOptions()}
      </View>
      
      <Text style={[styles.subtitle, { color: theme.colors.text.light }]}>
        Une bonne hydratation améliore les performances et la récupération
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 24,
  },
  bottlesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginBottom: 24,
    flexWrap: 'wrap',
    gap: 8,
  },
  bottleContainer: {
    alignItems: 'center',
    marginHorizontal: 4,
  },
  bottleLabel: {
    fontSize: 12,
    marginTop: 4,
    textAlign: 'center',
  },
  selectedValue: {
    marginBottom: 24,
  },
  selectedText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 16,
  },
  literOption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    minWidth: 60,
    alignItems: 'center',
  },
  literText: {
    fontSize: 14,
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
});