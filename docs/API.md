# Documentation API

## Points d'entrée de l'API

### Authentification
```typescript
POST /api/auth/login
{
  "email": string,
  "password": string
}
```

Réponse :
```json
{
  "token": "jwt_token",
  "user": {
    "id": "string",
    "email": "string",
    "role": "string"
  }
}
```

### Artisans

#### Liste des artisans
```typescript
GET /api/artisans
Query params:
  - location: string (code postal)
  - radius: number (km)
  - available: boolean
```

Réponse :
```json
{
  "artisans": [
    {
      "id": "string",
      "name": "string",
      "company": "string",
      "rating": number,
      "reviews": number,
      "location": {
        "latitude": number,
        "longitude": number,
        "distance": number
      },
      "availability": {
        "nextSlot": "date",
        "availableDays": number
      },
      "certifications": string[]
    }
  ],
  "total": number,
  "page": number
}
```

### Modèles de Portes

#### Récupération des modèles
```typescript
GET /api/doors
Query params:
  - category: string
  - style: string
  - priceRange: string
  - material: string
```

Réponse :
```json
{
  "models": [
    {
      "id": "string",
      "name": "string",
      "description": "string",
      "basePrice": number,
      "images": string[],
      "specs": {
        "security": number,
        "thermal": number,
        "acoustic": number
      },
      "options": {
        "colors": string[],
        "materials": string[],
        "accessories": {
          "id": "string",
          "name": "string",
          "price": number
        }[]
      }
    }
  ]
}
```

### Configuration

#### Sauvegarde de configuration
```typescript
POST /api/configurations
Body:
{
  "doorModel": "string",
  "options": {
    "color": "string",
    "material": "string",
    "accessories": string[]
  },
  "measurements": {
    "width": number,
    "height": number
  },
  "installation": {
    "artisanId": "string",
    "requestedDate": "date"
  }
}
```

Réponse :
```json
{
  "id": "string",
  "status": "string",
  "totalPrice": number,
  "createdAt": "date",
  "estimatedInstallation": "date"
}
```

## Gestion des Erreurs

Toutes les réponses d'erreur suivent ce format :
```json
{
  "error": {
    "code": "string",
    "message": "string",
    "details": object
  }
}
```

Codes d'erreur communs :
- 400: Requête invalide
- 401: Non authentifié
- 403: Non autorisé
- 404: Ressource non trouvée
- 422: Données invalides
- 429: Trop de requêtes
- 500: Erreur serveur

## Sécurité

### Authentification
- Utilisation de JWT (JSON Web Tokens)
- Tokens à renouveler toutes les 24h
- Refresh token valide 30 jours

### Rate Limiting
- 100 requêtes par minute par IP
- 1000 requêtes par jour par utilisateur

### CORS
```typescript
// Configuration CORS autorisée
const allowedOrigins = [
  'https://votredomaine.com',
  'https://admin.votredomaine.com'
];
```

## Environnements

### Développement
```
Base URL: https://api-dev.votredomaine.com
```

### Production
```
Base URL: https://api.votredomaine.com
```

## Versioning

L'API suit le semantic versioning :
- Version actuelle: v1
- Format URL: /api/v1/[endpoint]

## Bonnes Pratiques

### Requêtes
- Utiliser les verbes HTTP appropriés
- Inclure un User-Agent
- Gérer les timeouts
- Mettre en cache les réponses

### Authentification
```typescript
// Exemple d'en-tête d'authentification
headers: {
  'Authorization': `Bearer ${token}`,
  'Content-Type': 'application/json'
}
```

### Pagination
```typescript
// Paramètres de pagination
{
  page: number,      // Page actuelle
  limit: number,     // Éléments par page
  total: number,     // Total des éléments
  hasMore: boolean   // Pages suivantes disponibles
}
```