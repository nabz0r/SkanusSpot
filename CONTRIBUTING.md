# Guide de Contribution

## Comment contribuer

### Signaler des bugs

1. Vérifiez d'abord que le bug n'a pas déjà été signalé
2. Utilisez le template d'issue pour les bugs
3. Décrivez précisément :
   - Les étapes pour reproduire
   - Le comportement attendu vs actuel
   - Votre environnement

### Proposer des améliorations

1. Ouvrez une issue pour discuter de votre idée
2. Attendez la validation des mainteneurs
3. Créez une Pull Request

## Workflow de développement

### Setup du projet

1. Fork le repo
2. Clone votre fork
```bash
git clone git@github.com:username/vilnius-halal-kosher-finder.git
cd vilnius-halal-kosher-finder
```

3. Ajoutez le remote upstream
```bash
git remote add upstream git@github.com:nabz0r/vilnius-halal-kosher-finder.git
```

### Process de développement

1. Créez une branche pour votre feature
```bash
git checkout -b feature/amazing-feature
```

2. Committez vos changements
```bash
git add .
git commit -m "feat: add amazing feature"
```

3. Gardez votre branche à jour
```bash
git fetch upstream
git rebase upstream/main
```

4. Pushez vos changements
```bash
git push origin feature/amazing-feature
```

### Pull Requests

1. Utilisez le template de PR
2. Référencez l'issue correspondante
3. Décrivez clairement vos changements
4. Ajoutez des tests si nécessaire

## Standards de code

### Général

- Utilisez TypeScript
- Respectez ESLint et Prettier
- Commentez le code complexe
- Écrivez des tests

### Commits

Suivez la convention [Conventional Commits](https://www.conventionalcommits.org/) :

```
feat: add user authentication
fix: correct database connection timeout
docs: update API documentation
refactor: simplify auth middleware
```

### Documentation

- Documentez les nouvelles fonctionnalités
- Mettez à jour le README si nécessaire
- Ajoutez des commentaires JSDoc

## Process de release

1. Les versions suivent [Semantic Versioning](https://semver.org/)
2. Les releases sont automatisées via GitHub Actions
3. Les changelogs sont générés automatiquement

## Questions ?

Pour toute question :
1. Vérifiez la documentation
2. Consultez les issues existantes
3. Ouvrez une nouvelle issue avec le label 'question'

Merci de contribuer ! 🙏