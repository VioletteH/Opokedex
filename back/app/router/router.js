import express from "express";
import homeController from "../controllers/homeController.js";
import typeController from "../controllers/typeController.js";

const router = express.Router();

router.get("/pokemons", homeController.displayPokemons);
router.get("/pokemons/:id", homeController.displayPokemon);
router.get("/types", typeController.displayTypes);
router.get("/types/:id", typeController.displayPokemonsByType);

export default router;
