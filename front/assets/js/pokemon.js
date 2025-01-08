import {getPokemons, getPokemon} from "./api/pokemon.api.js";
import {getTeams, addPokemonInTeam} from "./api/team.api.js";

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
        const pokemonModal = document.querySelector("#pkm_detail");
        pokemonModal.classList.add("is-active");

        const pokemonId = pokemonCard.dataset.id;
        const pokemon = await getPokemon(pokemonId);

        document.querySelector(".modal-card-title").textContent = pokemon.name;
        document.querySelector(".pkm_img_modal").src = `./assets/img/${pokemon.id}.webp`;
        document.querySelector(".progress-hp").value = pokemon.hp;
        document.querySelector(".progress-atk").value = pokemon.atk;
        document.querySelector(".progress-def").value = pokemon.def;
        document.querySelector(".progress-atk-spe").value = pokemon.atk_spe;
        document.querySelector(".progress-def-spe").value = pokemon.def_spe;
        document.querySelector(".progress-speed").value = pokemon.speed;

        fetchAndInsertTeam();        
        addPokemonToTeam(pokemonId);

        const closeModal = document.querySelectorAll("#pkm_detail .close");
        for(let closebutton of closeModal){
          closebutton.addEventListener("click", () => {
              pokemonModal.classList.remove("is-active");
          });
        }

    } catch (error) {
      console.error(error.message);
    }
};

export async function fetchAndInsertTeam() {
  const teamSelect = document.querySelector("#form_add_pkm_team select"); 
  const originalTeamOption = document.querySelector("#form_add_pkm_team select option"); 
  originalTeamOption.remove();
  teamSelect.innerHTML = '';
  
  const teams = await getTeams();

  for(let team of teams){

    const clonedTeamOption = originalTeamOption.cloneNode(true);
    clonedTeamOption.value = team.id;
    clonedTeamOption.textContent = team.name;
    teamSelect.append(clonedTeamOption);
  };   
}

export async function addPokemonToTeam(pokemonId) {
  const teamSelect = document.querySelector("#form_add_pkm_team select"); 
  let teamId = teamSelect.value;

  teamSelect.addEventListener("change", function(e) {
    e.preventDefault();
    teamId = teamSelect.value;
  });

  const addPokemonButton = document.querySelector(".btn_add_team");
  addPokemonButton.addEventListener("click", async function(e) {
    e.preventDefault();
    await addPokemonInTeam(teamId, pokemonId);
    const pokemonModal = document.querySelector("#pkm_detail");
    pokemonModal.classList.remove("is-active");
  });

};   