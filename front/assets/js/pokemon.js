export function insertPokemonCard(pokemon) {
    try{
      const pokemonCardTemplate = document.querySelector('.card-template');
      const newPokemonCard = pokemonCardTemplate.content.cloneNode(true);
  
      newPokemonCard.querySelector('.card').dataset.id = pokemon.id;
      newPokemonCard.querySelector('.card-image .pkm_img').src = `./assets/img/${pokemon.id}.webp`;
      newPokemonCard.querySelector('.card-content p').textContent = pokemon.name;
    
      document.querySelector('.container').append(newPokemonCard);
    }catch(error) {
      alert(error.message);
    }
}
    
export async function fetchAndInsertPokemonCard() {
    try {
      const response = await fetch ("http://localhost:3000/pokemons");
      const pokemons = await response.json();
  
      for(let pokemon of pokemons){
        insertPokemonCard(pokemon);
      }
  
    } catch (error) {
      alert(error.message);
    }
  };

  export async function openPokemonModal() {
    try {
      const response = await fetch (`http://localhost:3000/pokemons/${id}`);
      const pokemon = await response.json();
  
    } catch (error) {
      alert(error.message);
    }
  };