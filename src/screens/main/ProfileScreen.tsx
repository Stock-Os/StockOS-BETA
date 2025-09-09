import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import { useUserData } from '../../contexts/UserDataContext';
import { Button } from '../../components/ui/Button';

export const ProfileScreen: React.FC = () => {
  const { theme } = useTheme();
  const { signOut } = useAuth();
  const { state: userData } = useUserData();

  const handleSignOut = () => {
    Alert.alert(
      'Déconnexion',
      'Êtes-vous sûr de vouloir vous déconnecter ?',
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Déconnexion', onPress: signOut, style: 'destructive' },
      ]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.colors.text.primary }]}>
            Profil
          </Text>
        </View>

        <View style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Text style={[styles.cardTitle, { color: theme.colors.text.primary }]}>
            Informations personnelles
          </Text>
          
          {userData.firstName && (
            <View style={styles.infoRow}>
              <Text style={[styles.label, { color: theme.colors.text.light }]}>Prénom</Text>
              <Text style={[styles.value, { color: theme.colors.text.primary }]}>{userData.firstName}</Text>
            </View>
          )}

          {userData.age && (
            <View style={styles.infoRow}>
              <Text style={[styles.label, { color: theme.colors.text.light }]}>Âge</Text>
              <Text style={[styles.value, { color: theme.colors.text.primary }]}>{userData.age} ans</Text>
            </View>
          )}

          {userData.gender && (
            <View style={styles.infoRow}>
              <Text style={[styles.label, { color: theme.colors.text.light }]}>Genre</Text>
              <Text style={[styles.value, { color: theme.colors.text.primary }]}>{userData.gender}</Text>
            </View>
          )}

          {userData.height && (
            <View style={styles.infoRow}>
              <Text style={[styles.label, { color: theme.colors.text.light }]}>Taille</Text>
              <Text style={[styles.value, { color: theme.colors.text.primary }]}>{userData.height} cm</Text>
            </View>
          )}

          {userData.weight && (
            <View style={styles.infoRow}>
              <Text style={[styles.label, { color: theme.colors.text.light }]}>Poids</Text>
              <Text style={[styles.value, { color: theme.colors.text.primary }]}>{userData.weight} kg</Text>
            </View>
          )}
        </View>

        <View style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Text style={[styles.cardTitle, { color: theme.colors.text.primary }]}>
            Objectif
          </Text>
          
          {userData.goal && (
            <Text style={[styles.goalText, { color: theme.colors.text.primary }]}>
              {userData.goal}
            </Text>
          )}
        </View>

        <View style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Text style={[styles.cardTitle, { color: theme.colors.text.primary }]}>
            Paramètres
          </Text>
          
          <TouchableOpacity style={styles.settingRow}>
            <Text style={[styles.settingText, { color: theme.colors.text.primary }]}>
              Modifier mes informations
            </Text>
            <Text style={[styles.settingArrow, { color: theme.colors.text.light }]}>→</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.settingRow}>
            <Text style={[styles.settingText, { color: theme.colors.text.primary }]}>
              Notifications
            </Text>
            <Text style={[styles.settingArrow, { color: theme.colors.text.light }]}>→</Text>
          </TouchableOpacity>
        </View>

        <Button
          title="Se déconnecter"
          onPress={handleSignOut}
          style={styles.signOutButton}
          variant="secondary"
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingTop: 60,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  card: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  label: {
    fontSize: 14,
  },
  value: {
    fontSize: 16,
    fontWeight: '500',
  },
  goalText: {
    fontSize: 16,
    lineHeight: 24,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  settingText: {
    fontSize: 16,
  },
  settingArrow: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  signOutButton: {
    marginTop: 20,
  },
});