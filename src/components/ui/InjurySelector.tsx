import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import Body from 'react-native-body-highlighter';
import { useTheme } from '../../contexts/ThemeContext';

// Type pour les muscles individuels
export type BodyMuscle = 'head' | 'neck' | 'deltoids' | 'trapezius' | 'biceps' | 'triceps' | 'forearm' | 'hands' | 
                         'chest' | 'abs' | 'obliques' | 'upper-back' | 'lower-back' | 'gluteal' | 'adductors' | 
                         'hamstring' | 'calves' | 'tibialis' | 'feet' | 'ankles';

interface InjurySelectorProps {
  selectedMuscles: BodyMuscle[];
  onMuscleToggle: (muscle: BodyMuscle) => void;
  gender?: 'male' | 'female';
}

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export const InjurySelector: React.FC<InjurySelectorProps> = ({
  selectedMuscles,
  onMuscleToggle,
  gender = 'male',
}) => {
  const { theme } = useTheme();
  const [viewSide, setViewSide] = useState<'front' | 'back'>('front');

  // Convert selected muscles to body part data for the highlighter
  const getSelectedBodyParts = () => {
    return selectedMuscles.map(muscle => ({
      slug: muscle,
      intensity: 2
    }));
  };

  const handleBodyPartPress = (bodyPart: { slug: string, intensity: number }) => {
    console.log('BodyPart pressed:', bodyPart.slug); // Debug log
    const muscle = bodyPart.slug as BodyMuscle;
    onMuscleToggle(muscle);
  };

  return (
    <View style={styles.container}>
      <View style={styles.mannequinContainer}>
        <Body
          data={getSelectedBodyParts()}
          onBodyPartPress={handleBodyPartPress}
          colors={[
            theme.colors.semantic.error || '#ff7675',
            '#d63031'
          ]}
          side={viewSide}
          gender={gender}
          scale={1.3}
        />
        
        <TouchableOpacity
          style={[styles.toggleButton, { backgroundColor: theme.colors.primary }]}
          onPress={() => setViewSide(viewSide === 'front' ? 'back' : 'front')}
        >
          <Text style={[styles.toggleText, { color: '#FFFFFF' }]}>
            {viewSide === 'front' ? '🔄 Dos' : '🔄 Face'}
          </Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.legend}>
        <Text style={[styles.legendText, { color: theme.colors.text.light }]}>
          Touchez les zones de douleur ou blessure
        </Text>
        
        <View style={styles.selectedZones}>
          {selectedMuscles.map((muscle, index) => (
            <TouchableOpacity
              key={`selected-${muscle}-${index}`}
              onPress={() => onMuscleToggle(muscle)}
              style={[
                styles.selectedZoneChip,
                { backgroundColor: theme.colors.semantic.error + '20', borderColor: theme.colors.semantic.error }
              ]}
            >
              <Text style={[styles.selectedZoneText, { color: theme.colors.semantic.error }]}>
                {getMuscleLabel(muscle)}
              </Text>
              <Text style={[styles.removeIcon, { color: theme.colors.semantic.error }]}>×</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

const getMuscleLabel = (muscle: BodyMuscle): string => {
  const labels: Record<BodyMuscle, string> = {
    // Tête et cou
    'head': 'Tête',
    'neck': 'Cou',
    
    // Épaules et bras
    'deltoids': 'Deltoïdes',
    'trapezius': 'Trapèzes',
    'biceps': 'Biceps',
    'triceps': 'Triceps',
    'forearm': 'Avant-bras',
    'hands': 'Mains',
    
    // Torse
    'chest': 'Pectoraux',
    'abs': 'Abdominaux',
    'obliques': 'Obliques',
    'upper-back': 'Haut du dos',
    'lower-back': 'Bas du dos',
    
    // Hanches et jambes
    'gluteal': 'Fessiers',
    'adductors': 'Adducteurs',
    'hamstring': 'Ischio-jambiers',
    'calves': 'Mollets',
    'tibialis': 'Tibias',
    'feet': 'Pieds',
    'ankles': 'Chevilles',
  };
  
  return labels[muscle] || muscle;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  mannequinContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    position: 'relative',
    minHeight: Dimensions.get('window').height * 0.5,
    width: Dimensions.get('window').width,
  },
  toggleButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  toggleText: {
    fontSize: 12,
    fontWeight: '600',
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