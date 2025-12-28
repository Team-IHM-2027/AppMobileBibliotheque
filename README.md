# 📱 Application Mobile Bibliothèque

Une application React Native complète pour la gestion d'une bibliothèque numérique avec système d'authentification, gestion des prêts, e-learning et fonctionnalités sociales.

## 🚀 Fonctionnalités Principales

### 🔐 Authentification & Gestion Utilisateurs
- **Connexion/Inscription** avec Firebase Authentication
- **Vérification email** obligatoire
- **Réinitialisation mot de passe**
- **Gestion profil utilisateur** avec photo
- **Niveaux d'accès** (étudiant, admin, super admin)

### 📚 Gestion Bibliothèque
- **Catalogue de livres** avec recherche avancée
- **Système de prêts** avec limites configurables
- **Gestion des réservations**
- **Historique des emprunts**
- **Notifications** de rappel et retard
- **Thèses numériques** avec PDF

### 🛒 E-Commerce Intégré
- **Boutique en ligne** pour achats de livres
- **Panier d'achat** avec gestion des quantités
- **Système de paiement** intégré
- **Historique des commandes**

### 🎓 E-Learning
- **Cours en ligne** par département
- **Navigation par semestre**
- **Quiz interactifs**
- **Ressources pédagogiques**
- **Suivi de progression**

### 💬 Communication
- **Messagerie interne**
- **Chat en temps réel**
- **Notifications push**
- **Contact administration**

### ⚙️ Administration
- **Panel d'administration**
- **Gestion des utilisateurs**
- **Configuration des paramètres**
- **Statistiques d'utilisation**
- **Mode maintenance**

## 🏗️ Architecture Technique

### Technologies Utilisées
```
Frontend:
├── React Native (Expo)
├── React Navigation 6
├── Firebase v9 (Auth, Firestore, Storage)
├── AsyncStorage
├── Vector Icons
└── Image Picker

State Management:
├── React Context API
├── Custom Hooks
└── Local Storage

UI/UX:
├── Linear Gradient
├── Keyboard Aware ScrollView
├── Custom Components
└── Responsive Design
```

### Structure du Projet
```
📦 Application
├── 📁 components/
│   ├── 📁 login/
│   │   ├── LogInForm.js          # Formulaire de connexion
│   │   └── SignUpForm.js         # Formulaire d'inscription
│   ├── 📁 vues/
│   │   ├── MainContainer.js      # Navigation principale
│   │   ├── VueUn.js             # Page d'accueil
│   │   ├── Parametre.js         # Paramètres utilisateur
│   │   └── Messages.js          # Messagerie
│   ├── 📁 composants/
│   │   ├── SearchModal.js       # Recherche globale
│   │   ├── PubCar.js           # Carrousel publicitaire
│   │   └── Recommend.js        # Recommandations
│   ├── 📁 achats/
│   │   ├── Produit.js          # Catalogue produits
│   │   ├── Panier.js           # Panier d'achat
│   │   └── FichePaie.js        # Factures
│   ├── 📁 elearning/
│   │   └── ElearningPage.js    # Plateforme e-learning
│   ├── 📁 openclassroom/
│   │   ├── Accueil.js          # Accueil cours
│   │   ├── Departement.js      # Sélection département
│   │   └── Cours.js            # Contenu cours
│   ├── 📁 context/
│   │   └── UserContext.js      # Context utilisateur global
│   ├── 📁 navigation/
│   │   ├── NavShop.js          # Navigation boutique
│   │   └── NavParams.js        # Navigation paramètres
│   └── 📁 utils/
│       ├── cart.js             # Gestion panier
│       └── chat.js             # Utilitaires chat
├── 📁 hooks/
│   ├── useNotificationCount.js  # Hook notifications
│   └── useCartCount.js         # Hook panier
├── 📁 assets/
│   └── 📁 images/              # Ressources images
├── config.js                   # Configuration Firebase
├── App.js                      # Point d'entrée
└── package.json               # Dépendances
```

## 🔥 Configuration Firebase

### Collections Firestore
```
📊 Base de données Firestore:
├── 👥 BiblioUser           # Utilisateurs
├── 📚 BiblioBooks          # Catalogue livres
├── 🎓 BiblioThesis         # Thèses
├── 🛒 BiblioWeb            # Produits e-commerce
├── 🎯 OnlineCourses        # Cours en ligne
├── 🏢 Departements         # Départements
├── 📧 AdminMessages        # Messages admin
├── 💬 ClientsMessages      # Messages clients
├── 🖼️ Images               # Stockage images
└── 👨‍💼 SuperAdmin          # Configuration admin
```

### Structure BiblioUser
```javascript
{
  email: "etudiant@universite.com"
  name: "Nom Utilisateur"
  departement: "Informatique"
  niveau: "Level 3"
  matricule: "21A001"
  profilPicture: "url_image"
  statut: "actif"
  tabEtat1: [] // Emprunts en cours
  tabEtat2: [] // Emprunts prolongés
  tabEtat3: [] // Historique
  createdAt: "timestamp"
  lastLoginAt: "timestamp"
}
```

### Structure BiblioBooks
```javascript
{
  id: "unique_id"
  name: "Titre du livre"
  auteur: "Nom Auteur"
  cathegorie: "Informatique"
  desc: "Description du livre"
  edition: "2023"
  exemplaire: 5
  initialExemplaire: 5
  etagere: "A1-B2"
  salle: "Salle 1"
  image: "url_image"
  type: "livre"
}
```

## 🚀 Installation & Démarrage

### Prérequis
```bash
# Versions requises
Node.js >= 16.0.0
npm >= 8.0.0
Expo CLI >= 6.0.0
```

