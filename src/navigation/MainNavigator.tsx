import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, Platform, PixelRatio, ImageBackground } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

import { DashboardScreen } from '../screens/main/DashboardScreen';
import { ProgramScreen } from '../screens/main/ProgramScreen';
import { NutritionScreen } from '../screens/main/NutritionScreen';
import { StatsScreen } from '../screens/main/StatsScreen';
import { ProfileScreen } from '../screens/main/ProfileScreen';

import { MainTabParamList } from '../types';

const Tab = createBottomTabNavigator<MainTabParamList>();

const { width: screenWidth } = Dimensions.get('window');
const scale = screenWidth / 428; // iPhone 13 Pro Max référence
const scaleSize = (size: number) => Math.round(size * scale);


// Custom Tab Bar Component - Hidden since navbar is in background
const CustomTabBar: React.FC<any> = ({ state, descriptors, navigation }) => {
  return null;
};

export const MainNavigator: React.FC = () => {
  const { theme } = useTheme();

  return (
    <ImageBackground
      source={require('../../assets/ui/Programme/Background_StockOS.png')}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <Tab.Navigator
        tabBar={(props) => <CustomTabBar {...props} />}
        screenOptions={{
          headerShown: false,
          tabBarStyle: { backgroundColor: 'transparent' },
        }}
        sceneContainerStyle={{ backgroundColor: 'transparent' }}
      >
      <Tab.Screen 
        name="Dashboard" 
        component={DashboardScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: () => null,
        }}
      />
      <Tab.Screen 
        name="Program" 
        component={ProgramScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: () => null,
        }}
      />
      <Tab.Screen 
        name="Nutrition" 
        component={NutritionScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: () => null,
        }}
      />
      <Tab.Screen 
        name="Stats" 
        component={StatsScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: () => null,
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: () => null,
        }}
      />
      </Tab.Navigator>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  customTabBar: {
    position: 'relative',
    height: 120,
    paddingBottom: 0,
    backgroundColor: 'transparent',
  },
  navbarBackground: {
    position: 'absolute',
    bottom: 0,
    left: -20,
    right: -20,
    width: screenWidth + 40,
    height: 100,
    zIndex: 900,
  },
});