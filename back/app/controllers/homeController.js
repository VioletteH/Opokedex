import { Pokemon } from "../models/pokemonModel.js";
import { Op } from 'sequelize';

const homeController = {

    async displayPokemons(req, res, next){
        try {
            const query = req.query.searchTerm;
            if(query){
                const pokemons = await Pokemon.findAll({where: { name: {[Op.iLike]: `%${query}%`}}});
                res.status(200).json(pokemons);
            }else{
                const pokemons = await Pokemon.findAll();
                res.status(200).json(pokemons);
            }
        } catch (error) {
            next(error);
        };
    },

    async displayPokemon(req, res, next){
        try {
            const id = req.params.id;
            const pokemon = await Pokemon.findByPk(id);
            res.status(200).json(pokemon);
        } catch (error) {
            next(error);
        };
    }
};

export default homeController;