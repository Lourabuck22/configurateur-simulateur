# Documentation du Configurateur de Portes

## Vue d'ensemble
Le configurateur de portes est une application web moderne permettant aux utilisateurs de personnaliser et commander des portes sur mesure. L'application guide l'utilisateur à travers plusieurs étapes, de la sélection de l'adresse jusqu'à la configuration finale.

## Architecture
L'application est construite avec :
- Frontend : React/Next.js
- État : React Hooks
- Styles : TailwindCSS
- Icons : Lucide React

## Étapes du configurateur

### 1. Page d'accueil
- Présentation du service
- Bouton d'appel à l'action pour démarrer
- Design responsive et moderne

### 2. Sélection de l'adresse
- Saisie de l'adresse avec autocomplétion
- Validation des adresses
- Géolocalisation disponible

### 3. Choix de l'artisan
- Liste des artisans disponibles
- Informations détaillées (notes, certifications)
- Filtrage par disponibilité

### 4. Configuration de la porte
- Sélection du modèle
- Personnalisation (couleurs, matériaux)
- Visualisation des prix

## États et Navigation
```javascript
const [currentStep, setCurrentStep] = useState(0);
const [selectedAddress, setSelectedAddress] = useState(null);
const [selectedArtisan, setSelectedArtisan] = useState(null);
const [selectedModel, setSelectedModel] = useState(null);
```

## Composants Principaux

### ProgressBar
```javascript
const ProgressBar = () => (
  <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
    <div 
      className="h-full bg-indigo-600 transition-all duration-500"
      style={{ width: `${(currentStep + 1) * 25}%` }}
    />
  </div>
);
```

### StepIndicator
```javascript
const StepIndicator = () => (
  <div className="mb-8">
    <div className="max-w-4xl mx-auto px-4">
      <div className="flex items-center space-x-2 text-sm text-gray-600">
        <span className="font-medium">ÉTAPE {currentStep + 1}/4</span>
      </div>
    </div>
  </div>
);
```

## Fonctionnalités de Sécurité
- Validation des entrées utilisateur
- Messages d'erreur explicites
- Protection contre les soumissions multiples
- Validation des données à chaque étape

## Guide d'installation

1. Cloner le dépôt :
```bash
git clone https://github.com/Lourabuck22/configurateur-simulateur.git
```

2. Installer les dépendances :
```bash
cd configurateur-simulateur
cd frontend
npm install
```

3. Lancer l'application en développement :
```bash
npm run dev
```

## Structure des fichiers
```
frontend/
  ├── src/
  │   ├── components/
  │   │   └── Configurator.tsx
  │   ├── app/
  │   │   ├── layout.tsx
  │   │   ├── page.tsx
  │   │   └── globals.css
  │   └── styles/
  ├── public/
  └── package.json
```

## Convention de développement

### Git
- Branche principale : `main`
- Branches de fonctionnalités : `feature/*`
- Branches de correctifs : `fix/*`

### Code
- TypeScript strict
- ESLint pour la qualité du code
- Prettier pour le formatage
- Tests pour les composants principaux

## Prochaines étapes
1. Intégration de plus de modèles de portes
2. Amélioration de la visualisation 3D
3. Ajout de fonctionnalités de sauvegarde
4. Optimisation des performances