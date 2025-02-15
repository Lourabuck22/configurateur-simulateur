# Guide de Déploiement

Ce guide couvre le déploiement de l'application dans différents environnements.

## 1. Préparation au Déploiement

### Variables d'Environnement

```env
# .env.production
NEXT_PUBLIC_API_URL=https://api.votredomaine.com
NEXT_PUBLIC_ASSETS_URL=https://assets.votredomaine.com
```

### Scripts de Build

```json
{
  "scripts": {
    "build": "next build",
    "start": "next start",
    "analyze": "ANALYZE=true next build"
  }
}
```

## 2. Déploiement sur Vercel

### Configuration Vercel

```json
// vercel.json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/next"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/$1"
    }
  ],
  "env": {
    "NEXT_PUBLIC_API_URL": "@api-url",
    "NEXT_PUBLIC_ASSETS_URL": "@assets-url"
  }
}
```

### Commandes de Déploiement

```bash
# Installation de Vercel CLI
npm i -g vercel

# Login
vercel login

# Déploiement
vercel

# Déploiement en production
vercel --prod
```

## 3. Configuration Docker

### Dockerfile

```dockerfile
# Dockerfile
FROM node:18-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
EXPOSE 3000
ENV PORT 3000
CMD ["node", "server.js"]
```

### Docker Compose

```yaml
# docker-compose.yml
version: '3.8'
services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - NEXT_PUBLIC_API_URL=https://api.votredomaine.com
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000"]
      interval: 30s
      timeout: 10s
      retries: 3
```

## 4. CI/CD avec GitHub Actions

### Workflow Configuration

```yaml
# .github/workflows/deploy.yml
name: Deploy
on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Run tests
        run: npm test
        
      - name: Build
        run: npm run build
        
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID}}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

## 5. Monitoring et Logging

### Sentry Configuration

```typescript
// utils/sentry.ts
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
  environment: process.env.NODE_ENV
});
```

### Application Monitoring

```typescript
// app/error.tsx
'use client';

import { useEffect } from 'react';
import * as Sentry from '@sentry/nextjs';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <div className="p-4">
      <h2>Une erreur est survenue</h2>
      <button
        onClick={reset}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Réessayer
      </button>
    </div>
  );
}
```

## 6. Optimisation des Performances

### Configuration du Cache

```typescript
// next.config.js
module.exports = {
  images: {
    domains: ['assets.votredomaine.com'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  experimental: {
    optimizeCss: true,
    modern: true,
  },
  headers: async () => {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, s-maxage=86400',
          },
        ],
      },
    ];
  },
};
```

### Compression et Optimisation

```bash
# Installation des outils d'optimisation
npm install -D compression-webpack-plugin terser-webpack-plugin

# Configuration de la compression
COMPRESS=true npm run build
```

## 7. Sécurité en Production

### Headers de Sécurité

```typescript
// next.config.js
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  }
];

module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};
```