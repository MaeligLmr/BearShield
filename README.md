# BearShield

## 📱 À propos

**BearShield** est un site e-commerce moderne dédié à la vente de coques et accessoires 

### Concept
- **Protection durable** : Coques et accessoires de qualité
- **Éco-responsable** : Matériaux respectueux de l'environnement
- **Personnalisation** : Créez votre coque unique
- **Design moderne** : Interface utilisateur intuitive et responsive

## Fonctionnalités Principales

### **Page d'Accueil**
- **Hero section** avec message principal et call-to-action
- **Section personnalisation** présentant le service de création
- **Grille de produits** avec aperçu des coques et accessoires
- **Section recyclage** sensibilisant à l'environnement
- **Design responsive** adapté mobile et desktop

### **Catalogue Produits**
- **Deux sections distinctes** :
  - 📱 **Nos Coques** (`cases.html`) - Collection complète de coques
  - 🔗 **Nos Accessoires** (`accessories.html`) - Grips et autres accessoires
- **Système de recherche avancé** :
  - Recherche par nom et description
  -  Support de la touche Entrée
  -  Bouton de recherche dédié
- **Grilles responsive** : 1 colonne mobile, 4 colonnes desktop
- **Cartes produits** avec image, nom, prix et actions
- **Navigation fluide** vers les pages détail

### **Personnalisation de Coque** 
- **Interface de création avancée** :
  -  **Toggles personnalisés** avec texte intégré (4rem × 100%) ← à faire fonctionner js
  -  **Sélecteur de couleur** avec cercles colorés visuels ← à faire fonctionner js
  -  **Sélection de téléphone** avec dropdown stylisé Font Awesome
  -  **Multi-sélection d'accessoires**
- **Interface responsive** : Layout mobile/desktop adaptatif
- **Barre de prix** fixe en bas de page avec total dynamique
- **Transitions fluides** et effets hover sur tous les éléments

### 🛒 **Panier d'Achat**
- **Interface moderne** avec grille responsive (2fr 1fr desktop)
- **Gestion des articles** :
  -  Suppression d'articles ← à faire fonctionner js + cookie
  -  Calcul automatique des totaux ← à faire fonctionner js
- **Panneau résumé** détails de commande
- **Bouton validation**

### 🧩 **Système de Composants**
- **Header réutilisable** :
  -  Menu hamburger responsive
  -  Navigation cohérente
- **Footer uniforme** :
  -  Liens utiles organisés
  -  Réseaux sociaux avec icônes
- **Chargement automatique** via JavaScript
- **Paths relatifs** gérés automatiquement

## 🎨 Design System

### 🎨 **Palette de Couleurs**
```css
--primary-color: #ff6b35      /* Orange principal */
--secondary-color: #274060     /* Bleu foncé */
--primary-color-d1: #f7c59f    /* Orange clair */
--primary-color-d2: #f7f7e5    /* Crème */
--secondary-color-d1: #205780  /* Bleu moyen */
```

### 📝 **Typographie**
- **Titres** : Lexend Deca (800 weight)
- **Corps** : Montserrat (400-600 weight)
- **Hiérarchie** claire avec tailles adaptives

### 📐 **Layout & Responsive**
- **Mobile First** : Approche responsive prioritaire
- **Breakpoints** : 768px et 978px

## 🛠️ Architecture Technique

### 📁 **Structure des Fichiers**
```
BearShield/
├── pages/                    # Pages HTML
│   ├── index.html           # Page d'accueil
│   ├── cases.html           # Catalogue coques (à intégrer)
│   ├── accessories.html     # Catalogue accessoires
│   ├── personnalisation.html # Personnalisation
│   ├── cart.html            # Panier
│   └── product.html         # Détail produit
├── assets/
│   ├── css/                 # Styles
│   │   ├── style.css        # Styles globaux + utility classes
│   │   ├── components.css   # Styles des composants
│   │   ├── personnalization.css # Styles personnalisation
│   │   ├── cart.css         # Styles panier
│   │   ├── lists.css        # Grilles de produits
│   │   └── index.css        # Styles accueil
│   ├── js/
│   │   ├── components.js    # Loader de composants
│   │   └── components/
│   │       ├── routerAccessoires.js # Logique accessoires
│   │       └── routerProduct.js     # Logique produits
│   │       └── components.js        # Loader de composants
│   │       └── cart-badge.js        # Logique du badge panier
│   │       └── cart-manager.js      # Logique de l'ajout au panier
│   │   └── pages/
│   │       ├── cart.js              # Logique panier
│   │       └── personnalization.js  # Logique personnalisation
│   │       └── product.js           # Logique page produit
│   └── img/                 # Images et assets
├── components/              # Composants réutilisables
│   ├── header.html         # Header commun
│   └── footer.html         # Footer commun
├── data/
│   └── products.json       # Base de données produits
└── GUIDE_COMPOSANTS.md     # Guide d'intégration
```

### **Technologies Utilisées**
- **HTML5** : Structure sémantique
- **CSS3** : Styling moderne avec variables CSS, Grid, Flexbox
- **JavaScript ES6+** : Logique dynamique et interactions
- **Font Awesome 6.4** : Iconographie
- **Google Fonts** : Typographie (Lexend Deca, Montserrat)
- **JSON** : Base de données produits

### **Fonctionnalités JavaScript**
- **Chargement dynamique** des produits depuis JSON
- **Recherche en temps réel** avec filtrage intelligent
- **Composants modulaires** avec auto-chargement
- **Gestion d'événements** optimisée
- **Navigation SPA-like** entre pages produits

## Fonctionnalités Responsive

### **Mobile (< 768px)**
- **Menu hamburger** avec animation
- **Grilles** : 1 colonne
- **Toggles** : Pleine largeur
- **Navigation** : Menu déroulant
- **Bouton panier** : Flottant fixe

### **Desktop (> 768px)**
- **Navigation** horizontale
- **Grilles** : 4 colonnes
- **Layout** : Sidebar + contenu
- **Panier** : Intégré à la navigation


## Améliorations

### **À Intégrer**
- [ ] Page détail produit complète
- [ ] Fonctionnalités panier JavaScript
- [ ] Choix ds couleurs et accessoires dans la personnalisation




---
