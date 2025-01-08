# Documentation API

## Endpoints

### Auth
| Endpoint | Méthode | Auth | Description |
|----------|---------|------|-------------|
| /auth/register | POST | Non | Inscription |
| /auth/login | POST | Non | Connexion |
| /auth/logout | POST | Oui | Déconnexion |
| /auth/profile | GET | Oui | Profil utilisateur |
| /auth/preferences | PUT | Oui | Mise à jour préférences |

### OAuth
| Endpoint | Méthode | Auth | Description |
|----------|---------|------|-------------|
| /oauth/google | GET | Non | Login Google |
| /oauth/google/callback | GET | Non | Callback Google |

### Restaurants
| Endpoint | Méthode | Auth | Description |
|----------|---------|------|-------------|
| /restaurants | GET | Non | Liste restaurants |
| /restaurants/:id | GET | Non | Détails restaurant |
| /restaurants | POST | Oui | Créer restaurant |
| /restaurants/:id | PUT | Oui | Modifier restaurant |