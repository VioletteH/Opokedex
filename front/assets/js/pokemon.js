import {getPokemons, getPokemon} from "./api/pokemon.api.js";

export function insertPokemonCard(pokemon) {
    try{
      const cardTemplate = document.querySelector('.card-template');
      const cloneTemplate = cardTemplate.content.cloneNode(true);
  
      const pokemonCard = cloneTemplate.querySelector('.card');
      pokemonCard.dataset.id = pokemon.id;
      pokemonCard.querySelector('.card-image .pkm_img').src = `./assets/img/${pokemon.id}.webp`;
      pokemonCard.querySelector('.card-content p').textContent = pokemon.name;
    
      pokemonCard.addEventListener("click", () => {
        openPokemonModal(pokemonCard);
      });

      document.querySelector('.container').append(cloneTemplate);

    }catch(error) {
      console.error(error.message);
    }
}
    
export async function fetchAndInsertPokemonCard() {
    try {
      const pokemons = await getPokemons();
  
      for(let pokemon of pokemons){
        insertPokemonCard(pokemon);
      }
  
    } catch (error) {
      console.error(error.message);
    }
  };

export async function openPokemonModal(pokemonCard) {
    try {
        const pokemonModal = document.querySelector(".modal");
        pokemonModal.classList.add("is-active");

        const pokemonId = pokemonCard.dataset.id;
        const pokemon = await getPokemon(pokemonId);

        const pokemonModalName = document.querySelector(".modal-card-title");
        pokemonModalName.textContent = pokemon.name;

        const pokemonModalImg = document.querySelector(".pkm_img_modal");
        pokemonModalImg.src = `./assets/img/${pokemon.id}.webp`;

        const pokemonModalStatHp = document.querySelector(".progress-hp");
        pokemonModalStatHp.value = pokemon.hp;

        const pokemonModalStatAtk = document.querySelector(".progress-atk");
        pokemonModalStatAtk.value = pokemon.atk;

        const pokemonModalStatDef = document.querySelector(".progress-def");
        pokemonModalStatDef.value = pokemon.def;

        const pokemonModalStatAtkSpe = document.querySelector(".progress-atk-spe");
        pokemonModalStatAtkSpe.value = pokemon.atk_spe;

        const pokemonModalStatDefSpe = document.querySelector(".progress-def-spe");
        pokemonModalStatDefSpe.value = pokemon.def_spe;

        const pokemonModalStatSpeed = document.querySelector(".progress-speed");
        pokemonModalStatSpeed.value = pokemon.speed;
  
        const closeModal = document.querySelector("#pkm_detail .close");
        closeModal.addEventListener("click", () => {
            pokemonModal.classList.remove("is-active");
        });
    } catch (error) {
      console.error(error.message);
    }
};

