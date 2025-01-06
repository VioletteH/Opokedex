# Installation

```bash
# Cloner le projet
git clone REPO_SSH_URL

# Se déplacer dans le projet
cd REPO_NAME

# Ouvrir le projet dans VSCode
code .

# Installer les dépendances back
cd back 
npm install

# Si vous voulez utiliser npm coté front (vite etc..) cf votre repo okanban front ;) 
# Sinon on utilise liveServer tout simplement !
```

## Mise en place de la base de données

```bash
# Se connecter à son client Postgres
sudo -i -u postgres psql

# Créer un utilisateur de base de données
CREATE USER admin_pokedex WITH LOGIN PASSWORD 'pokedex';

# Créer une base de données 
CREATE DATABASE pokedex WITH OWNER admin_pokedex;

# Quitter psql
exit
```

## Mise en place de l'environnement de développement

Se mettre dans le dossier `back` si on n'y est plus et créer un fichier d'environnement à partir du fichier d'exemple.

```bash
# Créer un fichier d'environnement backend
cp .env.example .env

# Ajuster les valeurs du fichier .env
code .env

# Lancer les commandes de création de tables et d'échantillonnage (todo: créer un script npm "db:reset" pour lancer ces commandes)
psql -U admin_pokedex -d pokedex -f ./back/data/create_tables.sql
psql -U admin_pokedex -d pokedex -f ./back/data/seeding_tables.sql
```
