# Documentation API

## Système de Recherche

### Recherche de Restaurants
`GET /api/search/restaurants`

#### Paramètres de requête
| Paramètre  | Type    | Description |
|------------|---------|-------------|
| q          | string  | Recherche textuelle |
| type       | string  | 'halal' ou 'kosher' |
| cuisine    | string  | Types de cuisine (comma-separated) |
| priceRange | string  | Gamme de prix (€,€€,€€€) |
| rating     | number  | Note minimale (1-5) |
| features   | string  | Spécificités (comma-separated) |
| lat        | number  | Latitude |
| lng        | number  | Longitude |
| radius     | number  | Rayon de recherche en mètres |
| sortBy     | string  | Champ de tri |
| sortOrder  | string  | 'asc' ou 'desc' |
| page       | number  | Numéro de page |
| limit      | number  | Résultats par page |

#### Réponse
```json
{
  "results": [
    {
      "_id": "...",
      "name": "Restaurant Name",
      "type": "halal",
      "description": "...",
      "address": {
        "street": "...",
        "city": "Vilnius",
        "postalCode": "...",
        "country": "Lithuania"
      },
      "location": {
        "type": "Point",
        "coordinates": [longitude, latitude]
      },
      "rating": {
        "average": 4.5,
        "count": 100
      },
      "distance": 1.2 // en km, présent si recherche géo
    }
  ],
  "total": 50,
  "page": 1,
  "totalPages": 5
}
```

### Suggestions de Recherche
`GET /api/search/suggestions`

#### Paramètres
| Paramètre | Type   | Description |
|------------|--------|-------------|
| q          | string | Terme de recherche |
| limit      | number | Nombre de suggestions (default: 5) |

#### Réponse
```json
{
  "suggestions": [
    {
      "name": "Restaurant Name",
      "type": "halal",
      "cuisine": ["Lebanese", "Mediterranean"]
    }
  ]
}
```

### Filtres Disponibles
`GET /api/search/filters`

#### Réponse
```json
{
  "cuisines": ["Lebanese", "Turkish", "Indian"],
  "features": ["Parking", "Delivery", "Wifi"],
  "priceRanges": ["€", "€€", "€€€"],
  "types": ["halal", "kosher"]
}
```