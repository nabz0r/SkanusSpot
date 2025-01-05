# Vilnius Halal & Kosher Finder 🍽️

Application permettant de trouver, réserver et commander dans les restaurants halal et casher de Vilnius.

## 🚀 Fonctionnalités

### Authentification (#7) ✅
- Inscription/Connexion JWT
- OAuth Google
- Profils utilisateurs
- Gestion des rôles

### Recherche Avancée (#9) ✅
- Recherche full-text
- Filtres multicritères
- Géolocalisation
- Autocomplétion

### Réservation & Commande (#10) ✅
- Réservation de table
- Commande en ligne
- Suivi de livraison
- Paiement intégré

## 📚 API Endpoints

### Auth
```bash
# Authentification classique
POST /api/auth/register       # Inscription
POST /api/auth/login          # Connexion
POST /api/auth/logout         # Déconnexion
GET  /api/auth/google         # Login Google
```

### Recherche
```bash
GET /api/search/restaurants   # Recherche principale
GET /api/search/suggestions   # Autocomplétion
GET /api/search/filters       # Filtres disponibles
```

### Réservations & Commandes
```bash
# Réservations
POST /api/bookings            # Créer réservation
GET  /api/bookings/:id        # Détails réservation
PUT  /api/bookings/:id        # Modifier réservation

# Commandes
POST /api/orders              # Passer commande
GET  /api/orders/:id          # Statut commande
GET  /api/orders/:id/track    # Suivi livraison
```

## 🛠️ Stack Technique

### Backend (implémenté)
- Node.js + Express
- TypeScript
- MongoDB + Mongoose
- Passport.js (JWT, OAuth)
- Index géospatiaux

### Frontend (à venir)
- React
- TypeScript
- Redux Toolkit
- TailwindCSS

## 📕 Base de données

### Collections
- Users (Authentification)
- Restaurants (Listings)
- Bookings (Réservations)
- Orders (Commandes)
- MenuItems (Plats)

## 📝 Todo
- [x] Auth JWT + OAuth (✅ Issue #7)
- [x] Recherche avancée (✅ Issue #9)
- [x] Réservation en ligne (✅ Issue #10)
- [ ] Frontend React
- [ ] Intégration PWA
- [ ] Analytics

## 📰 Copyright & Licence

### Copyright
© 2025 nabz0r@gmail.com 

🤝 Contribution
We Welcome:
💻 Network Engineers
👀 Research Scientists
🌎 Cloud Architects
🤖 AI/ML Specialists

📞 Contact
Email: nabz0r@gmail.com GitHub: @nabz0r

📜 License
MIT License - Innovation without Boundaries
