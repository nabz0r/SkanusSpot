# Architecture

## Nouveaux Composants Frontend
```mermaid
flowchart TD
    A[App] --> B[Router]
    B --> C[Layout]
    C --> D[Home]
    D --> E[SearchFilters]
    D --> F[RestaurantCard]
    B --> G[Auth]
    B --> H[Restaurant]
```

## État Global
```mermaid
flowchart LR
    A[AuthStore] --> B[User Data]
    A --> C[JWT Token]
    D[RestaurantStore] --> E[Restaurant List]
    D --> F[Search Filters]
    F --> G[Dietary Options]
```

## Composants UI
| Composant | Description | Props |
|-----------|-------------|-------|
| SearchFilters | Filtres recherche | setFilters() |
| RestaurantCard | Carte restaurant | restaurant: Restaurant |
| ProtectedRoute | Route privée | children: ReactNode |