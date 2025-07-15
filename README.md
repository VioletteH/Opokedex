# Pokédex

Objectif : mettre en place un Pokédex, une encyclopédie virtuelle recensant tous les Pokémons du jeu, avec la possibilité pour l'utilisateur de créer ses équipes, d'y ajouter de sPokémons, de les renommer et de les supprimer. 

Matériel fourni :
- les endpoints avec le listing de toutes les routes
- les user stories
- les datas (create_tables.sql et seeding_tables.sql)
- l'intégration du projet (HTML et CSS)

Ce qui a été réalisé sur ce projet

## BDD
- création d'un MCD et MLD à partir du fichier create_tables.sql
- création du user et de la base de données
- configuration de Sequelize, création des models et des relations

## Back / API
- création des différentes routes
- création des méthodes de controllers associées à chaque route
- création d'un controller wrapper
- test des routes avec REST client

## Front / SPA
- consommation de l'API / récupération des données API
- dynamisation de l'affichage des différentes pages (GET)
    > Pokedex : 
    - affichage des cartes Pokémons 
    - modale avec les détails de chaque Pokémon 
    > Types : 
    - affichage des types 
    - filtre des cartes Pokémons en fonction du type
    - modale avec les détails de chaque Pokémon
    > Equipes : 
    - affichage des équipes
    - modale avec le détail de l'équipe et les Pokémons qu'elle contient
- interaction avec la base de données (POST / PATCH / PUT / DELETE)
    > Ajouter une équipe : 
    - création d'une nouvelle équipe
    > Equipes : 
    - modification d'une équipe existante 
    - suppression d'un Pokémon de l'équipe
    - suppression d'une équipe
    > Modale détails Pokémon
    - ajout d'un Pokémon à une équipe

## Bonus
- mise en place d'un module de recherche pour afficher la modale avec les détails d'un Pokémon
- mise en place d'un swagger pour l'API

Swagger API disponible sur https://app.swaggerhub.com/apis-docs/VioletteHenquet/pokemon-api/1.0.0#/ 


npx jest tests/team.test.js --runInBand --detectOpenHandles 