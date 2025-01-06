import * as pokemon from "./assets/js/pokemon.js";

document.addEventListener("DOMContentLoaded", init);

async function init() {
  await pokemon.fetchAndInsertPokemonCard();

  

}

