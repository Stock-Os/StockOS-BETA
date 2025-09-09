#!/usr/bin/env node
/**
 * Script de déploiement automatique Stock OS
 * 1. Met à jour la version
 * 2. Copie locale vers dossier Version  
 * 3. Commit et push GitHub
 * 4. Publication Expo
 */

const fs = require('fs');
const path = require('path');
const { execSync, spawn } = require('child_process');
const StockOSVersioning = require('./auto-update.js');

class StockOSDeployer {
    constructor() {
        this.versioning = new StockOSVersioning();
        this.config = this.loadConfig();
    }

    loadConfig() {
        try {
            const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8'));
            return packageJson.stockos.config;
        } catch (error) {
            console.error('❌ Erreur lors du chargement de la configuration:', error.message);
            process.exit(1);
        }
    }

    executeCommand(command, description, options = {}) {
        console.log(`\n🔄 ${description}...`);
        try {
            const result = execSync(command, {
                encoding: 'utf8',
                stdio: options.silent ? 'pipe' : 'inherit',
                cwd: process.cwd(),
                ...options
            });
            console.log(`✅ ${description} - Terminé`);
            return result;
        } catch (error) {
            if (!options.allowFailure) {
                console.error(`❌ ${description} - Échec:`, error.message);
                throw error;
            }
            return null;
        }
    }

    // 1. Mise à jour de version
    updateVersion() {
        console.log('\n1️⃣ === MISE À JOUR VERSION ===');
        return this.versioning.run();
    }

    // 2. Copie locale vers dossier Version
    copyToVersionFolder(versionInfo) {
        console.log('\n2️⃣ === COPIE LOCALE ===');
        
        const versionFolder = path.join(this.config.versionFolder, versionInfo.name);
        
        // Créer le dossier parent
        if (!fs.existsSync(this.config.versionFolder)) {
            fs.mkdirSync(this.config.versionFolder, { recursive: true });
            console.log(`📁 Dossier créé: ${this.config.versionFolder}`);
        }

        // Créer le dossier de version
        if (!fs.existsSync(versionFolder)) {
            fs.mkdirSync(versionFolder, { recursive: true });
        }

        // Copier les fichiers (méthode compatible Windows)
        try {
            const projectRoot = process.cwd();
            const excludePatterns = ['node_modules', '.git', '.expo', 'Version'];
            
            // Lister tous les fichiers à copier
            const files = this.getAllFiles(projectRoot, excludePatterns);
            
            for (const file of files) {
                const relativePath = path.relative(projectRoot, file);
                const destPath = path.join(versionFolder, relativePath);
                const destDir = path.dirname(destPath);
                
                // Créer le dossier de destination si nécessaire
                if (!fs.existsSync(destDir)) {
                    fs.mkdirSync(destDir, { recursive: true });
                }
                
                // Copier le fichier
                fs.copyFileSync(file, destPath);
            }
            
            console.log(`✅ Projet copié dans: ${versionFolder}`);
            console.log(`📊 ${files.length} fichiers copiés`);
            
        } catch (error) {
            console.error('❌ Erreur lors de la copie:', error.message);
            throw error;
        }
    }

    getAllFiles(dirPath, excludePatterns = []) {
        let files = [];
        
        const items = fs.readdirSync(dirPath);
        
        for (const item of items) {
            // Ignorer les patterns exclus
            if (excludePatterns.some(pattern => item.includes(pattern))) {
                continue;
            }
            
            const fullPath = path.join(dirPath, item);
            const stat = fs.statSync(fullPath);
            
            if (stat.isDirectory()) {
                files = files.concat(this.getAllFiles(fullPath, excludePatterns));
            } else {
                files.push(fullPath);
            }
        }
        
        return files;
    }

    // 3. Déploiement GitHub
    deployToGitHub(versionInfo) {
        console.log('\n3️⃣ === DÉPLOIEMENT GITHUB ===');
        
        try {
            // Initialiser Git si nécessaire
            if (!fs.existsSync('.git')) {
                this.executeCommand('git init', 'Initialisation du repository Git');
            }

            // Configuration Git
            this.executeCommand(`git config user.email "${this.config.credentials.email}"`, 'Configuration email Git');
            this.executeCommand('git config user.name "Stock OS Auto Deploy"', 'Configuration nom Git');

            // Ajouter les fichiers
            this.executeCommand('git add .', 'Ajout des fichiers');

            // Commit
            const commitMessage = `🚀 ${versionInfo.name} - Update automatique #${versionInfo.updateCount}

🎯 Generated with Claude Code
Co-Authored-By: Claude <noreply@anthropic.com>`;
            
            this.executeCommand(`git commit -m "${commitMessage}"`, 'Création du commit');

            // Basculer vers la branche spécifiée
            try {
                this.executeCommand(`git checkout -b ${this.config.githubBranch}`, `Création branche ${this.config.githubBranch}`, { allowFailure: true });
            } catch (error) {
                this.executeCommand(`git checkout ${this.config.githubBranch}`, `Basculement branche ${this.config.githubBranch}`, { allowFailure: true });
            }

            // Pousser vers la branche GitHub configurée
            try {
                // Vérifier si une remote existe
                const remoteCheck = this.executeCommand('git remote -v', 'Vérification remote Git', { 
                    silent: true, 
                    allowFailure: true 
                });
                
                if (remoteCheck && remoteCheck.includes('origin')) {
                    // Push vers la branche configurée
                    this.executeCommand(`git push -u origin ${this.config.githubBranch}`, `Push vers branche ${this.config.githubBranch}`, { allowFailure: true });
                    console.log('✅ GitHub - Commit poussé vers la branche ' + this.config.githubBranch);
                } else {
                    console.log('⚠️  Remote Git non configurée - Commande manuelle:');
                    console.log('   git remote add origin <URL_DE_VOTRE_REPO>');
                    console.log(`   git push -u origin ${this.config.githubBranch}`);
                }
            } catch (error) {
                console.log('⚠️  Push GitHub échoué - Commande manuelle:');
                console.log(`   git push -u origin ${this.config.githubBranch}`);
            }

        } catch (error) {
            console.error('❌ Erreur GitHub:', error.message);
        }
    }

