import { Team, Pokemon, Type } from "../models/relations.js";

const teamController = {

    async displayTeams(req, res, next){
        try {
            const teams = await Team.findAll();
            res.status(200).json(teams);
        } catch (error) {
            next(error);
        };
    }, 

    async displayPokemonsByTeam(req, res, next){
        try {
            const teamId = req.params.id
            const pokemons = await Pokemon.findAll({
                  include: [{ model: Team, as: "teams", where: { id: teamId } }, { model: Type, as: "types" }]
            });
            res.status(200).json(pokemons);
        } catch (error) {
            next(error);
        };
    },

    async createTeam(req, res, next){
        try {
            const team = await Team.create(req.body);
            res.status(201).json(team);
        } catch (error) {
            next(error);
        };
    },

    async updateTeam(req, res, next){
        try {
            const teamId = req.params.id;
            const team = await Team.findByPk(teamId);
            await team.update(req.body);
            res.status(201).json(team);
        } catch (error) {
            next(error);
        };
    },

    async deleteTeam(req, res, next){
        try {
            const teamId = req.params.id;
            const team = await Team.findByPk(teamId);

            await team.setPokemons([]);  // Dissocier tous les Pokémon de cette équipe

            await team.destroy(); 
            res.status(201).json(team);
        } catch (error) {
            next(error);
        };
    },

    async updatePokemonInTeam(req, res, next){
        try {
            const teamId = req.params.teamid;
            const pokemonId = req.params.pokemonid;
            const team = await Team.findByPk(teamId);
            const pokemon = await Pokemon.findByPk(pokemonId);

            const isPokemonInTeam = await team.hasPokemon(pokemon);

            if(isPokemonInTeam){
                res.status(400).json({ message: "This pokemon is already in the team" });
                return;
            }else{
                await team.addPokemon(pokemon);
            }

            res.status(200).json({message : "Pokemon added to the team", team, pokemon});
        } catch (error) {
            next(error);
        };
    },

    async deletePokemonFromTeam(req, res, next){
        try {
            const teamId = req.params.teamid;
            const pokemonId = req.params.pokemonid;
            const team = await Team.findByPk(teamId);
            const pokemon = await Pokemon.findByPk(pokemonId);

            const isPokemonInTeam = await team.hasPokemon(pokemon);

            if(!isPokemonInTeam){
                res.status(400).json({ message: "This pokemon is not in the team" });
                return;
            }else{
                await team.removePokemon(pokemon);
            }

            res.status(200).json({message : "Pokemon removed from the team", team, pokemon});
        } catch (error) {
            next(error);
        };
    }
};


export default teamController;