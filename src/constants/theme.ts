export const theme = {
  colors: {
    primary: '#FE814C',
    primaryLight: '#FD814C',
    secondary: '#4A3F37',
    background: '#FAF9EF',
    backgroundLight: '#FAECE3',
    surface: '#F8F4F1',
    surfaceLight: '#FFFFFF',
    
    text: {
      primary: '#1C1C1C',
      secondary: '#4A3F37',
      light: '#756F6B',
      inverse: '#FFFFFF',
    },
    
    neutral: {
      50: '#FAFAFA',
      100: '#F5F5F5',
      200: '#E7DCD9',
      300: '#D4D4D4',
      400: '#A3A3A3',
      500: '#737373',
      600: '#525252',
      700: '#404040',
      800: '#262626',
      900: '#171717',
    },
    
    semantic: {
      success: '#22C55E',
      warning: '#F59E0B',
      error: '#EF4444',
      info: '#3B82F6',
    },
    
    rating: {
      excellent: '#22C55E',
      good: '#84CC16',
      neutral: '#F59E0B',
      bad: '#EF4444',
      terrible: '#DC2626',
    }
  },
  
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    full: 9999,
  },
  
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
    '5xl': 48,
  },
  
  fontWeight: {
    normal: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
  
  shadows: {
    sm: {
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
    },
    md: {
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 3,
    },
    lg: {
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.15,
      shadowRadius: 12,
      elevation: 5,
    },
  },
  
  animation: {
    duration: {
      fast: 150,
      normal: 300,
      slow: 500,
    },
    easing: 'ease-in-out',
  },
} as const;

export type Theme = typeof theme;