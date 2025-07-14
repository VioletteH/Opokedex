import request from "supertest";
import app from "../index.js"; 
import { Team, Pokemon } from '../app/models/relations.js'; 

describe("GET /teams", () => {
  it("doit retourner un tableau d'équipes", async () => {
    const response = await request(app).get("/teams");
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThanOrEqual(0);
  });
});

describe("GET /teams/:id", () => {
    it("doit retourner une équipe existante", async () => {
      const res = await request(app).get("/teams/1");
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true); 
      expect(res.body.length).toBeGreaterThan(0);
    });
  
    it("doit retourner 404 pour une équipe inexistant", async () => {
      const res = await request(app).get("/teams/9999");
      expect(res.statusCode).toBe(404);
    });
  });

describe("POST /teams", () => {

    let createdTeamId; 

    it("doit créer une nouvelle équipe avec des données valides et retourner un statut 201", async () => {
        const newTeamData = { name: `Team_Jest_${Date.now()}`, description: 'Une équipe créée pour les tests Supertest.' };
        const response = await request(app)
            .post("/teams")
            .send(newTeamData);

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty("id");
        expect(response.body.name).toBe(newTeamData.name);
        expect(response.body.description).toBe(newTeamData.description);

        createdTeamId = response.body.id; 
    });

    it("doit retourner 400 pour la création d'équipe avec un nom manquant", async () => {
        const invalidTeamData = { description: 'Description sans nom.' };
        const response = await request(app)
            .post("/teams")
            .send(invalidTeamData);

        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("message", "Validation error: The provided data is invalid.");
        expect(response.body.details).toEqual(expect.arrayContaining([
            expect.objectContaining({ field: 'name' }) // Vérifie que l'erreur concerne le champ 'name'
        ]));
    });

    it("doit retourner 400 pour la création d'équipe avec un nom trop court", async () => {
        const invalidTeamData = { name: 'A', description: 'Nom trop court.' };
        const response = await request(app)
            .post("/teams")
            .send(invalidTeamData);

        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("message", "Validation error: The provided data is invalid.");
        expect(response.body.details).toEqual(expect.arrayContaining([
            expect.objectContaining({ field: 'name' })
        ]));
    });

    // Optionnel : Nettoyage de la team créée dans cette suite de tests
    afterAll(async () => {
        if (createdTeamId) {
            const team = await Team.findByPk(createdTeamId);
            if (team) {
                await team.setPokemons([]); // Dissocier les Pokemons avant de supprimer l'équipe
                await team.destroy();
            }
        }
    });
});

describe("PATCH /teams/:id", () => {
    
    let testTeam;

    beforeAll(async () => {
        // Crée une équipe spécifique pour cette suite de tests
        testTeam = await Team.create({ name: 'Team_Update_Test', description: 'Une équipe à mettre à jour.' });    });

    it("doit mettre à jour une équipe existante et retourner un statut 201", async () => {
        const updatedData = { name: 'Team_Updated', description: 'Description mise à jour.' };
        const response = await request(app)
            .patch(`/teams/${testTeam.id}`)
            .send(updatedData);

        expect(response.statusCode).toBe(201);
        expect(response.body.id).toBe(testTeam.id);
        expect(response.body.name).toBe(updatedData.name);
        expect(response.body.description).toBe(updatedData.description);
    });

    it("doit retourner 404 si l'équipe à mettre à jour n'existe pas", async () => {
        const response = await request(app)
            .patch("/teams/9999") 
            .send({ name: 'Inexistant' });
        expect(response.statusCode).toBe(404);
        expect(response.body).toHaveProperty("error", "Team not found");
    });

    it("doit retourner 400 pour la mise à jour d'équipe avec un nom invalide", async () => {
        const invalidData = { name: '' }; 
        const response = await request(app)
            .patch(`/teams/${testTeam.id}`)
            .send(invalidData);
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("message", "Validation error: The provided data is invalid.");
        expect(response.body.details).toEqual(expect.arrayContaining([
            expect.objectContaining({ field: 'name' })
        ]));
    });

    // Optionnel : Nettoyage de la team créée pour cette suite de tests
    afterAll(async () => {
        if (testTeam) {
            await testTeam.destroy();
        }
    });
});

