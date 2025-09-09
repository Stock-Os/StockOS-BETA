#!/bin/bash

echo "============================================"
echo "🔐 CONNEXION EXPO - STOCK OS"  
echo "============================================"
echo ""

# Aller dans le répertoire du projet
cd "C:\Users\kaisb\Documents\StockOS_BETA"

# Variables de connexion
EXPO_EMAIL="os.stock.ai@gmail.com"
EXPO_PASSWORD="Desjonqueres7-/!!!Castigat"

echo "📧 Email: $EXPO_EMAIL"
echo "🔑 Tentative de connexion..."

# Essayer de se connecter avec les identifiants
echo "$EXPO_PASSWORD" | npx expo login --username "$EXPO_EMAIL"

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Connexion réussie!"
    echo ""
    
    # Vérifier le statut
    echo "👤 Utilisateur connecté:"
    npx expo whoami
    
    echo ""
    echo "🚀 Prêt pour publication!"
    echo ""
    echo "Options disponibles:"
    echo "1. Publication Expo Go: npx expo publish"
    echo "2. Build EAS: npx eas build --platform all"
    echo "3. Soumission stores: npx eas submit"
    
else
    echo "❌ Échec de connexion"
    exit 1
fi