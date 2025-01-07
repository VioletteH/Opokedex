import { Type, Pokemon } from "../models/relations.js";

const typeController = {

    async displayTypes(req, res, next){
        try {
            const types = await Type.findAll();
            res.status(200).json(types);
        } catch (error) {
            next(error);
        };
    },

    async displayPokemonsByType(req, res, next){
        try {
            const typeId = req.params.id
            const pokemons = await Pokemon.findAll({
                  include: [{ model: Type, as: "types", where: { id: typeId } }]
            });
            res.status(200).json(pokemons);
        } catch (error) {
            next(error);
        };
    }
};

export default typeController;