describe("DELETE /teams/:id", () => {

    let teamToDelete;
    let pokemonForTeam;

    beforeEach(async () => {
        // Crée une nouvelle équipe et un Pokemon associé pour chaque test de suppression
        teamToDelete = await Team.create({ name: 'Team_Delete_Me', description: 'Team to be deleted' });
        pokemonForTeam = await Pokemon.create({ 
            name: `PkmForTeam_${Date.now()}`, 
            hp: 10, 
            atk: 10, 
            def: 10, 
            atk_spe: 10, 
            def_spe: 10, 
            speed: 10
        });
        await teamToDelete.addPokemon(pokemonForTeam);
    });

    it("doit supprimer une équipe existante et retourner un statut 201", async () => {
        const response = await request(app).delete(`/teams/${teamToDelete.id}`);

        expect(response.statusCode).toBe(201);
        expect(response.body.id).toBe(teamToDelete.id);

        // Vérifier que l'équipe n'existe plus dans la DB
        const deletedTeamInDb = await Team.findByPk(teamToDelete.id);
        expect(deletedTeamInDb).toBeNull();

        // Vérifier que le Pokémon n'est plus associé à cette équipe (mais peut exister toujours si non détruit en cascade)
        const pokemonStillExists = await Pokemon.findByPk(pokemonForTeam.id);
        expect(pokemonStillExists).not.toBeNull(); // Le Pokemon est toujours là, juste plus associé à l'équipe
    });

    it("doit retourner 404 si l'équipe à supprimer n'existe pas", async () => {
        const response = await request(app).delete("/teams/9999"); 

        expect(response.statusCode).toBe(404);
        expect(response.body).toHaveProperty("error", "Team not found");
    });

    afterEach(async () => {
        console.log(`[AfterEach] Nettoyage pour teamToDelete ID: ${teamToDelete.id}`);

        const existingTeam = await Team.findByPk(teamToDelete.id);         
        if (existingTeam) {
            await existingTeam.removePokemon(pokemonForTeam);
            await existingTeam.destroy();
        }

        const existingPokemon = await Pokemon.findByPk(pokemonForTeam.id);
        if (existingPokemon) {
            await existingPokemon.destroy();
        } 
    });
});

describe("PUT /teams/:teamid/pokemons/:pokemonid (Add Pokemon to Team) - Concise Version", () => {
    let testTeam, testPokemon, teamFull, pokemonNotInTeam;

    beforeAll(async () => {
        testTeam = await Team.create({ name: 'Concise_Test_Team' });
        testPokemon = await Pokemon.create({ 
            name: 'Concise_Pkm', 
            hp: 10, atk: 10, def: 10, atk_spe: 10, def_spe: 10, speed: 10, 
        });
        
        pokemonNotInTeam = await Pokemon.create({
            name: 'New_Pkm_For_Add',
            hp: 20, atk: 20, def: 20, atk_spe: 20, def_spe: 20, speed: 20,
        });

        teamFull = await Team.create({ name: 'Concise_Full_Team' });
        for (let i = 1; i <= 6; i++) {
            const pkm = await Pokemon.create({ 
                name: `Full_Pkm_${i}`, 
                hp: 1, atk: 1, def: 1, atk_spe: 1, def_spe: 1, speed: 1, 
            });
            await teamFull.addPokemon(pkm);
        }
    });

    // Nettoyage de toutes les données créées par beforeAll
    afterAll(async () => {
        if (testTeam) {
            await testTeam.setPokemons([]);
            await testTeam.destroy();
        }
        if (teamFull) {
            const fullTeamPokemons = await teamFull.getPokemons();
            await teamFull.setPokemons([]); // Dissocier tous les Pokémons
            await teamFull.destroy();
            for (const pkm of fullTeamPokemons) {
                await pkm.destroy();
            }
        }
        
        if (testPokemon) await testPokemon.destroy();
        if (pokemonNotInTeam) await pokemonNotInTeam.destroy();
    });

    // Chaque test "it" devrait être isolé et ne pas dépendre des modifications des autres "it".
    // Si un test modifie l'état (ex: ajoute un Pokémon), utilisez beforeEach/afterEach
    // ou assurez-vous que les données sont isolées.
    // Pour ce cas, comme le "succès" modifie testTeam, il faut le re-créer ou le nettoyer
    // pour que les autres tests utilisant testTeam commencent avec un état connu.

    // On va utiliser beforeEach pour s'assurer que testTeam est toujours vide au début des tests pertinents.
    let freshTeam; // Une équipe fraîche pour chaque test qui la modifie

    beforeEach(async () => {
        // Créer une nouvelle équipe vide pour les tests qui ajoutent/vérifient son contenu
        freshTeam = await Team.create({ name: `Fresh_Team_${Date.now()}` });
    });

    afterEach(async () => {
        // Nettoyer la freshTeam après chaque test qui l'a utilisée
        if (freshTeam) {
            await freshTeam.setPokemons([]);
            await freshTeam.destroy();
        }
    });


    // SCÉNARIO 1 : Succès - Ajouter un Pokémon à une équipe vide
    it("doit ajouter un Pokemon à une équipe et retourner un statut 200", async () => {
        const response = await request(app)
            .put(`/teams/${freshTeam.id}/pokemons/${testPokemon.id}`);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("message", "Pokemon added to the team");
        expect(response.body.team.id).toBe(freshTeam.id);
        expect(response.body.pokemon.id).toBe(testPokemon.id);

        const updatedTeam = await Team.findByPk(freshTeam.id, {
            include: { model: Pokemon, as: 'pokemons' }
        });
        expect(updatedTeam.pokemons).toEqual(expect.arrayContaining([
            expect.objectContaining({ id: testPokemon.id })
        ]));
        expect(updatedTeam.pokemons.length).toBe(1);
    });

    // SCÉNARIO 2 : Échec - Équipe non trouvée
    it("doit retourner 404 si l'équipe n'existe pas", async () => {
        const nonExistentTeamId = 999999;
        const response = await request(app)
            .put(`/teams/${nonExistentTeamId}/pokemons/${testPokemon.id}`);

        expect(response.statusCode).toBe(404);
        expect(response.body).toHaveProperty("message", "Team not found.");
    });

    // SCÉNARIO 3 : Échec - Pokémon non trouvé
    it("doit retourner 404 si le Pokemon n'existe pas", async () => {
        const nonExistentPokemonId = 888888;
        const response = await request(app)
            .put(`/teams/${freshTeam.id}/pokemons/${nonExistentPokemonId}`);

        expect(response.statusCode).toBe(404);
        expect(response.body).toHaveProperty("message", "Pokemon not found.");
    });

    // SCÉNARIO 4 : Échec - Pokémon déjà dans l'équipe
    it("doit retourner 400 si le Pokemon est déjà dans l'équipe", async () => {
        // Pour ce test, nous devons ajouter un Pokémon à freshTeam avant l'appel API
        await freshTeam.addPokemon(testPokemon); 

        const response = await request(app)
            .put(`/teams/${freshTeam.id}/pokemons/${testPokemon.id}`);

        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("message", "This pokemon is already in the team");

        const currentTeam = await Team.findByPk(freshTeam.id, {
            include: { model: Pokemon, as: 'pokemons' }
        });
        expect(currentTeam.pokemons.length).toBe(1); // Toujours 1, pas d'ajout en doublon
    });

    // SCÉNARIO 5 : Échec - Équipe déjà pleine (6 Pokemons)
    it("doit retourner 400 si l'équipe a déjà 6 Pokemons", async () => {
        // teamFull est créée et remplie dans beforeAll
        const response = await request(app)
            .put(`/teams/${teamFull.id}/pokemons/${pokemonNotInTeam.id}`); // Tente d'ajouter un nouveau Pokémon

        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("message", "This team already has 6 pokemons");

        const currentTeam = await Team.findByPk(teamFull.id, {
            include: { model: Pokemon, as: 'pokemons' }
        });
        expect(currentTeam.pokemons.length).toBe(6); // Toujours 6
    });
});

