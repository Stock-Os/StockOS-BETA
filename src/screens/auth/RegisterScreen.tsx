import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { Button } from '../../components/ui/Button';
import { TextInput } from '../../components/ui/TextInput';
import { AuthStackParamList } from '../../types';
import Svg, { Path } from 'react-native-svg';

type RegisterScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Register'>;

interface RegisterScreenProps {
  navigation: RegisterScreenNavigationProp;
}

export const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
  const { theme } = useTheme();
  const { signUp, state } = useAuth();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const validateForm = () => {
    const newErrors: typeof errors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Nom requis';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Le nom doit contenir au moins 2 caractères';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email requis';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Format d\'email invalide';
    }
    
    if (!formData.password) {
      newErrors.password = 'Mot de passe requis';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Le mot de passe doit contenir au moins 8 caractères';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Le mot de passe doit contenir au moins une minuscule, une majuscule et un chiffre';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirmation requise';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }
    
    if (!acceptedTerms) {
      Alert.alert(
        'Conditions d\'utilisation',
        'Veuillez accepter les conditions d\'utilisation pour continuer'
      );
      return false;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;
    
    try {
      await signUp(formData.email, formData.password, formData.name.trim());
    } catch (error: any) {
      Alert.alert(
        'Erreur de création de compte',
        error.message || 'Une erreur est survenue lors de la création du compte'
      );
    }
  };

  const BackIcon = () => (
    <Svg width={24} height={24} viewBox="0 0 24 24">
      <Path
        d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"
        fill={theme.colors.text.primary}
      />
    </Svg>
  );

  const CheckIcon = () => (
    <Svg width={20} height={20} viewBox="0 0 24 24">
      <Path
        d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"
        fill={acceptedTerms ? theme.colors.primary : theme.colors.neutral[400]}
      />
    </Svg>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <BackIcon />
          </TouchableOpacity>

          <View style={styles.header}>
            <Text style={[styles.title, { color: theme.colors.text.primary }]}>
              Créer un compte
            </Text>
            <Text style={[styles.subtitle, { color: theme.colors.text.light }]}>
              Rejoignez Stock OS et commencez votre transformation
            </Text>
          </View>

          <View style={styles.form}>
            <TextInput
              label="Nom complet"
              placeholder="Votre nom"
              value={formData.name}
              onChangeText={(name) => {
                setFormData({ ...formData, name });
                if (errors.name) setErrors({ ...errors, name: undefined });
              }}
              error={errors.name}
              autoCapitalize="words"
              autoCorrect={false}
            />

            <TextInput
              label="Email"
              placeholder="votre.email@exemple.com"
              value={formData.email}
              onChangeText={(email) => {
                setFormData({ ...formData, email });
                if (errors.email) setErrors({ ...errors, email: undefined });
              }}
              error={errors.email}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />

            <TextInput
              label="Mot de passe"
              placeholder="••••••••"
              value={formData.password}
              onChangeText={(password) => {
                setFormData({ ...formData, password });
                if (errors.password) setErrors({ ...errors, password: undefined });
              }}
              error={errors.password}
              showPasswordToggle
              autoCapitalize="none"
              helperText="Au moins 8 caractères avec majuscule, minuscule et chiffre"
            />

            <TextInput
              label="Confirmer le mot de passe"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChangeText={(confirmPassword) => {
                setFormData({ ...formData, confirmPassword });
                if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: undefined });
              }}
              error={errors.confirmPassword}
              showPasswordToggle
              autoCapitalize="none"
            />

            <TouchableOpacity
              style={styles.termsContainer}
              onPress={() => setAcceptedTerms(!acceptedTerms)}
            >
              <View style={[
                styles.checkbox,
                {
                  borderColor: acceptedTerms ? theme.colors.primary : theme.colors.neutral[400],
                  backgroundColor: acceptedTerms ? theme.colors.primary + '20' : 'transparent',
                }
              ]}>
                {acceptedTerms && <CheckIcon />}
              </View>
              <View style={styles.termsText}>
                <Text style={[styles.termsLabel, { color: theme.colors.text.secondary }]}>
                  J'accepte les{' '}
                  <Text style={{ color: theme.colors.primary, textDecorationLine: 'underline' }}>
                    conditions d'utilisation
                  </Text>
                  {' '}et la{' '}
                  <Text style={{ color: theme.colors.primary, textDecorationLine: 'underline' }}>
                    politique de confidentialité
                  </Text>
                </Text>
              </View>
            </TouchableOpacity>

            <Button
              title="Créer mon compte"
              onPress={handleRegister}
              loading={state.isLoading}
              fullWidth
              style={styles.registerButton}
            />
          </View>

          <View style={styles.footer}>
            <Text style={[styles.footerText, { color: theme.colors.text.light }]}>
              Vous avez déjà un compte ?{' '}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={[styles.footerLink, { color: theme.colors.primary }]}>
                Se connecter
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 32,
  },
  backButton: {
    alignSelf: 'flex-start',
    padding: 8,
    marginBottom: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
  form: {
    marginBottom: 32,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 24,
    marginTop: 8,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  termsText: {
    flex: 1,
  },
  termsLabel: {
    fontSize: 14,
    lineHeight: 20,
  },
  registerButton: {
    marginTop: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
  },
  footerLink: {
    fontSize: 14,
    fontWeight: '600',
  },
});