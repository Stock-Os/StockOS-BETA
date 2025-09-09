@echo off
echo ============================================
echo 🚀 PUBLICATION STOCK OS SUR EXPO
echo ============================================
echo.

cd "C:\Users\kaisb\Documents\StockOS_BETA"

echo 🔐 Connexion à Expo...
echo Email: os.stock.ai@gmail.com
npx expo login --username os.stock.ai@gmail.com

if %ERRORLEVEL% NEQ 0 (
    echo ❌ Erreur de connexion
    pause
    exit /b 1
)

echo.
echo ✅ Connexion réussie!
echo.

echo 📋 Vérification du statut...
npx expo whoami

echo.
echo 📦 Création du build EAS pour toutes les plateformes...
npx eas build --platform all --profile production --non-interactive

if %ERRORLEVEL% NEQ 0 (
    echo ❌ Erreur lors du build
    pause
    exit /b 1
)

echo.
echo 🎉 BUILD TERMINÉ AVEC SUCCÈS!
echo.
echo 📱 Votre application Stock OS V.1.0.2 a été buildée!
echo 🏪 Prêt pour soumission aux stores avec: npx eas submit
echo.
pause