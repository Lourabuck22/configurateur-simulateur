# Fonctionnalités Avancées

## 1. Gestion d'État Avancée

### Custom Hooks

```typescript
// hooks/useConfiguration.ts
import { useState, useCallback } from 'react';

interface ConfigurationState {
  color: string;
  material: string;
  options: string[];
  price: number;
}

export const useConfiguration = (initialState: ConfigurationState) => {
  const [config, setConfig] = useState(initialState);

  const updateColor = useCallback((color: string) => {
    setConfig(prev => ({ ...prev, color }));
  }, []);

  const updateMaterial = useCallback((material: string) => {
    setConfig(prev => ({ ...prev, material }));
  }, []);

  const addOption = useCallback((option: string) => {
    setConfig(prev => ({
      ...prev,
      options: [...prev.options, option]
    }));
  }, []);

  const calculatePrice = useCallback(() => {
    // Logique de calcul du prix
    const basePrice = 1000;
    const materialPrice = config.material === 'premium' ? 500 : 0;
    const optionsPrice = config.options.length * 100;
    
    return basePrice + materialPrice + optionsPrice;
  }, [config]);

  return {
    config,
    updateColor,
    updateMaterial,
    addOption,
    calculatePrice
  };
};
```

## 2. Visualisation 3D

### Configuration Three.js

```typescript
// components/DoorViewer.tsx
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

const DoorModel: React.FC<{ color: string }> = ({ color }) => {
  return (
    <mesh>
      <boxGeometry args={[1, 2, 0.1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

export const DoorViewer: React.FC<{ color: string }> = ({ color }) => {
  return (
    <div className="w-full h-[500px]">
      <Canvas camera={{ position: [0, 0, 3] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <DoorModel color={color} />
        <OrbitControls />
      </Canvas>
    </div>
  );
};
```

## 3. Animations et Transitions

### Animation des Changements

```typescript
// components/ConfigurationStep.tsx
import { motion, AnimatePresence } from 'framer-motion';

export const ConfigurationStep: React.FC<{
  step: number;
  children: React.ReactNode;
}> = ({ step, children }) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={step}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
```

## 4. Validation des Données

### Schéma de Validation

```typescript
// validation/schemas.ts
import * as z from 'zod';

export const configurationSchema = z.object({
  color: z.string().min(4).max(7),
  material: z.enum(['standard', 'premium']),
  dimensions: z.object({
    width: z.number().min(600).max(1200),
    height: z.number().min(1800).max(2400)
  }),
  options: z.array(z.string()),
  installationDate: z.date().min(new Date())
});

type Configuration = z.infer<typeof configurationSchema>;

// Utilisation
const validateConfiguration = (data: unknown): Configuration => {
  return configurationSchema.parse(data);
};
```

## 5. Tests Avancés

### Tests d'Intégration

```typescript
// __tests__/integration/Configurator.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Configurator } from '@/components/Configurator';

describe('Configurator Integration', () => {
  it('completes a full configuration flow', async () => {
    render(<Configurator />);

    // Étape 1: Sélection de la couleur
    await userEvent.click(screen.getByTestId('color-picker'));
    await userEvent.click(screen.getByTestId('color-black'));
    expect(screen.getByTestId('preview')).toHaveStyle({ backgroundColor: '#000000' });

    // Étape 2: Sélection du matériau
    await userEvent.click(screen.getByTestId('material-select'));
    await userEvent.click(screen.getByText('Premium'));
    expect(screen.getByTestId('price')).toHaveTextContent('1500');

    // Étape 3: Options
    await userEvent.click(screen.getByText('Ajouter serrure connectée'));
    expect(screen.getByTestId('options-list')).toContain('Serrure connectée');

    // Validation finale
    await userEvent.click(screen.getByText('Valider'));
    expect(screen.getByText('Configuration terminée')).toBeInTheDocument();
  });
});
```

## 6. Performance

### Optimisations React

```typescript
// components/ConfigurationSummary.tsx
import React, { useMemo } from 'react';

interface Props {
  configuration: Configuration;
}

export const ConfigurationSummary = React.memo(({ configuration }: Props) => {
  const totalPrice = useMemo(() => {
    return calculateTotalPrice(configuration);
  }, [configuration]);

  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h3 className="font-bold">Résumé</h3>
      <dl className="mt-4 space-y-2">
        <dt>Modèle</dt>
        <dd>{configuration.model}</dd>
        <dt>Couleur</dt>
        <dd>{configuration.color}</dd>
        <dt>Prix total</dt>
        <dd>{totalPrice}€</dd>
      </dl>
    </div>
  );
});

ConfigurationSummary.displayName = 'ConfigurationSummary';
```

## 7. Sécurité

### Protection des Données

```typescript
// utils/security.ts
import { encrypt, decrypt } from 'crypto-js/aes';
import { enc } from 'crypto-js';

const SECRET_KEY = process.env.ENCRYPTION_KEY || 'default-key';

export const secureStorage = {
  set: (key: string, value: any) => {
    try {
      const encrypted = encrypt(JSON.stringify(value), SECRET_KEY);
      localStorage.setItem(key, encrypted.toString());
    } catch (error) {
      console.error('Error encrypting data:', error);
    }
  },

  get: (key: string) => {
    try {
      const encrypted = localStorage.getItem(key);
      if (!encrypted) return null;
      
      const decrypted = decrypt(encrypted, SECRET_KEY);
      return JSON.parse(decrypted.toString(enc.Utf8));
    } catch (error) {
      console.error('Error decrypting data:', error);
      return null;
    }
  }
};
```