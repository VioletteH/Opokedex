import express from "express";
import homeController from "../controllers/homeController.js";
import typeController from "../controllers/typeController.js";
import teamController from "../controllers/teamController.js";

const router = express.Router();

router.get("/pokemons", homeController.displayPokemons);
router.get("/pokemons/:id", homeController.displayPokemon);
router.get("/types", typeController.displayTypes);
router.get("/types/:id", typeController.displayPokemonsByType);
router.get("/teams", teamController.displayTeams);
router.get("/teams/:id", teamController.displayPokemonsByTeam);
router.post("/teams", teamController.createTeam);
router.patch("/teams/:id", teamController.updateTeam);
router.delete("/teams/:id", teamController.deleteTeam);
router.put("/teams/:teamid/pokemons/:pokemonid", teamController.updatePokemonInTeam);
router.delete("/teams/:teamid/pokemons/:pokemonid", teamController.deletePokemonFromTeam);

export default router;
