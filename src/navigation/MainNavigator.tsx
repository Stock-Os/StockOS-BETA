import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Path, Circle, Rect } from 'react-native-svg';
import { useTheme } from '../contexts/ThemeContext';

import { DashboardScreen } from '../screens/main/DashboardScreen';
import { ProgramScreen } from '../screens/main/ProgramScreen';
import { NutritionScreen } from '../screens/main/NutritionScreen';
import { StatsScreen } from '../screens/main/StatsScreen';
import { ProfileScreen } from '../screens/main/ProfileScreen';

import { MainTabParamList } from '../types';

const Tab = createBottomTabNavigator<MainTabParamList>();

// Custom Tab Bar Icons
const DashboardIcon: React.FC<{ focused: boolean; color: string }> = ({ focused, color }) => (
  <Svg width={24} height={24} viewBox="0 0 24 24">
    <Path
      d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"
      fill={color}
      opacity={focused ? 1 : 0.6}
    />
  </Svg>
);

const ProgramIcon: React.FC<{ focused: boolean; color: string }> = ({ focused, color }) => (
  <Svg width={24} height={24} viewBox="0 0 24 24">
    <Path
      d="M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57l1.43 1.43L2 13.43 3.43 14.86l1.43-1.43L6.29 15 4.86 16.43l1.43 1.43L7.71 16.43 9.14 17.86l1.43-1.43L12 17.86l1.43-1.43L15.86 18.86l1.43-1.43L15.86 16 17.29 14.57l-1.43-1.43L17.29 11.71 15.86 10.28l1.43-1.43L15.86 7.42 14.43 8.85 12 6.42 10.57 7.85 9.14 6.42 7.71 7.85 6.28 6.42 4.85 7.85 6.28 9.28 4.85 10.71 6.28 12.14 4.85 13.57 6.28 15 7.71 13.57 9.14 15 10.57 13.57 12 15z"
      fill={color}
      opacity={focused ? 1 : 0.6}
    />
    <Circle cx="12" cy="12" r="3" fill={color} opacity={focused ? 1 : 0.6} />
  </Svg>
);

const NutritionIcon: React.FC<{ focused: boolean; color: string }> = ({ focused, color }) => (
  <Svg width={24} height={24} viewBox="0 0 24 24">
    <Path
      d="M18.06 22.99h1.66c.84 0 1.53-.64 1.63-1.46L23 5.05h-5V1h-1.97v4.05h-4.97l.3 2.34c1.71.47 3.31 1.32 4.27 2.26 1.44 1.42 2.43 2.89 2.43 5.29v8.05zM1 21.99V21h15.03v.99c0 .55-.45 1-1.01 1H2.01c-.56 0-1.01-.45-1.01-1z"
      fill={color}
      opacity={focused ? 1 : 0.6}
    />
  </Svg>
);

const StatsIcon: React.FC<{ focused: boolean; color: string }> = ({ focused, color }) => (
  <Svg width={24} height={24} viewBox="0 0 24 24">
    <Path
      d="M5 9.2h3V19H5zM10.6 5h2.8v14h-2.8zm5.6 8H19v6h-2.8z"
      fill={color}
      opacity={focused ? 1 : 0.6}
    />
  </Svg>
);

const ProfileIcon: React.FC<{ focused: boolean; color: string }> = ({ focused, color }) => (
  <Svg width={24} height={24} viewBox="0 0 24 24">
    <Path
      d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
      fill={color}
      opacity={focused ? 1 : 0.6}
    />
  </Svg>
);

export const MainNavigator: React.FC = () => {
  const { theme } = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: [
          styles.tabBar,
          {
            backgroundColor: theme.colors.surface,
            borderTopColor: theme.colors.neutral[200],
          }
        ],
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.text.light,
        tabBarLabelStyle: styles.tabLabel,
      }}
    >
      <Tab.Screen 
        name="Dashboard" 
        component={DashboardScreen}
        options={{
          tabBarLabel: 'Dashboard',
          tabBarIcon: ({ focused, color }) => (
            <DashboardIcon focused={focused} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="Program" 
        component={ProgramScreen}
        options={{
          tabBarLabel: 'Programme',
          tabBarIcon: ({ focused, color }) => (
            <ProgramIcon focused={focused} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="Nutrition" 
        component={NutritionScreen}
        options={{
          tabBarLabel: 'Nutrition',
          tabBarIcon: ({ focused, color }) => (
            <NutritionIcon focused={focused} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="Stats" 
        component={StatsScreen}
        options={{
          tabBarLabel: 'Stats',
          tabBarIcon: ({ focused, color }) => (
            <StatsIcon focused={focused} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profil',
          tabBarIcon: ({ focused, color }) => (
            <ProfileIcon focused={focused} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    height: 85,
    paddingBottom: 20,
    paddingTop: 12,
    borderTopWidth: 1,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 4,
  },
});