# Guide d'Installation

## Prérequis
- Node.js 18+
- MongoDB 5+
- Git

## Installation Backend
```bash
cd backend
npm install

# Configuration
cp .env.example .env
# Éditer .env avec vos credentials MongoDB

# Démarrer
npm run dev
```

## Installation Frontend
```bash
cd frontend
npm install

# Configuration
cp .env.example .env
# Éditer .env avec l'URL API

# Démarrer
npm run dev
```

## Accès
- Backend: http://localhost:3000
- Frontend: http://localhost:5173
- API Docs: http://localhost:3000/api/docs
