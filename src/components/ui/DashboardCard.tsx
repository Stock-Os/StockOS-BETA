import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SquircleView } from 'expo-squircle-view';
import { Shadow } from 'react-native-shadow-2';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../contexts/ThemeContext';

interface DashboardCardProps {
  title: string;
  subtitle?: string;
  icon?: string;
  backgroundColor?: string;
  textColor?: string;
  onPress?: () => void;
  children?: React.ReactNode;
  style?: any;
}

export const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  subtitle,
  icon,
  backgroundColor = '#8B7CF6',
  textColor = '#FFFFFF',
  onPress,
  children,
  style,
}) => {
  const { theme } = useTheme();

  const CardContent = () => (
    <SquircleView
      style={[styles.squircle, { backgroundColor }, style]}
      squircleParams={{
        cornerSmoothing: 0.6,
        cornerRadius: 20,
        fillColor: backgroundColor,
      }}
    >
      <LinearGradient
        colors={[backgroundColor, backgroundColor + 'CC']}
        start={[0, 0]}
        end={[0, 1]}
        style={styles.gradient}
      >
        <View style={styles.content}>
          {icon && (
            <View style={styles.iconContainer}>
              <Text style={[styles.icon, { color: textColor }]}>{icon}</Text>
            </View>
          )}
          
          <View style={styles.textContainer}>
            <Text style={[styles.title, { color: textColor }]}>{title}</Text>
            {subtitle && (
              <Text style={[styles.subtitle, { color: textColor + 'CC' }]}>
                {subtitle}
              </Text>
            )}
          </View>
          
          {children}
        </View>
      </LinearGradient>
    </SquircleView>
  );

  if (onPress) {
    return (
      <Shadow
        distance={3}
        startColor={backgroundColor + '40'}
        endColor={backgroundColor + '00'}
        offset={[0, 2]}
      >
        <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
          <CardContent />
        </TouchableOpacity>
      </Shadow>
    );
  }

  return (
    <Shadow
      distance={3}
      startColor={backgroundColor + '40'}
      endColor={backgroundColor + '00'}
      offset={[0, 2]}
    >
      <CardContent />
    </Shadow>
  );
};

const styles = StyleSheet.create({
  squircle: {
    minHeight: 120,
    overflow: 'hidden',
  },
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  iconContainer: {
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  icon: {
    fontSize: 24,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    opacity: 0.8,
  },
});