### Installation
```bash
# Cloner le projet
git clone [repository-url]
cd application-bibliotheque

# Installer les dépendances
npm install

# Configuration Firebase
# 1. Créer un projet Firebase
# 2. Activer Authentication, Firestore, Storage
# 3. Copier la configuration dans config.js
```

### Configuration Firebase
```javascript
// config.js
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};
```

### Lancement
```bash
# Démarrage en développement
npm start
# ou
expo start

# Build pour Android
expo build:android

# Build pour iOS
expo build:ios
```

## 📱 Fonctionnalités par Écran

### 🏠 Accueil (VueUn.js)
- **Dashboard utilisateur** avec statistiques
- **Livres populaires** et nouveautés
- **Accès rapide** aux fonctionnalités
- **Notifications** en temps réel

### 🔍 Recherche (SearchModal.js)
- **Recherche globale** dans le catalogue
- **Filtres avancés** (catégorie, auteur, disponibilité)
- **Suggestions** en temps réel
- **Historique** des recherches

### 📚 Catalogue (Produit.js)
- **Liste des livres** avec pagination
- **Détails complets** de chaque livre
- **Système de prêt** en un clic
- **Vérification disponibilité**

### 🛒 Panier (Panier.js)
- **Gestion quantités**
- **Calcul prix total**
- **Validation commande**
- **Historique achats**

### 💬 Messages (Messages.js)
- **Chat temps réel** avec Firebase
- **Messages groupés** par conversation
- **Notifications** de nouveaux messages
- **Interface intuitive**

### ⚙️ Paramètres (Parametre.js)
- **Profil utilisateur** modifiable
- **Préférences** application
- **Gestion compte**
- **Déconnexion sécurisée**

## 🎨 Thème & Design

### Palette de Couleurs
```css
Couleurs principales:
├── Primary: #F16522 (Orange)
├── Secondary: #FF8A50 (Orange clair)
├── Background: #F9FAFB (Gris clair)
├── Text: #333333 (Gris foncé)
└── Light: #FFFFFF (Blanc)
```

### Composants UI
- **Gradient Backgrounds** pour l'immersion
- **Cards Shadow** pour la profondeur
- **Icons vectorielles** pour la cohérence
- **Animations fluides** pour l'expérience

## 🔧 Hooks Personnalisés

### useCartCount
```javascript
// Gestion du compteur panier
const cartCount = useCartCount(userEmail);
```

### useNotificationCount
```javascript
// Compteur notifications non lues
const unreadCount = useNotificationCount(userEmail);
```

### useUnreadChatCount
```javascript
// Messages non lus
const unreadMessages = useUnreadChatCount(userEmail);
```

## 📊 Gestion d'État

### UserContext
```javascript
// Context global utilisateur
const {
  currentUserNewNav,
  emailHigh,
  setEmailHigh
} = useContext(UserContext);
```

### AsyncStorage
```javascript
// Stockage local persistant
- Préférences utilisateur
- Cache données hors ligne
- Historique recherches
- Mode sombre
```

## 🔐 Sécurité

### Authentication
- **Email verification** obligatoire
- **Password reset** sécurisé
- **Session management** avec Firebase
- **Auto-logout** sur erreur

### Firestore Rules
```javascript
// Règles de sécurité de base
rules_version = '2';
service cloud.firestore{
  match /databases/{database}/documents {
    match /BiblioUser/{email} {
      allow read, write: if request.auth != null 
        && request.auth.token.email == email;
    }
    match /BiblioBooks/{bookId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null 
        && get(/databases/$(database)/documents/BiblioUser/$(request.auth.token.email)).data.statut == 'admin';
    }
  }
}
```

## 📈 Performance

### Optimisations
- **Lazy loading** des images
- **Pagination** des listes
- **Cache local** avec AsyncStorage
- **Debounce** sur la recherche
- **Optimistic updates** pour UX

### Monitoring
- **Error boundaries** React
- **Console logging** en développement
- **Performance tracking** Firebase
- **Crash reporting** intégré

## 🚀 Déploiement

### Build Production
```bash
# Android APK
expo build:android --type apk

# Android AAB (Play Store)
expo build:android --type app-bundle

# iOS IPA (App Store)
expo build:ios --type archive
```

### Variables d'Environnement
```javascript
// Configuration par environnement
const isDev = __DEV__;
const apiUrl = isDev ? 'dev-api' : 'prod-api';
```

## 🤝 Contribution

### Standards de Code
- **ESLint** pour la qualité
- **Prettier** pour le formatage
- **Conventional Commits** pour les messages
- **Component naming** en PascalCase

### Workflow Git
```bash
# Nouvelle fonctionnalité
git checkout -b feature/nouvelle-fonctionnalite
git commit -m "feat: ajouter nouvelle fonctionnalité"
git push origin feature/nouvelle-fonctionnalite
```

## 📞 Support

### Contact
- **Email**: bornbeforeDesign@gmail.com
- **Documentation**: [lien-vers-docs]
- **Issues**: https://github.com/Design-IHM/AppMobileBibliotheque.git

### FAQ
**Q: Comment réinitialiser mon mot de passe ?**
A: Utilisez le lien "Mot de passe oublié" sur l'écran de connexion.

**Q: Puis-je emprunter plusieurs livres ?**
A: Oui, jusqu'à 3 livres simultanément selon la configuration.

**Q: Comment prolonger un prêt ?**
A: Dans vos paramètres, section "Mes emprunts".

---

## 📄 Licence

Ce projet est sous licence [MIT](LICENSE) - voir le fichier LICENSE pour plus de détails.

---

**Version**: 1.0.0  
**Dernière mise à jour**: Janvier 2025  
**Auteur**: Équipe Développement Bibliothèque

---

*Cette application a été développée avec ❤️ pour faciliter l'accès à la connaissance.*
