import { Pokemon } from "./pokemonModel.js";
import { Type } from "./typeModel.js";
import { Team } from "./teamModel.js";

// pokemon - type MANY TO MANY
Pokemon.belongsToMany(Type, {
    through: "pokemon_type",
    foreignKey: "pokemon_id", // table en cours
    as: "types"
});
Type.belongsToMany(Pokemon, {
    through: "pokemon_type",
    foreignKey: "type_id",
    as: "pokemons"
});

// pokemon - team MANY TO MANY
Pokemon.belongsToMany(Team, {
    through: "team_pokemon",
    foreignKey: "pokemon_id"
});
Team.belongsToMany(Pokemon, {
    through: "team_pokemon",
    foreignKey: "team_id"
});

export { Pokemon, Type, Team };