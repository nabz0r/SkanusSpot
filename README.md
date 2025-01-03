# Vilnius Halal & Kosher Finder 🍽️

Application permettant de trouver, réserver et commander dans les restaurants halal et casher de Vilnius.

## 🚀 Fonctionnalités

### Authentification
- Inscription/Connexion classique
- OAuth (Google)
- Gestion des rôles (user, admin, restaurant_owner)
- Sessions JWT + Refresh tokens

### API Endpoints

#### Auth
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
- [ ] Tests unitaires et d'intégration
- [ ] Documentation Swagger
- [ ] Frontend React
- [ ] OAuth Facebook
- [ ] Rate limiting
- [ ] CSRF protection

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
  },
  "devDependencies": {
    "@types/node": "^18.15.11",  // Types Node.js
    "typescript": "^5.0.3",       // TypeScript
    "nodemon": "^2.0.22"          // Auto-reload serveur
  }
}
```

### Frontend (prévu)
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "@reduxjs/toolkit": "^1.9.0",
    "tailwindcss": "^3.3.0",
    "axios": "^1.3.0"
  }
}
```

### DevOps
- Docker
- Docker Compose
- GitHub Actions
- MongoDB Atlas

## 📰 Copyright & Licence

### Copyright
© 2025 Vilnius Halal & Kosher Finder

Développé par [Nabz0r] - Tous droits réservés

Ce projet est sous licence MIT - voir le fichier [LICENSE.md](LICENSE.md) pour plus de détails

### Licences Tierces
- MongoDB Community Server (Server Side Public License)
- Node.js (MIT)
- React (MIT)
- Express (MIT)
- Passport.js (MIT)
- TailwindCSS (MIT)

### Marques Déposées
- Google™ et le logo Google sont des marques déposées de Google LLC
- MongoDB® est une marque déposée de MongoDB, Inc.
- Docker® est une marque déposée de Docker, Inc.

### Utilisation des Données
Les données des restaurants sont collectées avec leur autorisation et peuvent être supprimées sur demande.

### Contact
Pour toute question concernant les droits d'utilisation :
- Email : [email]
- GitHub : [@username](https://github.com/username)