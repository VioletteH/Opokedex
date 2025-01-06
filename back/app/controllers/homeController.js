import { Pokemon } from "../models/pokemonModel.js";

const homeController = {

    async displayPokemons(req, res, next){
        try {
            const pokemons = await Pokemon.findAll();
            res.json(pokemons);
        } catch (error) {
            next(error);
        };
    },

    async displayPokemon(req, res, next){
        try {
            const id = req.params.id
            const pokemon = await Pokemon.findByPk(id);
            res.json(pokemon);
        } catch (error) {
            next(error);
        };
    }
};

export default homeController;