# Environment variables

A `.env` file must exist in the root directory of the project to define the following environment-specific variables :
- `PYTHON_PATH` : absolute path to python executable

# Pour débugger l'application

''
node --inspect --debug-brk app.js
''

puis lancer l'url dans un chrome

# Développement

1. Démarrage du serveur avec surveillance et redémarrage automatique (`nodemon`) :

```sh
npm run serve
```

2. Démarrage du client avec surveillance et redémarrage automatique (sans *Hot Module Replacement*) :

```sh
npm start
```

3. Accéder à l'url `http://localhost:3000/`. Tout changement côté client ou côté serveur sera automatiquement pris en compte à chaud.

# Production

Démarrage du processus de construction pour la production :

```sh
npm run build
```

Cette instruction lance en parallèle la construction du serveur et du client, et met à disposition les bundles générés dans le répertoire `/dist`.

Pour tester la construction (ou démarrer l'application), exécuter la commande suivante :

```sh
# Dans le cas où nodemon est installé en global :
nodemon ./dist/server
# Dans le cas contraire :
node_modules\.bin\nodemon dist\server.js
```