import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';

interface BackButtonProps {
  onPress: () => void;
  size?: number;
}

export const BackButton: React.FC<BackButtonProps> = ({ onPress, size = 24 }) => {
  const { theme } = useTheme();

  return (
    <TouchableOpacity onPress={onPress} style={styles.container} activeOpacity={0.7}>
      <Text style={[styles.arrow, { 
        fontSize: size, 
        color: theme.colors.text.primary || '#000000' 
      }]}>
        ‹
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 40,
    minHeight: 40,
  },
  arrow: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
});