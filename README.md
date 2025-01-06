# S14 - Projet Pokédex

Bienvenue sur ce projet Pokédex ! 👋

Ta mission de cette semaine est de mettre en place un Pokédex. Pour ceux qui ne connaissent pas, un Pokédex est une encyclopédie virtuelle recensant tous les Pokémons du jeu.

Mais ça ne s'arrête pas là ! Tu devras également mettre en place un système d'équipes de Pokémons. Les utilisateurs pourront créer des équipes, y ajouter des Pokémons, les renommer, les supprimer, etc. 😁

Tu auras aussi quelques bonus à ta disposition si tu souhaites continuer à te challenger. 💪

Le but de cette semaine est de pratiquer :

- La création d'une API REST
- La consommation de cette API puis un front en Vanilla JS (JavaScript pur quoi)
- L'affichage dynamique de templates HTML directement depuis JavaScript
- En GET et en POST !

Maintenant que le contexte est posé, attention à bien lire toutes les consignes ci-dessous et prendre des notes de ton côté si tu l'estimes nécessaire. 📝

## Organisation

On te donne 3 jours pour réaliser ce projet et on t'a mis une [roadmap dans le dossier docs](./docs/roadmap.md) pour t'aider à t'organiser. 🗺️

On te conseille en tous cas de te concentrer sur **UNE SEULE** feature à la fois de bout en bout, par exemple afficher tous les pokémons ou afficher tous les types qui est encore plus simple. Toujours dans le but de ce qu'on a mis plus haut ⬆️.

Au 4ème jour, on te fournira notre correction pour que tu puisses comparer avec ta réalisation et modifier/continuer ton projet si tu le souhaites 🚀

Tu pourras aussi te concentrer sur des **révisions**, **le parkour O'Todo**, ou bien avancer le **Dossier Professionnel** (_si tu es en DWWM_). En tous cas, contacte-nous si tu as besoin de quoi que ce soit ! 🤗

## Conception (optionnel)

Non obligatoire car on te fournit déjà une base de données et une intégration, mais si tu veux travailler [MCD](https://kourou.oclock.io/ressources/fiche-recap/mcd-modele-conceptuel-de-donnees/), [MLD](https://kourou.oclock.io/ressources/fiche-recap/mld/) et [wireframes](https://kourou.oclock.io/ressources/fiche-recap/wireframes-mode-demploi/), on ne peut que t'encourager à le faire. 👍

Cela te sera certainement très utile pour le titre professionnel notamment de toute façon pour ton métier de développeur. C'est quand même mieux de savoir concevoir une base de données 🤓

### Conseils de conception

Pour le [MCD](https://kourou.oclock.io/ressources/fiche-recap/mcd-modele-conceptuel-de-donnees/), fais bien attention au sens des cardinalités, ne fais pas apparaitre les ids, attention à avoir des verbes qui ont du sens et qui ne se répètent pas.

Pour le MLD, tu as les [règles ici](https://kourou.oclock.io/ressources/fiche-recap/mld/).

Pour les wireframes tu as [la doc Kourou](https://kourou.oclock.io/ressources/fiche-recap/wireframes-mode-demploi/) à ta disposition, mais en vrac :

- Pas de design, juste de la structure
- On légende tout ce qui n'est pas clair
- On en fait un desktop et un mobile

Pour info, avant le wireframe on peut avoir le zoning, sorte de brouillon ultra simpliste qui permet d'identifier les différents blocs de la page.

Et après ... c'est les maquettes ! 🎨

## Infos et aides pour le projet

On t'a mis un dossier `docs` avec quelques fichiers te donnant des informations sur le projet.

- [roadmap.md](./docs/roadmap.md) qui contient les attendus du projet sous forme de user-stories.
- [endpoints.md](./docs/endpoints.md) qui contient la liste des routes qui devront être faites dans l'API
- [installation.md](./docs/installation.md) qui contient une courte série d'instructions pour lancer le projet.

On a également mis un dossier `integration` contenant des assets et fichiers html pour t'aider à faire le projet. Tu n'es pas obligé de les utiliser si tu as envie de toi même bosser l'intégration, mais ça ne doit pas te prendre deux jours, ce n'est pas du tout le but du projet. 🎨

On t'invite à lancer un **Live Server** sur ce projet tout de suite pour voir le rendu de ces fichiers html.

C'est bon ? Si c'est oui c'est que tu peux accéder au premier fichier ici : [components.html](http://localhost:5500/docs/integration/components.html).

- Le fichier [components.html](http://localhost:5500/docs/integration/components.html) est utile si tu le visualises dans le navigateur pour te permettre de copier très facilement le code des composants HTML dont tu as besoin et voir à quoi ils ressemblent. Pour chaque, tu retrouves :
  - Le nom du composant
  - L'aperçu du composant
  - Le code HTML du composant

- Le Fichier [samplePage.html](http://localhost:5500/docs/integration/samplePage.html) te permet de voir aussi dans le navigateur à quoi peut ressembler une page en utilisant les composants HTML. Tu peux aussi aller voir le code du fichier ici : [samplePage.html](./docs/integration/samplePage.html).

- Le dernier fichier c'est [starterPage.html](./docs/integration/starterPage.html) qui est le code base pour commencer à intégrer le projet. On te conseille de créer ton index.html de ton front à partir de ce fichier. 😉

## Structure du projet

### Back

On t'a déjà créé un dossier back. Tu y trouveras :

- Un dossier data qui contient les fichiers sql :
  - [create_tables.sql](./back/data/create_tables.sql) : permet de créer les tables de la bases de données
  - [seeding_tables.sql](./back/data/seeding_tables.sql) : permet de remplir les tables avec les données
- [.env.example](./back/.env.example) : nos variables d'environnement.
- [package.json](./back/package.json) : contient nos dependances & les scripts (que vous devrez faire en vous inspirant des projets précédents.)

Pour le reste ... **à toi de jouer** !

### Front

Tu as le droit à un joli `index.html` vide et c'est tout ! 😅 Tu devras y mettre ton code HTML, CSS et JS, à récupérer depuis le dossier `integration` 🎨

## Besoin d'aide technique ?

Je n'ai qu'une seule chose à te dire : **ISSUE** ! 🚨

Je ne te montre pas le chemin, depuis le temps .. tu le connais 😏

## Le mot de la fin

Voilà, le crois que tu as tout ce qu'il faut pour te lancer, amuse-toi bien et n'oublie pas de faire des commits et push régulièrement, sinon tu risques de faire comme le concepteur de ce challenge qui a la facheuse tendance de ne pas pusher assez souvent ou alors au milieu d'une feature, et c'est dommage parce que la dernière fois, il a oublié de commiter les numéros du loto de la semaine prochaine justement, qui sont

_[TODO finir ce readme]_
