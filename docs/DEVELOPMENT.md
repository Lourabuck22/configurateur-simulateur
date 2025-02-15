# Guide de Développement

## Environnement de développement

### Prérequis
- Node.js 18+
- npm ou yarn
- Git

### Installation

1. Cloner le dépôt :
```bash
git clone https://github.com/Lourabuck22/configurateur-simulateur.git
cd configurateur-simulateur
```

2. Installer les dépendances :
```bash
cd frontend
npm install
```

3. Lancer en développement :
```bash
npm run dev
```

## Architecture du Code

### Structure des Components

```typescript
// Exemple de structure de composant
const ComponentName = ({ prop1, prop2 }) => {
  // États
  const [state, setState] = useState(initialValue);

  // Effets
  useEffect(() => {
    // Logique d'effet
  }, [dependencies]);

  // Gestionnaires d'événements
  const handleEvent = () => {
    // Logique de l'événement
  };

  // Rendu
  return (
    <div>
      {/* JSX */}
    </div>
  );
};
```

### Gestion des États
- Utiliser les hooks React pour la gestion d'état local
- Éviter les états globaux inutiles
- Préférer le passage de props pour la communication parent-enfant

### Styles
- Utiliser TailwindCSS pour tous les styles
- Suivre une approche mobile-first
- Utiliser les classes utilitaires de manière cohérente

## Conventions de Code

### Nommage
- Components : PascalCase (ex: `ButtonComponent`)
- Fonctions : camelCase (ex: `handleClick`)
- Variables : camelCase (ex: `userInput`)
- Constants : UPPER_SNAKE_CASE (ex: `MAX_ITEMS`)

### Organisation des Imports
```typescript
// 1. React et librairies externes
import React, { useState } from 'react';
import { SomeExternalLib } from 'external-lib';

// 2. Components
import { MyComponent } from './components';

// 3. Hooks et utilitaires
import { useCustomHook } from './hooks';
import { someUtil } from './utils';

// 4. Types
import type { MyType } from './types';

// 5. Styles
import './styles.css';
```

## Tests

### Configuration
```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom
```

### Exemple de Test
```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { ComponentName } from './ComponentName';

describe('ComponentName', () => {
  it('should render correctly', () => {
    render(<ComponentName />);
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });
});
```

## Gestion des Versions

### Branches
- `main` : code de production
- `develop` : code de développement
- `feature/*` : nouvelles fonctionnalités
- `fix/*` : corrections de bugs
- `release/*` : préparation des releases

### Commits
Format : `type(scope): description`

Types :
- `feat` : nouvelle fonctionnalité
- `fix` : correction de bug
- `docs` : documentation
- `style` : formatage
- `refactor` : refactoring
- `test` : ajout/modification de tests
- `chore` : maintenance

### Versioning
Suivre le Semantic Versioning (MAJOR.MINOR.PATCH)

## Déploiement

### Développement
```bash
npm run build
npm run start
```

### Production
1. Construire l'application :
```bash
npm run build
```

2. Tester la build :
```bash
npm run start
```

3. Déployer sur l'environnement de production

## Bonnes Pratiques

### Performance
- Minimiser les re-rendus inutiles
- Utiliser React.memo pour les composants purement présentationnels
- Optimiser les images et assets
- Implémenter le lazy loading quand approprié

### Sécurité
- Valider toutes les entrées utilisateur
- Échapper les contenus dynamiques
- Utiliser les dernières versions des dépendances
- Suivre les meilleures pratiques OWASP

### Accessibilité
- Utiliser les attributs ARIA appropriés
- Assurer un bon contraste des couleurs
- Supporter la navigation au clavier
- Tester avec des lecteurs d'écran

## Ressources
- [React Documentation](https://reactjs.org/)
- [Next.js Documentation](https://nextjs.org/docs)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)