import {getTypes, getPokemonsByType} from "./api/type.api.js";
import {insertPokemonCard} from "./pokemon.js";

export function insertTypeButton(types) {
    try{
      const container = document.querySelector('.container');

      const buttonsContainer = document.createElement("div");
      buttonsContainer.classList.add("buttons-container");
      container.append(buttonsContainer);

      const cardsContainer = document.createElement("div");
      cardsContainer.classList.add("cards-container");
      container.append(cardsContainer);

      buttonsContainer.style.display = "flex"; 
      buttonsContainer.style.flexWrap = "wrap"; 

      cardsContainer.style.display = "flex"; 
      cardsContainer.style.flexWrap = "wrap"; 
      cardsContainer.style.justifyContent = "space-between"; 

      const typeButtonTemplate = document.querySelector('.type-button-template');
      types.forEach((type) => {
        const cloneTypeButton = typeButtonTemplate.content.cloneNode(true);
        
        const typeButton = cloneTypeButton.querySelector("button");
        typeButton.dataset.id = type.id;
        typeButton.style.backgroundColor = `#${type.color}`;
        typeButton.textContent = type.name;

        typeButton.addEventListener("click", () => {
          cardsContainer.innerHTML = '';
          fetchAndInsertPokemonCardByType(typeButton, cardsContainer);
        });

        buttonsContainer.appendChild(cloneTypeButton);
      });
    }catch(error) {
      console.error(error.message);
    }
}
    
export async function fetchAndInsertTypeButton() {
    try{
      const types = await getTypes();
      insertTypeButton(types);
    }catch (error) {
        console.error(error.message);
    }
  };

  export async function fetchAndInsertPokemonCardByType(typeButton, container) {
    try{
      const typeId = typeButton.dataset.id;
      const pokemons = await getPokemonsByType(typeId);

      for (let pokemon of pokemons){
        insertPokemonCard(pokemon, container);
      }
      
    }catch (error) {
        console.error(error.message);
    }
    
  }