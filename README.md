# 🚀 Stock OS - Système de Déploiement Automatique

> **Coach sport + nutrition personnalisé** avec déploiement automatisé tri-plateforme

## ⚡ Déploiement Rapide

```bash
npm run deploy
```
**ou** `Ctrl+Shift+U` dans VS Code

## 🎯 Actions Automatiques

### 📊 Versioning Intelligent
- **Format**: `Stock OS V.X.Y.Z`
- **Logique**: Z+1 → Y+1 (si Z=10) → X+1 (200ème update)

### 🔄 Triple Déploiement
1. **📁 Copie Locale** → `C:\Users\kaisb\Version\`
2. **🐙 GitHub Push** → Branche `5db36922-11e9-414a-95f8-65be557f9008`  
3. **🚀 Expo Publish** → Projet `56d8c979-c175-45a5-b546-c2d76d3cdf9e`

## 🛠️ Installation & Configuration

### 1. Configuration Automatique
```bash
npm run setup
```

### 2. Connexion Expo (Manuelle)
```bash
eas login
# Email: os.stock.ai@gmail.com
# Password: Desjonqueres7-/!!!Castigat
```

### 3. Configuration GitHub
```bash
git remote add origin <URL_DE_VOTRE_REPO>
```

## 🎮 Commandes Disponibles

| Commande | Raccourci VS Code | Description |
|----------|-------------------|-------------|
| `npm run deploy` | `Ctrl+Shift+U` | 🚀 Déploiement complet |
| `npm run update` | `Ctrl+Shift+V` | 📊 Mise à jour version |
| `npm run setup` | `Ctrl+Shift+S` | ⚙️ Configuration initiale |

## 📈 Exemples de Versioning

| Update # | Version | Nom Complet |
|----------|---------|-------------|
| 1 | 1.0.1 | Stock OS V.1.0.1 |
| 10 | 1.1.0 | Stock OS V.1.1.0 |
| 25 | 1.2.5 | Stock OS V.1.2.5 |
| 200 | 2.0.0 | Stock OS V.2.0.0 |

## 🏗️ Structure du Projet

```
StockOS_BETA/
├── 📦 scripts/
│   ├── auto-update.js      # Logique versioning
│   ├── auto-deploy.js      # Déploiement automatique  
│   └── setup.js           # Configuration initiale
├── 🎯 .vscode/
│   ├── tasks.json         # Tâches VS Code
│   ├── keybindings.json   # Raccourcis clavier
│   └── settings.json      # Configuration projet
├── 📋 package.json        # Config NPM + métadonnées
├── 🚀 app.json           # Configuration Expo
└── ⚙️ eas.json           # Configuration EAS
```

## ✅ Workflow Optimal

1. **Développez** vos fonctionnalités
2. **Testez** localement 
3. **Déployez**: `npm run deploy` ou `Ctrl+Shift+U`
4. **Vérifiez** les 3 plateformes

## 🔧 Configuration Avancée

### Identifiants
- **Email**: `os.stock.ai@gmail.com`
- **GitHub Branch**: `5db36922-11e9-414a-95f8-65be557f9008`
- **Expo Project**: `56d8c979-c175-45a5-b546-c2d76d3cdf9e`

### Dossiers Exclus
- `node_modules`, `.git`, `.expo`, `Version/`
- Configuration automatique dans `.gitignore`

## 🎉 Fonctionnalités

✅ **Versioning automatique** selon règles Stock OS  
✅ **Copie locale** avec exclusions intelligentes  
✅ **Git commits** avec messages générés  
✅ **Publication Expo** avec channels  
✅ **Raccourcis VS Code** pour productivité maximale  
✅ **Configuration one-shot** pour démarrage rapide

---

**🚀 Prêt à déployer ? Lancez `npm run deploy` !**