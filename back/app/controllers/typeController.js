import { Type, Pokemon } from "../models/relations.js";

const typeController = {

    async displayTypes(req, res, next){
        const types = await Type.findAll();
        res.status(200).json(types);
    },

    async displayPokemonsByType(req, res, next){
        const typeId = req.params.id
        const pokemons = await Pokemon.findAll({
                include: [{ model: Type, as: "types", where: { id: typeId } }]
        });
        res.status(200).json(pokemons);
    }
};

export default typeController;