# Allô Dakar - Application Mobile de Transport Interurbain

Application mobile complète de transport interurbain pour le Sénégal, construite avec Next.js, React, Supabase et TypeScript.

## Fonctionnalités

### Pour les Passagers
- Recherche et réservation de trajets interurbains
- Envoi et suivi de colis
- Paiement via Wave, Orange Money, espèces ou carte
- Historique des trajets et colis
- Système de notation des conducteurs
- Notifications en temps réel

### Pour les Conducteurs
- Création et gestion de trajets
- Tableau de bord avec statistiques
- Gestion des réservations
- Acceptation de demandes de colis
- Suivi des revenus

### Fonctionnalités Techniques
- PWA (Progressive Web App) installable sur iOS et Android
- Authentification sécurisée par OTP via Supabase Auth
- Base de données PostgreSQL avec Row Level Security
- Upload de fichiers (photos, documents) via Supabase Storage
- Intégration paiements Wave et Orange Money
- Dark mode et light mode
- Interface mobile-first optimisée

## Stack Technique

- **Frontend**: Next.js 16, React 19, TypeScript
- **UI**: Tailwind CSS v4, shadcn/ui
- **Backend**: Next.js API Routes
- **Base de données**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth avec OTP
- **Storage**: Supabase Storage
- **Paiements**: Wave Money, Orange Money
- **Déploiement**: Vercel

## Installation

1. Clonez le repository
2. Installez les dépendances:
```bash
npm install
```

3. Configurez les variables d'environnement (déjà configurées dans Vercel)

4. Exécutez les scripts SQL dans Supabase:
```bash
# Dans l'ordre:
scripts/01-create-tables.sql
scripts/02-create-rls-policies.sql
scripts/03-create-functions.sql
scripts/05-create-storage-buckets.sql
```

5. Lancez le serveur de développement:
```bash
npm run dev
```

## Configuration Requise

### Variables d'Environnement

Toutes les variables sont déjà configurées dans votre projet Vercel:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `WAVE_API_KEY` (optionnel, pour paiements en production)
- `ORANGE_MONEY_API_KEY` (optionnel, pour paiements en production)

### Base de Données

Le schéma complet de la base de données est dans le dossier `scripts/`. Exécutez les fichiers dans l'ordre numérique dans l'éditeur SQL de Supabase.

## Structure du Projet

```
app/                    # Pages Next.js
  api/                 # API Routes
  login/               # Authentification
  search/              # Recherche de trajets
  trip/                # Détails et réservation
  parcels/             # Gestion des colis
  driver/              # Espace conducteur
  profile/             # Profil utilisateur
components/            # Composants React
  screens/             # Écrans de l'application
  ui/                  # Composants UI shadcn
  providers/           # Context providers
lib/                   # Utilitaires et hooks
  hooks/               # Custom React hooks
  supabase/            # Configuration Supabase
  payment/             # Intégrations paiements
  storage/             # Upload de fichiers
  types/               # Types TypeScript
scripts/               # Scripts SQL
```

## Utilisation

### Installation Mobile

L'application est une PWA et peut être installée sur n'importe quel appareil:

**iOS:**
1. Ouvrez l'app dans Safari
2. Tapez sur l'icône de partage
3. Sélectionnez "Ajouter à l'écran d'accueil"

**Android:**
1. Ouvrez l'app dans Chrome
2. Tapez sur le menu
3. Sélectionnez "Installer l'application"

### Développement

```bash
# Développement
npm run dev

# Build production
npm run build

# Démarrer en production
npm start

# Linting
npm run lint
```

## Prochaines Étapes

1. Configurer les clés API de paiement en production
2. Activer les notifications push
3. Ajouter le chat en temps réel
4. Implémenter la géolocalisation en direct
5. Ajouter plus de villes sénégalaises

## Support

Pour toute question ou problème, contactez l'équipe de développement.
