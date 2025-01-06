import * as pokemon from "./assets/js/pokemon.js";

document.addEventListener("DOMContentLoaded", init);

async function init() {
  await pokemon.fetchAndInsertPokemonCard();

  const pokemonModal = document.querySelector("");
  // const pokemonCard = document.querySelector("");
  // pokemonCard.addEventListener("click", () => {
  //   pokemonModal.classList.add("is-active");
  // });

}

