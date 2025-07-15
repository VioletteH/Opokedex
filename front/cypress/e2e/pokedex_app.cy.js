/// <reference types="cypress" />

describe('Application Pokedex - Tests Front-end', () => {

    // URL de votre back-end
    const API_BASE_URL = 'http://localhost:3000';

    // Données de test (mockées)
    const mockPokemons = [
        { id: 1, name: 'Bulbasaur', hp: 45, atk: 49, def: 49, atk_spe: 65, def_spe: 65, speed: 45, pokedex_number: 1, types: [{name: 'Grass'}, {name: 'Poison'}] },
        { id: 4, name: 'Charmander', hp: 39, atk: 52, def: 43, atk_spe: 60, def_spe: 50, speed: 65, pokedex_number: 4, types: [{name: 'Fire'}] },
        { id: 7, name: 'Squirtle', hp: 44, atk: 48, def: 65, atk_spe: 50, def_spe: 64, speed: 43, pokedex_number: 7, types: [{name: 'Water'}] },
        // Ajoutons un Pokémon pour la recherche
        { id: 25, name: 'Pikachu', hp: 35, atk: 55, def: 40, atk_spe: 50, def_spe: 50, speed: 90, pokedex_number: 25, types: [{name: 'Electric'}] }
    ];

    const mockTeams = [
        { id: 10, name: 'Team Alpha', description: 'Une super équipe', pokemons: [mockPokemons[0], mockPokemons[1]] },
        { id: 11, name: 'Team Beta', description: 'Équipe vide pour test', pokemons: [] },
        { id: 12, name: 'Team Full', description: 'Équipe complète', pokemons: [
            { id: 101, name: 'Pkm1' }, { id: 102, name: 'Pkm2' }, { id: 103, name: 'Pkm3' },
            { id: 104, name: 'Pkm4' }, { id: 105, name: 'Pkm5' }, { id: 106, name: 'Pkm6' }
        ]}
    ];

    beforeEach(() => {
        // Interceptez l'appel initial pour les Pokemons si votre page d'accueil les charge par défaut
        cy.intercept('GET', `${API_BASE_URL}/pokemons`, {
            statusCode: 200,
            body: mockPokemons,
        }).as('getPokemons');

        // Visitez la page d'accueil de votre front-end
        // Assurez-vous que cela charge le contenu initial (par exemple, le pokedex)
        cy.visit('/'); 
        cy.wait('@getPokemons'); // Attendez que les Pokemons initiaux soient chargés
    });

    // --- Tests de navigation et affichage initial ---

    it('devrait afficher la page Pokedex par défaut et les cartes Pokémon', () => {
        cy.url().should('include', '/front/index.html'); // Vérifiez l'URL du front-end
        cy.get('#app .card').should('have.length', mockPokemons.length);
        cy.contains('Bulbasaur').should('be.visible');
        cy.contains('Charmander').should('be.visible');
    });

    it('devrait naviguer vers la section "Équipes" et afficher les cartes des équipes', () => {
        // Interceptez l'appel pour les équipes lorsque le lien est cliqué
        cy.intercept('GET', `${API_BASE_URL}/teams`, {
            statusCode: 200,
            body: mockTeams,
        }).as('getTeams');

        cy.get('#nav-item-team').click(); // Cliquez sur le lien 'Équipes'

        cy.wait('@getTeams'); // Attendez que la requête API pour les équipes soit terminée

        // Vérifiez l'affichage des cartes d'équipe
        cy.get('#app section.card').should('have.length', mockTeams.length);
        cy.contains('Team Alpha').should('be.visible');
        cy.contains('Team Beta').should('be.visible');
        cy.contains('Une super équipe').should('be.visible');
    });

    // --- Tests de la modale de détail Pokémon ---

    it('devrait ouvrir la modale de détail Pokémon lors du clic sur une carte', () => {
        const pokemonToTest = mockPokemons[0]; // Bulbasaur

        cy.intercept('GET', `${API_BASE_URL}/pokemons/${pokemonToTest.id}`, {
            statusCode: 200,
            body: pokemonToTest,
        }).as('getSinglePokemon');

        cy.intercept('GET', `${API_BASE_URL}/teams`, { // Nécessaire car `fetchAndInsertTeam` est appelée dans `openPokemonModal`
            statusCode: 200,
            body: mockTeams,
        }).as('getTeamsForModal');

        // Cliquez sur la carte Bulbasaur (assurez-vous d'avoir un sélecteur fiable)
        cy.get(`.card[data-id="${pokemonToTest.id}"]`).click();

        cy.wait('@getSinglePokemon');
        cy.wait('@getTeamsForModal'); // Attendre le chargement des équipes pour le select

        cy.get('#pkm_detail').should('have.class', 'is-active'); // La modale doit être active
        cy.get('#pkm_detail .modal-card-title').should('contain', pokemonToTest.name);
        cy.get('.pokemon-hp').should('contain', pokemonToTest.hp);
        // Vérifiez que le select d'équipe est rempli
        cy.get('#form_add_pkm_team select option').should('have.length', mockTeams.length);
        cy.get('#form_add_pkm_team select option:nth-child(1)').should('contain', mockTeams[0].name);
    });

    it('devrait fermer la modale de détail Pokémon', () => {
        const pokemonToTest = mockPokemons[0]; 

        cy.intercept('GET', `${API_BASE_URL}/pokemons/${pokemonToTest.id}`, {
            statusCode: 200,
            body: pokemonToTest,
        }).as('getSinglePokemon');

        cy.intercept('GET', `${API_BASE_URL}/teams`, { 
            statusCode: 200,
            body: mockTeams,
        }).as('getTeamsForModal');

        cy.get(`.card[data-id="${pokemonToTest.id}"]`).click();
        cy.wait(['@getSinglePokemon', '@getTeamsForModal']);

        cy.get('#pkm_detail').should('have.class', 'is-active');
        
        // Cliquez sur le bouton de fermeture
        cy.get('#pkm_detail .close').first().click(); // Il y a plusieurs boutons '.close', prendre le premier ou le plus spécifique

        cy.get('#pkm_detail').should('not.have.class', 'is-active'); // La modale doit être fermée
    });

    // --- Tests d'ajout de Pokémon à une équipe via la modale ---

    it('devrait ajouter un Pokémon à une équipe et fermer la modale', () => {
        const teamToAdd = mockTeams[1]; // Team Beta (vide initialement)
        const pokemonToAddToTeam = mockPokemons[2]; // Squirtle

        // Interceptions initiales pour l'ouverture de la modale
        cy.intercept('GET', `${API_BASE_URL}/pokemons/${pokemonToAddToTeam.id}`, {
            statusCode: 200,
            body: pokemonToAddToTeam,
        }).as('getSinglePokemonForAdd');

        cy.intercept('GET', `${API_BASE_URL}/teams`, { 
            statusCode: 200,
            body: mockTeams, // La liste des équipes pour le select
        }).as('getTeamsForAdd');

        // Interception de la requête PUT pour l'ajout
        cy.intercept('PUT', `${API_BASE_URL}/teams/${teamToAdd.id}/pokemons/${pokemonToAddToTeam.id}`, {
            statusCode: 200,
            body: { message: "Pokemon added to the team", team: teamToAdd, pokemon: pokemonToAddToTeam },
        }).as('addPokemonToTeam');

        // Ouvrez la modale du Pokémon (par exemple, en cliquant sur Squirtle)
        cy.get(`.card[data-id="${pokemonToAddToTeam.id}"]`).click();
        cy.wait(['@getSinglePokemonForAdd', '@getTeamsForAdd']);

        cy.get('#pkm_detail').should('have.class', 'is-active');

        // Sélectionnez l'équipe dans la liste déroulante
        // Note: Vous devrez peut-être ajouter un `data-cy` à votre select pour un sélecteur plus robuste.
        cy.get('#form_add_pkm_team select').select(String(teamToAdd.id)); // Sélectionne l'option par sa valeur (l'ID de l'équipe)

        // Cliquez sur le bouton "Ajouter à l'équipe"
        cy.get('.btn_add_team').click();

        cy.wait('@addPokemonToTeam'); // Attendre la requête PUT

        // Vérifier que la modale est fermée après l'ajout
        cy.get('#pkm_detail').should('not.have.class', 'is-active');
    });

    // --- Tests d'ajout d'équipe ---

    it('devrait ouvrir la modale d\'ajout d\'équipe', () => {
        cy.get('#nav-item-add-team').click(); // Cliquer sur le lien "Ajouter une équipe"
        cy.get('#add_team_modal').should('have.class', 'is-active');
        cy.get('#add_team_modal .modal-card-title').should('contain', 'Ajouter une équipe');
    });

    it('devrait créer une nouvelle équipe via le formulaire', () => {
        const newTeamName = 'Ma Nouvelle Équipe';
        const newTeamDescription = 'Description de ma nouvelle équipe';
        const createdTeam = { id: 13, name: newTeamName, description: newTeamDescription, pokemons: [] };

        // Intercepter la requête POST pour créer l'équipe
        cy.intercept('POST', `${API_BASE_URL}/teams`, {
            statusCode: 201,
            body: createdTeam,
        }).as('createTeam');

        // Intercepter la requête GET pour recharger les équipes après l'ajout
        cy.intercept('GET', `${API_BASE_URL}/teams`, {
            statusCode: 200,
            body: [...mockTeams, createdTeam], // Simuler la liste mise à jour
        }).as('getTeamsAfterCreate');

        cy.get('#nav-item-add-team').click(); // Ouvrir la modale
        cy.get('#add_team_modal').should('have.class', 'is-active');

        // Remplir le formulaire
        cy.get('#form_team_modal input[name="name"]').type(newTeamName);
        cy.get('#form_team_modal input[name="description"]').type(newTeamDescription);
        cy.get('#form_team_modal .button[type="submit"]').click();

        cy.wait('@createTeam').its('request.body').should('deep.equal', {
            name: newTeamName,
            description: newTeamDescription
        });
        cy.wait('@getTeamsAfterCreate'); // Attendre le rechargement des équipes

        // Vérifier que la modale est fermée
        cy.get('#add_team_modal').should('not.have.class', 'is-active');
        // Vérifier que la nouvelle équipe est affichée (en naviguant sur la page des équipes)
        cy.get('#nav-item-team').click(); // Re-cliquer pour s'assurer d'être sur la bonne vue
        cy.wait('@getTeamsAfterCreate'); // Attendre à nouveau le chargement des équipes
        cy.contains(newTeamName).should('be.visible');
        cy.contains(newTeamDescription).should('be.visible');
    });

    // --- Test de la recherche ---

    it('devrait afficher un Pokémon spécifique via la barre de recherche', () => {
        const pokemonToSearch = mockPokemons[3]; // Pikachu

        // Intercepter la requête de recherche par terme
        cy.intercept('GET', `${API_BASE_URL}/pokemons?search=Pikachu`, {
            statusCode: 200,
            body: [pokemonToSearch], // La recherche renvoie un tableau de résultats
        }).as('searchPokemon');

        // Intercepter la requête pour le détail du Pokémon (appelée par openPokemonModalBySearchTerm)
        cy.intercept('GET', `${API_BASE_URL}/pokemons/${pokemonToSearch.id}`, {
            statusCode: 200,
            body: pokemonToSearch,
        }).as('getSearchedPokemonDetail');

        cy.intercept('GET', `${API_BASE_URL}/teams`, { // pour le select dans la modale
            statusCode: 200,
            body: mockTeams,
        }).as('getTeamsForSearchModal');


        // Entrez le terme de recherche et soumettez le formulaire
        cy.get('#search-form input[name="search"]').type(pokemonToSearch.name);
        cy.get('#search-form button[type="submit"]').click();

        cy.wait('@searchPokemon');
        cy.wait('@getSearchedPokemonDetail'); // Attendre l'ouverture de la modale de détail
        cy.wait('@getTeamsForSearchModal');

        // Vérifier que la modale du Pokémon est ouverte et affiche le bon Pokémon
        cy.get('#pkm_detail').should('have.class', 'is-active');
        cy.get('#pkm_detail .modal-card-title').should('contain', pokemonToSearch.name);
    });

    // Vous pouvez ajouter des tests pour :
    // - L'administration d'une équipe (ouverture de la modale équipe, modification, suppression)
    // - La suppression d'un Pokémon d'une équipe
    // - Les messages d'erreur si l'API renvoie 400/500
});