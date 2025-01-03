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

## 📄 Licence
MIT