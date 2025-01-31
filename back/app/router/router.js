import express from "express";
import homeController from "../controllers/homeController.js";
import typeController from "../controllers/typeController.js";
import teamController from "../controllers/teamController.js";
import controllerWrapper from "../controllers/utils/controllerWrapper.js";

const router = express.Router();

router.get("/pokemons", controllerWrapper(homeController.displayPokemons));
router.get("/pokemons/:id", controllerWrapper(homeController.displayPokemon));
router.get("/types", controllerWrapper(typeController.displayTypes));
router.get("/types/:id", controllerWrapper(typeController.displayPokemonsByType));
router.get("/teams", controllerWrapper(teamController.displayTeams));
router.get("/teams/:id", controllerWrapper(teamController.displayPokemonsByTeam));
router.post("/teams", controllerWrapper(teamController.createTeam));
router.patch("/teams/:id", controllerWrapper(teamController.updateTeam));
router.delete("/teams/:id", controllerWrapper(teamController.deleteTeam));
router.put("/teams/:teamid/pokemons/:pokemonid", controllerWrapper(teamController.updatePokemonInTeam));
router.delete("/teams/:teamid/pokemons/:pokemonid", controllerWrapper(teamController.removePokemonFromTeam));

export default router;
