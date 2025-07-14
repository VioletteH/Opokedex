import { Type, Pokemon } from "../models/relations.js";

const typeController = {

    async displayTypes(req, res, next){
        const types = await Type.findAll();
        res.status(200).json(types);
    },

    async displayPokemonsByType(req, res, next){
        const typeId = req.params.id
        const type = await Type.findByPk(typeId);

        if (!type) {
            return res.status(404).json({ error: `Type avec l'ID ${typeId} non trouvé.` });
        }

        const pokemons = await Pokemon.findAll({
                include: [{ model: Type, as: "types", where: { id: typeId } }]
        });
        res.status(200).json(pokemons);
    }
};

export default typeController;