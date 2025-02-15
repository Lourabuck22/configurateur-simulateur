# Guide de Contribution

## Comment Contribuer

### 1. Préparer son environnement

1. Forker le dépôt
2. Cloner votre fork :
```bash
git clone https://github.com/[votre-username]/configurateur-simulateur.git
```
3. Ajouter le dépôt upstream :
```bash
git remote add upstream https://github.com/Lourabuck22/configurateur-simulateur.git
```

### 2. Créer une branche

```bash
git checkout -b feature/ma-fonctionnalite
```

Conventions de nommage :
- `feature/*` : nouvelles fonctionnalités
- `fix/*` : corrections de bugs
- `docs/*` : documentation
- `refactor/*` : refactoring

### 3. Développer

1. Écrire du code propre et documenté
2. Suivre les standards du projet
3. Ajouter des tests
4. Vérifier que les tests passent

### 4. Commiter

Format de commit :
```
type(scope): description

[corps]

[footer]
```

Types :
- `feat`: nouvelle fonctionnalité
- `fix`: correction de bug
- `docs`: documentation
- `style`: formatage
- `refactor`: refactoring
- `test`: tests
- `chore`: maintenance

Exemple :
```
feat(configurator): ajouter la sélection de couleur

- Ajout du composant ColorPicker
- Intégration avec le configurateur principal
- Tests unitaires pour la sélection de couleur

Closes #123
```

### 5. Soumettre une Pull Request

1. Pousser les changements :
```bash
git push origin feature/ma-fonctionnalite
```

2. Créer la Pull Request sur GitHub
3. Remplir le template de PR
4. Attendre la review

## Standards de Code

### JavaScript/TypeScript

```typescript
// Bon exemple
const calculateTotal = (items: Item[]): number => {
  return items.reduce((total, item) => total + item.price, 0);
};

// Mauvais exemple
function calc(i) {
  let t = 0;
  for(let x of i) t += x.p;
  return t;
}
```

### React Components

```typescript
// Bon exemple
const UserProfile: React.FC<UserProfileProps> = ({ user, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="user-profile">
      {/* JSX */}
    </div>
  );
};

// Mauvais exemple
function Profile(p) {
  const [edit, setEdit] = useState(false);
  return <div>{/* JSX */}</div>;
}
```

### CSS/TailwindCSS

```typescript
// Bon exemple
<div className="flex items-center justify-between p-4 bg-white rounded-lg shadow">

// Mauvais exemple
<div className="flex" style={{ padding: '16px', backgroundColor: 'white' }}>
```

## Tests

### Tests Unitaires

```typescript
describe('ColorPicker', () => {
  it('should select a color when clicked', () => {
    const onSelect = jest.fn();
    render(<ColorPicker onSelect={onSelect} />);
    
    fireEvent.click(screen.getByTestId('color-red'));
    
    expect(onSelect).toHaveBeenCalledWith('red');
  });
});
```

### Tests d'Intégration

```typescript
describe('DoorConfigurator', () => {
  it('should update preview when options change', async () => {
    render(<DoorConfigurator />);
    
    await userEvent.click(screen.getByText('Couleur'));
    await userEvent.click(screen.getByTestId('color-blue'));
    
    expect(screen.getByTestId('door-preview')).toHaveStyle({
      backgroundColor: 'blue'
    });
  });
});
```

## Review Checklist

- [ ] Le code suit les standards
- [ ] Les tests sont présents et passent
- [ ] La documentation est à jour
- [ ] Les changements sont pertinents
- [ ] Le code est optimisé
- [ ] Les messages de commit sont clairs

## Processus de Release

1. Mise à jour de la version :
```bash
npm version patch|minor|major
```

2. Changelog :
```markdown
## [1.1.0] - 2025-02-15

### Ajouté
- Nouvelle fonctionnalité X
- Support pour Y

### Corrigé
- Bug Z
```

3. Tag et Release :
```bash
git tag v1.1.0
git push origin v1.1.0
```

## Support

- Issues GitHub pour les bugs
- Discussions pour les questions
- Pull Requests pour les contributions
- Email pour les questions sensibles