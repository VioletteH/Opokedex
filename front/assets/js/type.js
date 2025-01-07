import {getTypes, getPokemonsByType} from "./api/type.api.js";
import {insertPokemonCard} from "./pokemon.js";

export function insertTypeButton(type) {
    try{
      const typeButtonTemplate = document.querySelector('.type-button-template');
      const cloneTypeButton = typeButtonTemplate.content.cloneNode(true);
  
      const typeButton = cloneTypeButton.querySelector("button");
      typeButton.dataset.id = type.id;
      typeButton.style.backgroundColor = `#${type.color}`;
      typeButton.textContent = type.name;

      typeButton.addEventListener("click", () => {
        fetchAndInsertPokemonCardByType(typeButton);
      });

      document.querySelector('.container').append(cloneTypeButton);

    }catch(error) {
      console.error(error.message);
    }
}
    
export async function fetchAndInsertTypeButton() {
    try {
      const types = await getTypes();
  
      for(let type of types){
        insertTypeButton(type);
      }
  
    } catch (error) {
        console.error(error.message);
    }
  };

  export async function fetchAndInsertPokemonCardByType(typeButton) {
    try {
      const typeId = typeButton.dataset.id;
      const pokemons = await getPokemonsByType(typeId);

      for (let pokemon of pokemons){
        insertPokemonCard(pokemon);
      }
      
    } catch (error) {
        console.error(error.message);
    }
    
  }