describe("DELETE /teams/:teamid/pokemons/:pokemonid", () => {
    let team, pokemonToRemove, otherPokemon;

    beforeEach(async () => {
        // Crée une équipe et des Pokemons pour chaque test de cette suite
        team = await Team.create({ name: `Team_RemovePkm_${Date.now()}` });
        pokemonToRemove = await Pokemon.create({ name: `RemovePkm_${Date.now()}`, hp: 10, atk: 10, def: 10, atk_spe: 10, def_spe: 10, speed: 10 });
        otherPokemon = await Pokemon.create({ name: `OtherPkm_${Date.now()}`, hp: 10, atk: 10, def: 10, atk_spe: 10, def_spe: 10, speed: 10 });

        await team.addPokemon(pokemonToRemove);
        await team.addPokemon(otherPokemon);
    });

    afterEach(async () => {
        // Nettoyage après chaque test
        if (team) {
            await team.setPokemons([]);
            await team.destroy();
        }
        if (pokemonToRemove) await pokemonToRemove.destroy();
        if (otherPokemon) await otherPokemon.destroy();
    });

    it("doit retirer un Pokemon de l'équipe et retourner un statut 200", async () => {
        const response = await request(app).delete(`/teams/${team.id}/pokemons/${pokemonToRemove.id}`);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message', 'Pokemon removed from the team');
        expect(response.body.team.id).toBe(team.id);
        expect(response.body.pokemon.id).toBe(pokemonToRemove.id);

        // Vérification en DB
        const updatedTeam = await Team.findByPk(team.id);
        const pokemonsInTeam = await updatedTeam.getPokemons();
        expect(pokemonsInTeam.some(p => p.id === pokemonToRemove.id)).toBe(false); // Doit être retiré
        expect(pokemonsInTeam.some(p => p.id === otherPokemon.id)).toBe(true); // L'autre doit rester
    });

    it("doit retourner 404 si l'équipe n'est pas trouvée", async () => {
        const response = await request(app).delete(`/teams/999999/pokemons/${pokemonToRemove.id}`);

        expect(response.statusCode).toBe(404);
        expect(response.body).toHaveProperty('message', 'Team not found');
    });

    it("doit retourner 404 si le Pokemon n'est pas trouvé", async () => {
        const response = await request(app).delete(`/teams/${team.id}/pokemons/999999`);

        expect(response.statusCode).toBe(404);
        expect(response.body).toHaveProperty('message', 'Pokemon not found');
    });

    it("doit retourner 400 si le Pokemon n'est pas dans l'équipe", async () => {
        // Retirer le Pokemon avant le test pour simuler le cas où il n'est pas là
        await team.removePokemon(pokemonToRemove);

        const response = await request(app).delete(`/teams/${team.id}/pokemons/${pokemonToRemove.id}`);

        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('message', 'This pokemon is not in the team');
    });
});