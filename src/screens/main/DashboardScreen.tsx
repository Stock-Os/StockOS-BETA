import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../contexts/ThemeContext';
import { useUserData } from '../../contexts/UserDataContext';
import { useAuth } from '../../contexts/AuthContext';
import { SemaineWidget } from '../../components/ui/SemaineWidget';
import { DashboardCard } from '../../components/ui/DashboardCard';
import { SquircleView } from 'expo-squircle-view';

export const DashboardScreen: React.FC = () => {
  const { theme } = useTheme();
  const { userData } = useUserData();
  const { user } = useAuth();

  // Friends avatars data
  const friends = [
    { id: 1, avatar: '👦🏽', color: '#F59E0B' },
    { id: 2, avatar: '👨🏿', color: '#10B981' },
    { id: 3, avatar: '👨🏼', color: '#F59E0B' },
    { id: 4, avatar: '👩🏼', color: '#6B7280' },
    { id: 5, avatar: '👩🏻', color: '#EF4444' },
  ];

  // Week days data
  const weekDays = [
    { day: 'SAM', date: 7, isToday: true },
    { day: 'DIM', date: 7 },
    { day: 'LUN', date: 8 },
    { day: 'MAR', date: 9 },
    { day: 'MER', date: 10 },
    { day: 'JEU', date: 11 },
    { day: 'VEN', date: 12 },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Header avec avatar et nom */}
        <View style={styles.header}>
          <View style={styles.userInfo}>
            <View style={styles.avatar}>
              <Text style={styles.avatarEmoji}>👩🏻‍💻</Text>
            </View>
            <View>
              <Text style={[styles.welcome, { color: theme.colors.text.secondary }]}>
                Welcome 👋
              </Text>
              <Text style={[styles.userName, { color: theme.colors.text.primary }]}>
                Sophia Muller
              </Text>
            </View>
          </View>
          
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.iconButton}>
              <Text style={styles.icon}>🔍</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Text style={styles.icon}>🔔</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Daily Challenge Card */}
        <DashboardCard
          title="Daily Challenge"
          subtitle="Sprint for 30 seconds. Repeat this interval 5 times."
          icon="🏃‍♀️"
          backgroundColor="#8B7CF6"
          style={styles.challengeCard}
          onPress={() => Alert.alert('Challenge', 'Starting daily challenge...')}
        >
          <View style={styles.challengeActions}>
            <TouchableOpacity style={styles.dismissButton}>
              <Text style={styles.dismissText}>✕</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.doneButton}>
              <Text style={styles.doneText}>Done ›</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.addButton}>
              <Text style={styles.addText}>+</Text>
            </TouchableOpacity>
          </View>
        </DashboardCard>

        {/* Friends Section */}
        <View style={styles.friendsSection}>
          <Text style={[styles.friendsTitle, { color: theme.colors.text.primary }]}>
            Friends:
          </Text>
          <View style={styles.friendsList}>
            {friends.map((friend) => (
              <TouchableOpacity key={friend.id} style={[styles.friendAvatar, { backgroundColor: friend.color }]}>
                <Text style={styles.friendEmoji}>{friend.avatar}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Semaine Widget */}
        <SemaineWidget days={weekDays} />

        {/* Dashboard Section */}
        <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
          Dashboard
        </Text>

        {/* Dashboard Grid */}
        <View style={styles.dashboardGrid}>
          {/* Première ligne */}
          <View style={styles.gridRow}>
            <View style={styles.gridItemLarge}>
              <DashboardCard
                title="Programme Sportif"
                icon="🏋️"
                backgroundColor="#F3F4F6"
                textColor="#1F2937"
                onPress={() => Alert.alert('Programme', 'Navigation vers programme sportif')}
              />
            </View>
            <View style={styles.gridItemSmall}>
              <DashboardCard
                title="Régime Diet"
                subtitle="Prochain repas"
                icon="🍽️"
                backgroundColor="#8B7CF6"
                style={styles.smallCard}
                onPress={() => Alert.alert('Diet', 'Navigation vers régime')}
              >
                <View style={styles.mealInfo}>
                  <Text style={styles.mealTime}>3H:</Text>
                  <Text style={styles.mealDescription}>
                    Pâtes à la carbonara{'\n'}Blanc de dinde
                  </Text>
                </View>
              </DashboardCard>
            </View>
          </View>

          {/* Deuxième ligne */}
          <View style={styles.gridRow}>
            <View style={styles.gridItemSmall}>
              <DashboardCard
                title="Générer un programme"
                icon="✨"
                backgroundColor="#8B7CF6"
                style={styles.smallCard}
                onPress={() => Alert.alert('Générer', 'Génération d\'un nouveau programme')}
              />
            </View>
            <View style={styles.gridItemLarge}>
              <DashboardCard
                title="Dashboard"
                icon="📊"
                backgroundColor="#8B7CF6"
                onPress={() => Alert.alert('Stats', 'Navigation vers statistiques')}
              >
                <View style={styles.chartContainer}>
                  <Text style={styles.chartPlaceholder}>📈 sthq</Text>
                </View>
              </DashboardCard>
            </View>
          </View>

          {/* Troisième ligne */}
          <View style={styles.gridRow}>
            <View style={styles.gridItemLarge}>
              <DashboardCard
                title="Consulter les Objectifs."
                icon="🎯"
                backgroundColor="#F3F4F6"
                textColor="#1F2937"
                onPress={() => Alert.alert('Objectifs', 'Navigation vers objectifs')}
              />
            </View>
            <View style={styles.gridItemSmall}>
              <DashboardCard
                title="Séries de Progression"
                icon="⚡"
                backgroundColor="#8B7CF6"
                style={styles.smallCard}
                onPress={() => Alert.alert('Progression', 'Navigation vers progression')}
              />
            </View>
          </View>
        </View>

        {/* Bottom Cards */}
        <View style={styles.bottomCards}>
          <SquircleView
            style={[styles.bottomCard, { backgroundColor: '#1F2937' }]}
            squircleParams={{
              cornerSmoothing: 0.6,
              cornerRadius: 16,
              fillColor: '#1F2937',
            }}
          >
            <Text style={styles.bottomCardText}>100 BAKE A CAKE ON STREAM</Text>
          </SquircleView>

          <SquircleView
            style={[styles.bottomCard, { backgroundColor: '#1F2937' }]}
            squircleParams={{
              cornerSmoothing: 0.6,
              cornerRadius: 16,
              fillColor: '#1F2937',
            }}
          >
            <View style={styles.bottomCardContent}>
              <View style={styles.bottomCardBadge}>
                <Text style={styles.badgeText}>125</Text>
              </View>
              <Text style={styles.bottomCardText}>»</Text>
              <View style={styles.stars}>
                <Text>✨</Text>
              </View>
            </View>
          </SquircleView>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarEmoji: {
    fontSize: 24,
  },
  welcome: {
    fontSize: 14,
    marginBottom: 2,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 18,
  },
  challengeCard: {
    marginBottom: 20,
    position: 'relative',
  },
  challengeActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 12,
    marginTop: 12,
  },
  dismissButton: {
    position: 'absolute',
    top: -80,
    right: 0,
  },
  dismissText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  doneButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  doneText: {
    color: '#8B7CF6',
    fontWeight: 'bold',
  },
  addButton: {
    position: 'absolute',
    bottom: -40,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1F2937',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  friendsSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  friendsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 12,
  },
  friendsList: {
    flexDirection: 'row',
    gap: 8,
  },
  friendAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  friendEmoji: {
    fontSize: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    marginTop: 8,
  },
  dashboardGrid: {
    gap: 12,
    marginBottom: 20,
  },
  gridRow: {
    flexDirection: 'row',
    gap: 12,
  },
  gridItemLarge: {
    flex: 2,
  },
  gridItemSmall: {
    flex: 1,
  },
  smallCard: {
    minHeight: 100,
  },
  mealInfo: {
    marginTop: 8,
  },
  mealTime: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  mealDescription: {
    fontSize: 12,
    color: '#FFFFFF',
    opacity: 0.8,
    marginTop: 4,
  },
  chartContainer: {
    marginTop: 12,
    alignItems: 'center',
  },
  chartPlaceholder: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  bottomCards: {
    gap: 12,
  },
  bottomCard: {
    padding: 16,
    minHeight: 60,
    justifyContent: 'center',
  },
  bottomCardText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  bottomCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bottomCardBadge: {
    backgroundColor: '#10B981',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  badgeText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  stars: {
    flexDirection: 'row',
  },
});