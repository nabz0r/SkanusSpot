# Vilnius Halal & Kosher Finder 🍽️

Application permettant de trouver, réserver et commander dans les restaurants halal et casher de Vilnius.

## 🚀 Fonctionnalités

### Authentification
- Inscription/Connexion classique
- OAuth (Google)
- Gestion des rôles (user, admin, restaurant_owner)
- Sessions JWT + Refresh tokens

### Recherche Avancée
- Recherche full-text
- Filtres multicritères
- Géolocalisation
- Suggestions en temps réel
- Système de notation

## 📚 API Endpoints

### Auth
```bash
# Authentification classique
POST /api/auth/register       # Inscription
POST /api/auth/login          # Connexion
POST /api/auth/logout         # Déconnexion

# OAuth
GET  /api/auth/google         # Login Google
GET  /api/auth/google/callback# Callback Google
GET  /api/auth/providers      # Liste providers OAuth

# Profil
GET  /api/auth/profile        # Obtenir profil
PUT  /api/auth/profile        # Modifier profil
```

### Recherche
```bash
# Recherche principale
GET /api/search/restaurants
  ?q=          # Recherche textuelle
  &type=       # halal ou kosher
  &cuisine=    # Types de cuisine (comma-separated)
  &priceRange= # Gamme de prix (€,€€,€€€)
  &rating=     # Note minimale (1-5)
  &features=   # Spécificités (comma-separated)
  &lat=        # Latitude
  &lng=        # Longitude
  &radius=     # Rayon de recherche (mètres)
  &sortBy=     # Champ de tri
  &sortOrder=  # asc ou desc
  &page=       # Pagination
  &limit=      # Résultats par page

# Suggestions et filtres
GET  /api/search/suggestions # Autocomplétion
GET  /api/search/filters     # Filtres disponibles
```

## 🛠️ Installation

### Prérequis
- Node.js >= 18
- MongoDB >= 6
- Docker et Docker Compose (optionnel)

### Variables d'environnement
Créez un fichier `.env` à la racine du backend :
```bash
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/vilnius-halal-finder

# Auth
JWT_SECRET=your_jwt_secret
REFRESH_TOKEN_SECRET=your_refresh_secret

# OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Frontend
FRONTEND_URL=http://localhost:3000
```

### Installation locale
```bash
# Backend
cd backend
npm install
npm run dev

# Frontend (à venir)
cd frontend
npm install
npm start
```

### Docker
```bash
docker-compose up --build
```

## 📚 Stack Technique

### Backend
- Node.js + Express
- TypeScript
- MongoDB + Mongoose
- Passport.js (JWT, Google OAuth)

### Base de données
- MongoDB avec index géospatiaux
- Full-text search
- Index composés optimisés

### Frontend (à venir)
- React
- TypeScript
- Redux Toolkit
- TailwindCSS

## 🔒 Sécurité
- Mots de passe hashés (bcrypt)
- JWT + Refresh tokens
- OAuth2
- Protection CORS
- Validation des données

## 🔄 CI/CD
- GitHub Actions (à venir)
- Docker
- Tests automatisés (à venir)

## 📖 Documentation API
Documentation Swagger à venir

## 🤝 Contribution
1. Forkez le projet
2. Créez une branche (`git checkout -b feature/amazing-feature`)
3. Committez vos changements (`git commit -m 'Add amazing feature'`)
4. Pushez la branche (`git push origin feature/amazing-feature`)
5. Ouvrez une Pull Request

## 📝 Todo
- [x] Auth JWT + OAuth
- [x] Recherche avancée
- [ ] Frontend React
- [ ] Réservation en ligne
- [ ] Dashboard admin

## 📁 Dépendances Utilisées

### Backend
```json
{
  "dependencies": {
    "bcryptjs": "^2.4.3",       // Hashage des mots de passe
    "cors": "^2.8.5",          // CORS middleware
    "dotenv": "^16.0.3",       // Variables d'environnement
    "express": "^4.18.2",      // Framework web
    "helmet": "^6.0.1",        // Sécurité Headers HTTP
    "jsonwebtoken": "^9.0.0",  // Gestion JWT
    "mongoose": "^7.0.3",      // ODM MongoDB
    "morgan": "^1.10.0",       // HTTP request logger
    "passport": "^0.6.0",      // Authentication middleware
    "passport-google-oauth20": "^2.0.0", // Google OAuth
    "passport-jwt": "^4.0.1",  // JWT strategy
    "winston": "^3.8.2",       // Logging
    "zod": "^3.21.4"           // Validation des données
  }
}
```

## 📰 Copyright & Licence

### Copyright
© 2025 Vilnius Halal & Kosher Finder

Développé par [Nabz0r] - Tous droits réservés

Ce projet est sous licence MIT - voir le fichier [LICENSE.md](LICENSE.md) pour plus de détails

### Marques Déposées
- Google™ et le logo Google sont des marques déposées de Google LLC
- MongoDB® est une marque déposée de MongoDB, Inc.