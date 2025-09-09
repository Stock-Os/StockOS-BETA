#!/usr/bin/env node
/**
 * Script de mise à jour automatique des versions Stock OS
 * Logique: V.X.Y.Z où Z+1, Y+1 quand Z=10, X+1 à la 200ème mise à jour
 */

const fs = require('fs');
const path = require('path');

class StockOSVersioning {
    constructor() {
        this.packagePath = path.join(__dirname, '..', 'package.json');
        this.appPath = path.join(__dirname, '..', 'app.json');
    }

    loadCurrentVersion() {
        try {
            const packageJson = JSON.parse(fs.readFileSync(this.packagePath, 'utf8'));
            return packageJson.stockos.version;
        } catch (error) {
            console.error('❌ Erreur lors du chargement de la version:', error.message);
            process.exit(1);
        }
    }

    calculateNextVersion(currentVersion) {
        let { major, minor, patch, updateCount } = currentVersion;
        
        // Incrémenter le compteur de mise à jour
        updateCount += 1;
        
        // Logique de versioning Stock OS
        if (updateCount >= 200) {
            // À partir de la 200ème mise à jour: X=2
            major = 2;
            const updatesAfter200 = updateCount - 200;
            minor = Math.floor(updatesAfter200 / 10);
            patch = updatesAfter200 % 10;
        } else {
            // Pour les 199 premières mises à jour: X=1
            major = 1;
            const zeroBasedCount = updateCount - 1;
            minor = Math.floor(zeroBasedCount / 10);
            patch = (zeroBasedCount % 10) + 1;
            
            // Si patch atteint 10, passer à la dizaine suivante
            if (patch === 10) {
                minor += 1;
                patch = 0;
            }
        }

        const versionString = `${major}.${minor}.${patch}`;
        const name = `Stock OS V.${versionString}`;

        return {
            major,
            minor,
            patch,
            updateCount,
            versionString,
            name
        };
    }

    updateFiles(newVersion) {
        try {
            // Mise à jour package.json
            const packageJson = JSON.parse(fs.readFileSync(this.packagePath, 'utf8'));
            packageJson.version = newVersion.versionString;
            packageJson.stockos.version = {
                major: newVersion.major,
                minor: newVersion.minor,
                patch: newVersion.patch,
                updateCount: newVersion.updateCount,
                name: newVersion.name
            };
            fs.writeFileSync(this.packagePath, JSON.stringify(packageJson, null, 2));

            // Mise à jour app.json
            const appJson = JSON.parse(fs.readFileSync(this.appPath, 'utf8'));
            appJson.expo.name = newVersion.name;
            appJson.expo.version = newVersion.versionString;
            appJson.expo.runtimeVersion = newVersion.versionString;
            fs.writeFileSync(this.appPath, JSON.stringify(appJson, null, 2));

            return true;
        } catch (error) {
            console.error('❌ Erreur lors de la mise à jour des fichiers:', error.message);
            return false;
        }
    }

    run() {
        console.log('\n🚀 === MISE À JOUR VERSION STOCK OS ===\n');
        
        const currentVersion = this.loadCurrentVersion();
        console.log(`📊 Version actuelle: ${currentVersion.name} (Update #${currentVersion.updateCount})`);
        
        const newVersion = this.calculateNextVersion(currentVersion);
        console.log(`🔄 Nouvelle version: ${newVersion.name} (Update #${newVersion.updateCount})`);
        
        if (this.updateFiles(newVersion)) {
            console.log('✅ Fichiers mis à jour avec succès!');
            console.log(`🎯 Prêt pour le déploiement: ${newVersion.name}\n`);
            return newVersion;
        } else {
            console.log('❌ Échec de la mise à jour des fichiers\n');
            process.exit(1);
        }
    }
}

// Exécution
if (require.main === module) {
    const versioning = new StockOSVersioning();
    versioning.run();
} else {
    module.exports = StockOSVersioning;
}