    // 4. Publication Expo
    async deployToExpo(versionInfo) {
        console.log('\n4️⃣ === PUBLICATION EXPO ===');
        
        return new Promise((resolve) => {
            // Vérifier la connexion Expo
            let loginCheck;
            try {
                loginCheck = this.executeCommand('npx expo whoami', 'Vérification connexion Expo', { 
                    silent: true, 
                    allowFailure: true 
                });
            } catch (error) {
                loginCheck = null;
            }
            
            if (!loginCheck || loginCheck.includes('Not logged in')) {
                console.log('⚠️  Connexion Expo requise:');
                console.log(`   npx expo login --username ${this.config.credentials.email}`);
                console.log('   Password: [Votre mot de passe]');
                
                // Essayer de se connecter automatiquement
                try {
                    console.log('🔐 Tentative de connexion automatique...');
                    this.executeCommand(`npx expo login --username ${this.config.credentials.email} --password "Desjonqueres7-/!!!Castigat"`, 'Connexion Expo automatique');
                } catch (loginError) {
                    console.log('❌ Connexion automatique échouée - Connexion manuelle requise');
                    resolve(false);
                    return;
                }
            }

            try {
                // D'abord essayer de démarrer un serveur tunnel pour publication
                console.log('🚀 Démarrage du serveur Expo avec tunnel...');
                const tunnelProcess = spawn('npx', ['expo', 'start', '--tunnel', '--non-interactive'], {
                    stdio: ['ignore', 'pipe', 'pipe'],
                    cwd: process.cwd()
                });

                let tunnelReady = false;
                
                tunnelProcess.stdout.on('data', (data) => {
                    const output = data.toString();
                    if (output.includes('Tunnel ready') || output.includes('Metro Bundler')) {
                        tunnelReady = true;
                        console.log('✅ Serveur tunnel prêt - Application accessible sur Expo Go');
                        
                        // Arrêter le processus après quelques secondes pour continuer
                        setTimeout(() => {
                            tunnelProcess.kill();
                            resolve(true);
                        }, 3000);
                    }
                });

                // Timeout après 30 secondes
                setTimeout(() => {
                    if (!tunnelReady) {
                        tunnelProcess.kill();
                        console.log('⚠️  Publication tunnel timeout - Commande manuelle:');
                        console.log(`   npx expo start --tunnel`);
                        resolve(false);
                    }
                }, 30000);
                
            } catch (error) {
                console.log('⚠️  Publication Expo échouée - Commande manuelle:');
                console.log(`   eas update --branch production --message "${versionInfo.name}"`);
                resolve(false);
            }
        });
    }

    // Déploiement principal
    async deploy() {
        console.log('\n🚀 === DÉPLOIEMENT AUTOMATIQUE STOCK OS ===');
        console.log(`⏰ ${new Date().toLocaleString('fr-FR')}\n`);

        try {
            // 1. Mise à jour version
            const versionInfo = this.updateVersion();

            // 2. Copie locale
            this.copyToVersionFolder(versionInfo);

            // 3. GitHub
            this.deployToGitHub(versionInfo);

            // 4. Expo
            await this.deployToExpo(versionInfo);

            // Résumé final
            console.log('\n🎉 === DÉPLOIEMENT TERMINÉ ===');
            console.log(`✅ Version: ${versionInfo.name}`);
            console.log(`✅ Update #${versionInfo.updateCount}`);
            console.log(`✅ Copie locale: ${path.join(this.config.versionFolder, versionInfo.name)}`);
            console.log(`✅ Branche GitHub: ${this.config.githubBranch}`);
            console.log(`✅ Projet Expo: ${this.config.expoProjectId}\n`);

        } catch (error) {
            console.error('\n💥 Échec du déploiement:', error.message);
            process.exit(1);
        }
    }
}

// Exécution
if (require.main === module) {
    const deployer = new StockOSDeployer();
    deployer.deploy().catch(console.error);
}

module.exports = StockOSDeployer;