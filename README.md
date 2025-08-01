# 🟢 Y — Réseau social alternatif

Y est une application web de réseau social moderne conçue comme une alternative à X/Twitter. Elle offre une interface minimaliste, sombre et épurée, avec des fonctionnalités sociales essentielles pour communiquer, publier et gérer son profil.

## 🚀 Technologies utilisées

- ⚛️ **React** (avec Vite)
- 💬 **React Router** (navigation via `location.search`)
- 🎨 Design : fond sombre, texte blanc/vert, composants arrondis

## 📁 Structure des pages

L’application utilise `location.search` pour router les pages à afficher, sans passer par une logique de route conventionnelle. Voici les routes disponibles :

| Route           | Composant React       | Description                         |
|----------------|-----------------------|-------------------------------------|
| `?home`         | `LandingPages`        | Page d'accueil/landing page         |
| `?login`        | `LoginPage`           | Page de connexion                   |
| `?register`     | `RegisterPage`        | Page de création de compte          |
| `?main`         | `MainPage`            | Fil principal avec zone de post     |
| `?messenger`    | `MessengerPage`       | Interface de messagerie             |
| `?profil`       | `ProfilePage`         | Page de profil utilisateur          |

## 🧠 Fonctionnalités implémentées

- ✅ **Connexion / Inscription**
- ✅ **Fil d'actualité** avec zone de publication, like, commentaires
- ✅ **Messagerie** avec groupes, contacts et interface de discussion
- ✅ **Profil utilisateur** éditable (pseudo et email)
- ✅ **Barre de navigation latérale** commune sur toutes les pages
- ✅ **Affichage conditionnel des composants** selon l'URL

## 🖼️ Design

L’interface est basée sur une **identité visuelle sombre**, avec :

- Composants **arrondis**
- Couleurs principales : **#1CD500 (vert néon)** et **blanc**
- Typographie sans-serif moderne

## 📦 Installation & lancement

```bash
# Cloner le dépôt
git clone git@github.com:EnzoMartolini/front-Y.git
cd front-Y

# Installer les dépendances
npm install

# Lancer l'application en développement
npm run dev
