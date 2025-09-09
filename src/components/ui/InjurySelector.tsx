import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import { useTheme } from '../../contexts/ThemeContext';
import { InjuryZone } from '../../types';

interface InjurySelectorProps {
  selectedZones: InjuryZone[];
  onZoneToggle: (zone: InjuryZone) => void;
  gender?: 'male' | 'female';
}

const { width: screenWidth } = Dimensions.get('window');
const mannequinWidth = screenWidth * 0.8;
const mannequinHeight = mannequinWidth * 1.5;

export const InjurySelector: React.FC<InjurySelectorProps> = ({
  selectedZones,
  onZoneToggle,
  gender = 'male',
}) => {
  const { theme } = useTheme();

  const bodyParts = [
    { zone: 'neck' as InjuryZone, cx: mannequinWidth * 0.5, cy: mannequinHeight * 0.15, r: 20 },
    { zone: 'shoulder' as InjuryZone, cx: mannequinWidth * 0.3, cy: mannequinHeight * 0.22, r: 25 },
    { zone: 'shoulder' as InjuryZone, cx: mannequinWidth * 0.7, cy: mannequinHeight * 0.22, r: 25 },
    { zone: 'back' as InjuryZone, cx: mannequinWidth * 0.5, cy: mannequinHeight * 0.35, r: 40 },
    { zone: 'elbow' as InjuryZone, cx: mannequinWidth * 0.25, cy: mannequinHeight * 0.4, r: 15 },
    { zone: 'elbow' as InjuryZone, cx: mannequinWidth * 0.75, cy: mannequinHeight * 0.4, r: 15 },
    { zone: 'wrist' as InjuryZone, cx: mannequinWidth * 0.2, cy: mannequinHeight * 0.55, r: 12 },
    { zone: 'wrist' as InjuryZone, cx: mannequinWidth * 0.8, cy: mannequinHeight * 0.55, r: 12 },
    { zone: 'hip' as InjuryZone, cx: mannequinWidth * 0.5, cy: mannequinHeight * 0.6, r: 30 },
    { zone: 'knee' as InjuryZone, cx: mannequinWidth * 0.4, cy: mannequinHeight * 0.8, r: 20 },
    { zone: 'knee' as InjuryZone, cx: mannequinWidth * 0.6, cy: mannequinHeight * 0.8, r: 20 },
    { zone: 'ankle' as InjuryZone, cx: mannequinWidth * 0.4, cy: mannequinHeight * 0.95, r: 15 },
    { zone: 'ankle' as InjuryZone, cx: mannequinWidth * 0.6, cy: mannequinHeight * 0.95, r: 15 },
  ];

  const isZoneSelected = (zone: InjuryZone) => selectedZones.includes(zone);

  const handleZonePress = (zone: InjuryZone) => {
    onZoneToggle(zone);
  };

  const renderBodyOutline = () => {
    const pathData = `
      M ${mannequinWidth * 0.5} ${mannequinHeight * 0.08}
      C ${mannequinWidth * 0.4} ${mannequinHeight * 0.08} ${mannequinWidth * 0.35} ${mannequinHeight * 0.12} ${mannequinWidth * 0.35} ${mannequinHeight * 0.18}
      L ${mannequinWidth * 0.2} ${mannequinHeight * 0.25}
      L ${mannequinWidth * 0.15} ${mannequinHeight * 0.6}
      L ${mannequinWidth * 0.35} ${mannequinHeight * 0.65}
      L ${mannequinWidth * 0.35} ${mannequinHeight * 1.0}
      L ${mannequinWidth * 0.45} ${mannequinHeight * 1.0}
      L ${mannequinWidth * 0.45} ${mannequinHeight * 0.65}
      L ${mannequinWidth * 0.55} ${mannequinHeight * 0.65}
      L ${mannequinWidth * 0.55} ${mannequinHeight * 1.0}
      L ${mannequinWidth * 0.65} ${mannequinHeight * 1.0}
      L ${mannequinWidth * 0.65} ${mannequinHeight * 0.65}
      L ${mannequinWidth * 0.85} ${mannequinHeight * 0.6}
      L ${mannequinWidth * 0.8} ${mannequinHeight * 0.25}
      L ${mannequinWidth * 0.65} ${mannequinHeight * 0.18}
      C ${mannequinWidth * 0.65} ${mannequinHeight * 0.12} ${mannequinWidth * 0.6} ${mannequinHeight * 0.08} ${mannequinWidth * 0.5} ${mannequinHeight * 0.08}
      Z
    `;

    return (
      <Path
        d={pathData}
        fill="none"
        stroke={theme.colors.neutral[400]}
        strokeWidth="2"
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.mannequinContainer}>
        <Svg
          width={mannequinWidth}
          height={mannequinHeight}
          viewBox={`0 0 ${mannequinWidth} ${mannequinHeight}`}
        >
          {renderBodyOutline()}
          
          {bodyParts.map((part, index) => (
            <Circle
              key={`${part.zone}-${index}`}
              cx={part.cx}
              cy={part.cy}
              r={part.r}
              fill={
                isZoneSelected(part.zone)
                  ? theme.colors.semantic.error + '80'
                  : 'transparent'
              }
              stroke={
                isZoneSelected(part.zone)
                  ? theme.colors.semantic.error
                  : theme.colors.neutral[400]
              }
              strokeWidth="2"
              onPress={() => handleZonePress(part.zone)}
            />
          ))}
        </Svg>
      </View>
      
      <View style={styles.legend}>
        <Text style={[styles.legendText, { color: theme.colors.text.light }]}>
          Touchez les zones de douleur ou blessure
        </Text>
        
        <View style={styles.selectedZones}>
          {selectedZones.map((zone, index) => (
            <TouchableOpacity
              key={`selected-${zone}-${index}`}
              onPress={() => handleZonePress(zone)}
              style={[
                styles.selectedZoneChip,
                { backgroundColor: theme.colors.semantic.error + '20', borderColor: theme.colors.semantic.error }
              ]}
            >
              <Text style={[styles.selectedZoneText, { color: theme.colors.semantic.error }]}>
                {getZoneLabel(zone)}
              </Text>
              <Text style={[styles.removeIcon, { color: theme.colors.semantic.error }]}>×</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

const getZoneLabel = (zone: InjuryZone): string => {
  const labels: Record<InjuryZone, string> = {
    neck: 'Cou',
    shoulder: 'Épaule',
    back: 'Dos',
    elbow: 'Coude',
    wrist: 'Poignet',
    hip: 'Hanche',
    knee: 'Genou',
    ankle: 'Cheville',
    other: 'Autre',
  };
  
  return labels[zone] || zone;
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  mannequinContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  legend: {
    alignItems: 'center',
    width: '100%',
  },
  legendText: {
    fontSize: 14,
    marginBottom: 16,
    textAlign: 'center',
  },
  selectedZones: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
  },
  selectedZoneChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 8,
  },
  selectedZoneText: {
    fontSize: 12,
    marginRight: 4,
  },
  removeIcon: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});