import { Pokemon } from "../models/pokemonModel.js";
import { Op } from 'sequelize';

const homeController = {

    async displayPokemons(req, res, next){
        const query = req.query.searchTerm;
        if(query){
            const pokemons = await Pokemon.findAll({where: { name: {[Op.iLike]: `%${query}%`}}});
            res.status(200).json(pokemons);
        }else{
            const pokemons = await Pokemon.findAll();
            res.status(200).json(pokemons);
        }
    },

    async displayPokemon(req, res, next){
        const id = req.params.id;
        const pokemon = await Pokemon.findByPk(id);

        if (!pokemon) {
            return res.status(404).json({ error: `Pokémon avec l'ID ${id} non trouvé.` });
        }

        res.status(200).json(pokemon);
    }
};

export default homeController;