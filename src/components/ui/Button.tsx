import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  style,
  textStyle,
  fullWidth = false,
}) => {
  const { theme } = useTheme();

  const getButtonStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      borderRadius: theme.borderRadius.lg,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
    };

    // Size variations
    switch (size) {
      case 'small':
        baseStyle.paddingVertical = theme.spacing.sm;
        baseStyle.paddingHorizontal = theme.spacing.md;
        baseStyle.height = 36;
        break;
      case 'large':
        baseStyle.paddingVertical = theme.spacing.lg;
        baseStyle.paddingHorizontal = theme.spacing.xl;
        baseStyle.height = 56;
        break;
      default: // medium
        baseStyle.paddingVertical = theme.spacing.md;
        baseStyle.paddingHorizontal = theme.spacing.xl;
        baseStyle.height = 48;
    }

    if (fullWidth) {
      baseStyle.width = '100%';
    }

    // Variant styles
    switch (variant) {
      case 'secondary':
        baseStyle.backgroundColor = theme.colors.neutral[100];
        if (disabled) {
          baseStyle.backgroundColor = theme.colors.neutral[100];
          baseStyle.opacity = 0.5;
        }
        break;
      case 'outline':
        baseStyle.backgroundColor = 'transparent';
        baseStyle.borderWidth = 2;
        baseStyle.borderColor = theme.colors.primary;
        if (disabled) {
          baseStyle.borderColor = theme.colors.neutral[300];
          baseStyle.opacity = 0.5;
        }
        break;
      default: // primary
        baseStyle.backgroundColor = theme.colors.primary;
        if (disabled || loading) {
          baseStyle.backgroundColor = theme.colors.neutral[300];
        }
    }

    return baseStyle;
  };

  const getTextStyle = (): TextStyle => {
    const baseTextStyle: TextStyle = {
      fontWeight: theme.fontWeight.semibold,
    };

    // Size variations
    switch (size) {
      case 'small':
        baseTextStyle.fontSize = theme.fontSize.sm;
        break;
      case 'large':
        baseTextStyle.fontSize = theme.fontSize.lg;
        break;
      default: // medium
        baseTextStyle.fontSize = theme.fontSize.base;
    }

    // Variant colors
    switch (variant) {
      case 'secondary':
        baseTextStyle.color = theme.colors.text.primary;
        break;
      case 'outline':
        baseTextStyle.color = disabled ? theme.colors.neutral[400] : theme.colors.primary;
        break;
      default: // primary
        baseTextStyle.color = theme.colors.text.inverse;
        if (disabled || loading) {
          baseTextStyle.color = theme.colors.neutral[500];
        }
    }

    return baseTextStyle;
  };

  return (
    <TouchableOpacity
      style={[getButtonStyle(), style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading && (
        <ActivityIndicator
          size="small"
          color={variant === 'primary' ? theme.colors.text.inverse : theme.colors.primary}
          style={{ marginRight: theme.spacing.sm }}
        />
      )}
      <Text style={[getTextStyle(), textStyle]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};