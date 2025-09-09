#!/usr/bin/env node
/**
 * Script de configuration initiale Stock OS
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

class StockOSSetup {
    constructor() {
        this.config = this.loadConfig();
    }

    loadConfig() {
        const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8'));
        return packageJson.stockos.config;
    }

    executeCommand(command, description, options = {}) {
        console.log(`\n🔄 ${description}...`);
        try {
            const result = execSync(command, {
                encoding: 'utf8',
                stdio: options.silent ? 'pipe' : 'inherit',
                ...options
            });
            console.log(`✅ ${description} - OK`);
            return result;
        } catch (error) {
            console.error(`❌ ${description} - Échec`);
            if (!options.allowFailure) {
                throw error;
            }
            return null;
        }
    }

    async setup() {
        console.log('\n🚀 === CONFIGURATION STOCK OS ===\n');

        // 1. Installation des dépendances
        console.log('1️⃣ Installation des dépendances...');
        try {
            this.executeCommand('npm install', 'Installation NPM');
        } catch (error) {
            console.log('⚠️  Installation NPM échouée, continuons...');
        }

        // 2. Installation Expo CLI globalement
        console.log('\n2️⃣ Installation Expo CLI...');
        try {
            this.executeCommand('npm install -g @expo/cli eas-cli', 'Installation Expo/EAS CLI');
        } catch (error) {
            console.log('⚠️  Installation CLI échouée, continuons...');
        }

        // 3. Initialisation Git
        console.log('\n3️⃣ Configuration Git...');
        if (!fs.existsSync('.git')) {
            this.executeCommand('git init', 'Initialisation Git');
        }
        
        this.executeCommand(`git config user.email "${this.config.credentials.email}"`, 'Configuration email Git');
        this.executeCommand('git config user.name "Stock OS Auto Deploy"', 'Configuration nom Git');

        // 4. Création du dossier Version
        console.log('\n4️⃣ Configuration des dossiers...');
        if (!fs.existsSync(this.config.versionFolder)) {
            fs.mkdirSync(this.config.versionFolder, { recursive: true });
            console.log(`✅ Dossier Version créé: ${this.config.versionFolder}`);
        }

        // 5. Instructions finales
        console.log('\n✅ === CONFIGURATION TERMINÉE ===\n');
        console.log('📋 ÉTAPES MANUELLES RESTANTES:\n');
        
        console.log('1️⃣ Connexion Expo:');
        console.log('   eas login');
        console.log(`   Email: ${this.config.credentials.email}`);
        console.log('   Password: Desjonqueres7-/!!!Castigat\n');
        
        console.log('2️⃣ Configuration GitHub:');
        console.log('   git remote add origin <URL_DE_VOTRE_REPO>\n');
        
        console.log('3️⃣ Test du système:');
        console.log('   npm run deploy\n');
        
        console.log('🎯 Configuration automatique terminée!');
        console.log('⚡ Raccourci VS Code: Ctrl+Shift+U pour déployer\n');
    }
}

// Exécution
if (require.main === module) {
    const setup = new StockOSSetup();
    setup.setup().catch(console.error);
}