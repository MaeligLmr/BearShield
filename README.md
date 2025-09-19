# BearShield

## À propos

**BearShield** est un site e-commerce moderne dédié à la vente de coques et accessoires 

### Concept
- **Protection durable** : Coques et accessoires de qualité
- **Personnalisation** : Créez votre coque unique
- **Design moderne** : Interface utilisateur intuitive et responsive
- Des coques abordables et au design sobre, compatibles avec des accessoires vendus séparément pour plus de personnalisation.
- Un large choix de modèles adaptés à chaque type de téléphone, avec une mise en avant des gammes d’entrée de prix.

### Cible
Notre cible sont les jeunes / les étudiants de 15 à 26 ans
 
## Fonctionnalités Principales

### **Page d'Accueil**
- **Hero section** avec message principal et call-to-action
- **Section personnalisation** présentant le service de création
- **Grille de produits** avec aperçu des coques et accessoires
- **Section recyclage** sensibilisant à l'environnement
- **Design responsive** adapté mobile et desktop

### **Catalogue Produits**
- **Deux sections distinctes** :
  -  **Nos Coques** (`cases.html`) - Collection complète de coques
  -  **Nos Accessoires** (`accessories.html`) - Grips et autres accessoires
- **Système de recherche avancé** :
  - Recherche par nom et description
  -  Support de la touche Entrée
  -  Bouton de recherche dédié
- **Grilles responsive** : 1 colonne mobile, 4 colonnes desktop
- **Cartes produits** avec image, nom, prix et actions
- **Navigation fluide** vers les pages détail

### **Personnalisation de Coque** 
- **Interface de création avancée** :
  -  **Toggles personnalisés** avec texte intégré
  -  **Sélecteur de couleur** avec cercles colorés visuels
  -  **Sélection de téléphone** avec dropdown stylisé Font Awesome
  -  **Personnalisation du rendu visuel** : Matière, Finition, Style des boutons, Style des coins
  -  **Multi-sélection d'accessoires**
- **Interface responsive** : Layout mobile/desktop adaptatif
- **Barre de prix** fixe en bas de page avec total et séléction d'accessoires dynamique

### **Panier d'Achat**
- **Interface moderne** avec grille responsive
- **Gestion des articles** :
  -  Suppression d'articles
  -  Calcul automatique des totaux
- **Panneau résumé** détails de commande
- **Bouton validation**

### **Système de Composants**
- **Header réutilisable** :
  -  Menu hamburger responsive
  -  Navigation cohérente
- **Footer uniforme** :
  -  Liens utiles organisés
  -  Réseaux sociaux avec icônes
- **Chargement automatique** via JavaScript
- **Paths relatifs** gérés automatiquement

## Design System

### **Palette de Couleurs**
```css
--primary-color: #ff6b35      /* Orange principal */
--secondary-color: #274060     /* Bleu foncé */
--primary-color-d1: #f7c59f    /* Orange clair */
--primary-color-d2: #f7f7e5    /* Crème */
--secondary-color-d1: #205780  /* Bleu moyen */
```

### **Typographie**
- **Titres** : Lexend Deca (800 weight)
- **Corps** : Montserrat (400-600 weight)
- **Hiérarchie** claire avec tailles adaptives


##  Architecture Technique

### **Structure des Fichiers**
```
BearShield/
├── pages/                    # Pages HTML
│   ├── index.html            # Page d'accueil
│   ├── cases.html            # Catalogue coques (à intégrer)
│   ├── accessories.html      # Catalogue accessoires
│   ├── personnalisation.html # Personnalisation
│   ├── cart.html             # Panier
│   └── product.html          # Détail produit
├── assets/
│   ├── css/                     # Styles
│   │   ├── style.css            # Styles globaux + utility classes
│   │   ├── components.css       # Styles des composants
│   │   ├── personnalization.css # Styles personnalisation
│   │   ├── cart.css             # Styles panier
│   │   ├── lists.css            # Grilles de produits
│   │   └── index.css            # Styles accueil
│   ├── js/
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
│   └── img/                # Images et assets
│   │   └── accessory/
│   │   └── product/
├── components/             # Composants réutilisables
│   ├── header.html         # Header commun
│   └── footer.html         # Footer commun
├── data/
    └── products.json       # Base de données produits
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
- **Recherche**
- **Composants modulaires** avec auto-chargement
- **Gestion d'événements** optimisée
- **Navigation SPA-like** entre pages produits
- **Calcul automatique du panier gardé en local storage**

## Fonctionnalités Responsive

### **Mobile (< 978px)**
- **Menu hamburger** avec animation
- **Grilles** : 1 colonne
- **Toggles** : Pleine largeur
- **Navigation** : Menu déroulant
- **Bouton panier** : Flottant fixe

### **Desktop (> 978px)**
- **Navigation** horizontale
- **Grilles** : 4 colonnes
- **Layout** : Sidebar + contenu
- **Panier** : Intégré à la navigation


## Améliorations possibles

- Sauvegarde de la personnalisation en cours
- Configurations saisonnières : afficher sur la page d’accueil des designs thématiques (ex. Noël, été, Halloween).
- Programme de reprise : possibilité de rendre son ancienne coque pour obtenir une réduction sur un nouvel achat.



---
## Livrables
### Wireframes:
![WireFrames](https://github.com/user-attachments/assets/4c67660b-8517-4864-a69a-a5a5eaf91010)

Lien vers le site: [https://maeliglmr.github.io/BearShield/pages/index.html](https://maeliglmr.github.io/BearShield/pages/index.html)

---


## Développeuses:
- [Maëlig LAMARRE](https://github.com/MaeligLmr)
- [Morgane DASSONVILLE](https://github.com/Jun080)
