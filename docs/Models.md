# Modèles de Données

## User
```mermaid
erDiagram
    User {
        string email
        string password
        string name
        string role
        object oauth
        array preferences
        array favorites
        date lastLogin
    }
    User ||--o{ Restaurant : owns
    User ||--o{ Restaurant : favorites
```

## Restaurant
```mermaid
erDiagram
    Restaurant {
        string name
        object location
        object dietaryOptions
        array menu
        number rating
        ObjectId owner
    }
    Restaurant ||--|{ Menu : has
    Menu {
        string name
        number price
        object dietary
    }
```

### Options Diététiques
| Option | Type | Description |
|--------|------|-------------|
| halal | boolean | Certifié Halal |
| kosher | boolean | Certifié Casher |
| vegan | boolean | Pas de produits animaux |
| vegetarian | boolean | Pas de viande |