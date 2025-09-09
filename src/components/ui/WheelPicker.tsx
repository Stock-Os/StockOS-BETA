import React, { useState, useRef, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  StyleSheet,
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  runOnJS,
  withSpring,
} from 'react-native-reanimated';
import { useTheme } from '../../contexts/ThemeContext';
import { WheelPickerOption } from '../../types';

interface WheelPickerProps {
  options: WheelPickerOption[];
  selectedValue?: string | number;
  onValueChange: (value: string | number, index: number) => void;
  itemHeight?: number;
  visibleItems?: number;
  width?: number;
  unit?: string;
}

const { width: screenWidth } = Dimensions.get('window');

export const WheelPicker: React.FC<WheelPickerProps> = ({
  options,
  selectedValue,
  onValueChange,
  itemHeight = 60,
  visibleItems = 5,
  width = screenWidth * 0.6,
  unit,
}) => {
  const { theme } = useTheme();
  const [selectedIndex, setSelectedIndex] = useState(
    Math.max(0, options.findIndex(option => option.value === selectedValue))
  );
  
  const scrollY = useSharedValue(selectedIndex * itemHeight);
  const containerHeight = visibleItems * itemHeight;
  const paddingVertical = (containerHeight - itemHeight) / 2;

  const handleValueChange = useCallback((index: number) => {
    if (index >= 0 && index < options.length) {
      setSelectedIndex(index);
      onValueChange(options[index].value, index);
    }
  }, [options, onValueChange]);

  const gestureHandler = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onStart: (_, context) => {
      context.startY = scrollY.value;
    },
    onActive: (event, context) => {
      const newY = context.startY - event.translationY;
      const clampedY = Math.max(0, Math.min(newY, (options.length - 1) * itemHeight));
      scrollY.value = clampedY;
    },
    onEnd: (event) => {
      const targetY = Math.round(scrollY.value / itemHeight) * itemHeight;
      const targetIndex = Math.round(targetY / itemHeight);
      
      scrollY.value = withSpring(targetY, {
        damping: 15,
        stiffness: 150,
        mass: 1,
      });
      
      runOnJS(handleValueChange)(targetIndex);
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: -scrollY.value }],
    };
  });

  const renderItem = (option: WheelPickerOption, index: number) => {
    const isSelected = index === selectedIndex;
    
    return (
      <View
        key={`${option.value}-${index}`}
        style={[
          styles.item,
          { height: itemHeight },
          isSelected && { backgroundColor: theme.colors.primary + '10' }
        ]}
      >
        <Text
          style={[
            styles.itemText,
            {
              color: isSelected ? theme.colors.primary : theme.colors.text.light,
              fontSize: isSelected ? theme.fontSize.xl : theme.fontSize.lg,
              fontWeight: isSelected ? theme.fontWeight.bold : theme.fontWeight.normal,
            }
          ]}
        >
          {option.label}
          {unit && isSelected && (
            <Text style={[styles.unit, { color: theme.colors.text.light }]}>
              {' '}{unit}
            </Text>
          )}
        </Text>
      </View>
    );
  };

  return (
    <View style={[styles.container, { width, height: containerHeight }]}>
      <View
        style={[
          styles.selectedIndicator,
          {
            backgroundColor: theme.colors.primary + '20',
            borderColor: theme.colors.primary,
            height: itemHeight,
            top: paddingVertical,
          }
        ]}
      />
      
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={styles.scrollContainer}>
          <View style={{ paddingVertical }}>
            <Animated.View style={animatedStyle}>
              {options.map(renderItem)}
            </Animated.View>
          </View>
        </Animated.View>
      </PanGestureHandler>
      
      <View
        style={[
          styles.fadeTop,
          {
            background: `linear-gradient(to bottom, ${theme.colors.background} 0%, transparent 100%)`,
            height: paddingVertical,
          }
        ]}
      />
      <View
        style={[
          styles.fadeBottom,
          {
            background: `linear-gradient(to top, ${theme.colors.background} 0%, transparent 100%)`,
            height: paddingVertical,
            bottom: 0,
          }
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },
  scrollContainer: {
    flex: 1,
  },
  item: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  itemText: {
    textAlign: 'center',
    lineHeight: 24,
  },
  unit: {
    fontSize: 14,
    fontWeight: '400',
  },
  selectedIndicator: {
    position: 'absolute',
    left: 0,
    right: 0,
    borderRadius: 12,
    borderWidth: 2,
    zIndex: 1,
  },
  fadeTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 2,
    pointerEvents: 'none',
  },
  fadeBottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 2,
    pointerEvents: 'none',
  },
});