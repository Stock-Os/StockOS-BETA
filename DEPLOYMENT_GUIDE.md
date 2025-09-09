# 🚀 Guide de Déploiement - Stock OS

## 📱 Application Expo Prête au Déploiement

L'application **Stock OS** est maintenant prête à être publiée sur Expo. Voici le guide complet pour la publication.

### ✅ État Actuel

- **Serveur de développement** : Actif sur `http://localhost:8082`
- **Configuration Expo** : Complète avec projectId `56d8c979-c175-45a5-b546-c2d76d3cdf9e`
- **Version actuelle** : Stock OS V.1.0.2
- **Plateformes supportées** : iOS, Android, Web

### 🔐 Prérequis pour la Publication

1. **Connexion Expo** requise avec le compte `os.stock.ai@gmail.com`
2. **EAS CLI** installé globalement
3. **Accès au projet** Expo configuré

### 📋 Commandes de Publication

#### 1. Connexion à Expo (Interactive)
```bash
cd "C:\Users\kaisb\Documents\StockOS_BETA"
npx expo login
# Entrez: os.stock.ai@gmail.com
# Mot de passe requis
```

#### 2. Publication sur Expo Go (Développement)
```bash
npx expo publish --release-channel default
```

#### 3. Build EAS pour Production
```bash
# Build Android APK
npx eas build --platform android --profile preview

# Build iOS TestFlight
npx eas build --platform ios --profile preview

# Build pour les deux plateformes
npx eas build --platform all --profile production
```

#### 4. Publication sur les Stores
```bash
# Android Play Store
npx eas submit --platform android

# iOS App Store
npx eas submit --platform ios
```

### 📱 Test avec Expo Go

1. **Installer Expo Go** sur votre appareil mobile
2. **Scanner le QR Code** affiché par le serveur de développement
3. **Tester l'application** en temps réel

### 🌐 Déploiement Web (PWA)

```bash
# Build pour le web
npx expo export:web

# Déployer sur Netlify/Vercel
npx expo export:web --output-dir dist
```

### 🔄 Mise à Jour Automatique

Le projet inclut un système de déploiement automatique :

```bash
# Mise à jour de version et déploiement complet
npm run deploy

# Mise à jour de version seulement
npm run update
```

### 📊 Fonctionnalités Disponibles

#### ✅ Complètement Implémentées
- **Authentification** : Login, Register, Forgot Password
- **Onboarding** : 12 questions essentielles + génération finale
- **Dashboard** : Tracking quotidien complet
- **Programme** : Suivi d'entraînements hebdomadaire
- **Nutrition** : Tracking calorique et macronutriments

#### 🔄 En Développement (Placeholders)
- Questions onboarding 13-25
- Scanner d'aliments
- Génération IA des programmes
- Synchronisation wearables

### 🎯 URL de Partage

Une fois publié, l'application sera accessible via :
- **Expo Go** : QR code ou lien deep
- **Web** : URL publique
- **Builds natifs** : Fichiers APK/IPA

### 📈 Métriques de Performance

- **Bundle size** : Optimisé pour mobile
- **Performance** : 60fps avec Reanimated 2
- **Compatibilité** : iOS 11+, Android 6+, Navigateurs modernes

### 🛠️ Configuration Technique

```json
{
  "expo": {
    "name": "Stock OS V.1.0.2",
    "slug": "stockos-beta",
    "version": "1.0.2",
    "platforms": ["ios", "android", "web"],
    "projectId": "56d8c979-c175-45a5-b546-c2d76d3cdf9e"
  }
}
```

### 🚀 Prochaines Étapes

1. **Connexion manuelle** au compte Expo
2. **Publication sur Expo Go** pour tests
3. **Build EAS** pour les stores
4. **Feedback et itérations**

---

**Stock OS** - Votre coach personnel de transformation physique 💪