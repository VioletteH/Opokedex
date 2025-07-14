import { Team, Pokemon, Type } from "../models/relations.js";

const teamController = {

    async displayTeams(req, res, next){
        const teams = await Team.findAll();
        res.status(200).json(teams);
    }, 

    async displayPokemonsByTeam(req, res, next){
        const teamId = req.params.id

        const team = await Team.findByPk(teamId);

        if (!team) {
            return res.status(404).json({ error: `Type avec l'ID ${teamId} non trouvé.` });
        }

        const pokemons = await Pokemon.findAll({
            include: [{ model: Team, as: "teams", where: { id: teamId } }, { model: Type, as: "types" }]
        });
        res.status(200).json(pokemons);
    },

    async createTeam(req, res, next){
        const team = await Team.create(req.body);
        res.status(201).json(team);
    },

    async updateTeam(req, res, next){
        const teamId = req.params.id;

        const team = await Team.findByPk(teamId);
        if (!team) {
            console.log(`[Controller - updateTeam] Team ${teamId} non trouvée, renvoi 404.`);
            return res.status(404).json({ error: "Team not found" });
        }

        await team.update(req.body);
        res.status(201).json(team);
    },

    async deleteTeam(req, res, next){
        const teamId = req.params.id;
        const team = await Team.findByPk(teamId);

        if (!team) {
            return res.status(404).json({ error: "Team not found" });
        }

        await team.setPokemons([]);  
        await team.destroy(); 
        res.status(201).json(team);
    },

    async updatePokemonInTeam(req, res, next){
        const teamId = req.params.teamid;
        const pokemonId = req.params.pokemonid;

        const team = await Team.findByPk(teamId, {
            include: {
                model: Pokemon,
                as: 'pokemons' // Le nom de l'alias de votre association dans le modèle Team
            }
        });
        if (!team) {
            res.status(404).json({ message: "Team not found." });
            return;
        }

        const pokemon = await Pokemon.findByPk(pokemonId);
        if (!pokemon) {
            res.status(404).json({ message: "Pokemon not found." });
            return;
        }

        if (team.pokemons.length >= 6) { 
            res.status(400).json({ message: "This team already has 6 pokemons" });
            return;
        }

        const isPokemonAlreadyInTeam = team.pokemons.some(p => p.id === pokemon.id);

        if (isPokemonAlreadyInTeam) {
            res.status(400).json({ message: "This pokemon is already in the team" });
            return;
        }
        await team.addPokemon(pokemon);

        // const isPokemonInTeam = await team.hasPokemon(pokemon);
        // const teamPokemons = await team.getPokemons();
        // if(isPokemonInTeam){
        //     res.status(400).json({ message: "This pokemon is already in the team" });
        //     return;
        // }else if(teamPokemons.length > 6){
        //     res.status(400).json({ message: "This team already has 6 pokemons" });
        //     return;
        // }else{
        //     await team.addPokemon(pokemon);
        // }
        res.status(200).json({message : "Pokemon added to the team", team, pokemon});
    },

    async removePokemonFromTeam(req, res, next){
        const teamId = req.params.teamid;
        const pokemonId = req.params.pokemonid;

        const team = await Team.findByPk(teamId);
        if (!team) {
            return res.status(404).json({ message: "Team not found" });
        }

        const pokemon = await Pokemon.findByPk(pokemonId);
        if (!pokemon) {
            return res.status(404).json({ message: "Pokemon not found" });
        }

        const isPokemonInTeam = await team.hasPokemon(pokemon);
        if(!isPokemonInTeam){
            res.status(400).json({ message: "This pokemon is not in the team" });
            return;
        }else{
            await team.removePokemon(pokemon);
        }
        res.status(200).json({message : "Pokemon removed from the team", team, pokemon});
    }
};

export default teamController;