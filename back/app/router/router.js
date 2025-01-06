import express from "express";
import homeController from "../controllers/homeController.js";

const router = express.Router();

router.get("/pokemons", homeController.displayPokemons);
router.get("/pokemons/:id", homeController.displayPokemon);

export default router;
