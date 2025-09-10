import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Canvas, Path, LinearGradient, vec, Shadow, InnerShadow } from '@shopify/react-native-skia';
import { useTheme } from '../../contexts/ThemeContext';

interface SemaineWidgetProps {
  days: Array<{
    day: string;
    date: number;
    isToday?: boolean;
    hasActivity?: boolean;
  }>;
}

export const SemaineWidget: React.FC<SemaineWidgetProps> = ({ days }) => {
  const { theme } = useTheme();

  // Création du path pour la forme avec encoche
  const createNotchedPath = (width: number, height: number) => {
    const notchWidth = 80;
    const notchHeight = 20;
    const centerX = width / 2;
    
    return `
      M 20 0
      L ${centerX - notchWidth/2} 0
      C ${centerX - notchWidth/2} 0 ${centerX - notchWidth/2} ${notchHeight/2} ${centerX - notchWidth/4} ${notchHeight}
      L ${centerX + notchWidth/4} ${notchHeight}
      C ${centerX + notchWidth/2} ${notchHeight/2} ${centerX + notchWidth/2} 0 ${centerX + notchWidth/2} 0
      L ${width - 20} 0
      C ${width - 10} 0 ${width} 10 ${width} 20
      L ${width} ${height - 20}
      C ${width} ${height - 10} ${width - 10} ${height} ${width - 20} ${height}
      L 20 ${height}
      C 10 ${height} 0 ${height - 10} 0 ${height - 20}
      L 0 20
      C 0 10 10 0 20 0
      Z
    `;
  };

  return (
    <View style={styles.container}>
      <Canvas style={styles.canvas}>
        <Path
          path={createNotchedPath(350, 100)}
          color="#8B7CF6"
        >
          <LinearGradient
            start={vec(0, 0)}
            end={vec(0, 100)}
            colors={["#8B7CF6", "#7C3AED"]}
          />
          <InnerShadow
            dx={0}
            dy={2}
            blur={4}
            color="rgba(0, 0, 0, 0.25)"
          />
        </Path>
      </Canvas>
      
      <View style={styles.content}>
        <Text style={styles.title}>Semaine</Text>
        
        <View style={styles.daysContainer}>
          {days.map((day, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.dayButton,
                day.isToday && styles.todayButton,
              ]}
            >
              <Text style={[
                styles.dayName,
                day.isToday && styles.todayDayName
              ]}>
                {day.day}
              </Text>
              <Text style={[
                styles.dayDate,
                day.isToday && styles.todayDayDate
              ]}>
                {day.date.toString().padStart(2, '0')}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 100,
    marginVertical: 16,
    position: 'relative',
  },
  canvas: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 16,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  daysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dayButton: {
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    minWidth: 40,
  },
  todayButton: {
    backgroundColor: '#FFFFFF',
  },
  dayName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  todayDayName: {
    color: '#8B7CF6',
  },
  dayDate: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  todayDayDate: {
    color: '#8B7CF6',
  },
});