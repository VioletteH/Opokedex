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
    }
};

export default teamController;