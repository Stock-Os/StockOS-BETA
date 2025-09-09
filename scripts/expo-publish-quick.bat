@echo off
echo ============================================
echo 📱 PUBLICATION RAPIDE STOCK OS - EXPO GO
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

echo 📤 Publication sur Expo Go...
npx expo publish --release-channel production

if %ERRORLEVEL% NEQ 0 (
    echo ❌ Erreur lors de la publication
    pause
    exit /b 1
)

echo.
echo 🎉 PUBLICATION TERMINÉE AVEC SUCCÈS!
echo.
echo 📱 Stock OS V.1.0.2 est maintenant disponible sur Expo Go!
echo 📋 Partagez le lien ou QR code pour que les utilisateurs puissent tester
echo.

echo 🔍 Génération du QR code pour partage...
npx expo start --offline

pause