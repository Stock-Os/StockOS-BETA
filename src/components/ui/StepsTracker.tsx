import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming,
  interpolate,
  Extrapolate
} from 'react-native-reanimated';
import Svg, { Path, Circle } from 'react-native-svg';
import { useTheme } from '../../contexts/ThemeContext';

interface StepsTrackerProps {
  targetSteps: number;
  currentSteps?: number;
  onTargetChange: (steps: number) => void;
  showPicker?: boolean;
}

const { width: screenWidth } = Dimensions.get('window');
const TRACK_WIDTH = screenWidth * 0.8;
const STEP_SIZE = TRACK_WIDTH / 15000; // 15000 pas maximum

export const StepsTracker: React.FC<StepsTrackerProps> = ({
  targetSteps,
  currentSteps = 0,
  onTargetChange,
  showPicker = true,
}) => {
  const { theme } = useTheme();
  
  const progressAnimation = useSharedValue(0);
  const targetAnimation = useSharedValue(0);

  useEffect(() => {
    progressAnimation.value = withTiming(currentSteps / 15000, { duration: 1000 });
    targetAnimation.value = withTiming(targetSteps / 15000, { duration: 800 });
  }, [currentSteps, targetSteps]);

  const generatePathWithFootprints = () => {
    const footprints = [];
    const totalFootprints = Math.floor(targetSteps / 500); // Une empreinte tous les 500 pas
    const pathLength = TRACK_WIDTH;
    
    for (let i = 0; i <= totalFootprints; i++) {
      const progress = i / totalFootprints;
      const x = progress * pathLength;
      const y = 50 + Math.sin(progress * Math.PI * 4) * 20; // Chemin sinusoïdal
      
      const isLeft = i % 2 === 0;
      const rotation = Math.atan2(
        Math.cos(progress * Math.PI * 4) * Math.PI * 4 * 20,
        pathLength / totalFootprints
      ) * (180 / Math.PI);
      
      footprints.push({
        x,
        y: y + (isLeft ? -5 : 5),
        rotation,
        isLeft,
        revealed: i <= (currentSteps / 500),
      });
    }
    
    return footprints;
  };

  const footprints = generatePathWithFootprints();

  const animatedPathStyle = useAnimatedStyle(() => {
    const revealedLength = interpolate(
      progressAnimation.value,
      [0, 1],
      [0, TRACK_WIDTH],
      Extrapolate.CLAMP
    );
    
    return {
      width: revealedLength,
    };
  });

  const renderFootprint = (footprint: any, index: number) => {
    const size = 12;
    const footprintPath = footprint.isLeft 
      ? "M6 2C6 2 4 1 2 2C1 3 0 5 1 7C2 8 3 9 4 10L5 12L7 12L8 10C9 9 10 8 11 7C12 5 11 3 10 2C8 1 6 2 6 2Z"
      : "M6 2C6 2 8 1 10 2C11 3 12 5 11 7C10 8 9 9 8 10L7 12L5 12L4 10C3 9 2 8 1 7C0 5 1 3 2 2C4 1 6 2 6 2Z";
    
    return (
      <View
        key={index}
        style={[
          styles.footprint,
          {
            left: footprint.x - size / 2,
            top: footprint.y - size / 2,
            transform: [{ rotate: `${footprint.rotation}deg` }],
            opacity: footprint.revealed ? 1 : 0.3,
          }
        ]}
      >
        <Svg width={size} height={size} viewBox="0 0 12 12">
          <Path
            d={footprintPath}
            fill={footprint.revealed ? theme.colors.primary : theme.colors.neutral[300]}
          />
        </Svg>
      </View>
    );
  };

  const stepOptions = [3000, 5000, 8000, 10000, 12000, 15000];

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: theme.colors.text.primary }]}>
        Objectif de pas quotidien
      </Text>
      
      <View style={styles.trackContainer}>
        <View style={[styles.trackBackground, { backgroundColor: theme.colors.neutral[200] }]}>
          <Animated.View
            style={[
              styles.trackProgress,
              { backgroundColor: theme.colors.primary + '40' },
              animatedPathStyle,
            ]}
          />
        </View>
        
        <View style={styles.footprintsContainer}>
          {footprints.map(renderFootprint)}
        </View>
        
        {/* Current position indicator */}
        <Animated.View
          style={[
            styles.currentIndicator,
            {
              backgroundColor: theme.colors.primary,
              left: interpolate(
                progressAnimation.value,
                [0, 1],
                [0, TRACK_WIDTH - 12],
                Extrapolate.CLAMP
              ),
            },
            useAnimatedStyle(() => ({
              transform: [
                {
                  translateX: interpolate(
                    progressAnimation.value,
                    [0, 1],
                    [0, TRACK_WIDTH - 12],
                    Extrapolate.CLAMP
                  ),
                },
              ],
            })),
          ]}
        >
          <View style={[styles.indicatorDot, { backgroundColor: theme.colors.surface }]} />
        </Animated.View>
      </View>
      
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: theme.colors.primary }]}>
            {currentSteps.toLocaleString()}
          </Text>
          <Text style={[styles.statLabel, { color: theme.colors.text.light }]}>
            Actuel
          </Text>
        </View>
        
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: theme.colors.text.secondary }]}>
            {targetSteps.toLocaleString()}
          </Text>
          <Text style={[styles.statLabel, { color: theme.colors.text.light }]}>
            Objectif
          </Text>
        </View>
      </View>
      
      {showPicker && (
        <View style={styles.optionsContainer}>
          {stepOptions.map((steps) => (
            <TouchableOpacity
              key={steps}
              onPress={() => onTargetChange(steps)}
              style={[
                styles.stepOption,
                {
                  backgroundColor: targetSteps === steps ? theme.colors.primary : 'transparent',
                  borderColor: targetSteps === steps ? theme.colors.primary : theme.colors.neutral[300],
                }
              ]}
            >
              <Text
                style={[
                  styles.stepOptionText,
                  {
                    color: targetSteps === steps ? theme.colors.surface : theme.colors.text.secondary,
                    fontWeight: targetSteps === steps ? theme.fontWeight.bold : theme.fontWeight.normal,
                  }
                ]}
              >
                {steps.toLocaleString()}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
      
      <Text style={[styles.subtitle, { color: theme.colors.text.light }]}>
        L'activité quotidienne contribue à vos objectifs de santé
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
    marginBottom: 32,
  },
  trackContainer: {
    height: 120,
    width: TRACK_WIDTH,
    position: 'relative',
    marginBottom: 32,
  },
  trackBackground: {
    height: 8,
    borderRadius: 4,
    position: 'absolute',
    top: 56,
    width: TRACK_WIDTH,
  },
  trackProgress: {
    height: 8,
    borderRadius: 4,
  },
  footprintsContainer: {
    position: 'absolute',
    width: TRACK_WIDTH,
    height: 120,
  },
  footprint: {
    position: 'absolute',
  },
  currentIndicator: {
    position: 'absolute',
    top: 48,
    width: 12,
    height: 12,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicatorDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 24,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 16,
  },
  stepOption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    minWidth: 80,
    alignItems: 'center',
  },
  stepOptionText: {
    fontSize: 14,
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
});