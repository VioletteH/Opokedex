export const getPokemons = async () => {
    try{
        const response = await fetch("http://localhost:3000/pokemons");
        const pokemons = await response.json();      
        return pokemons; 
    }catch(error){
        console.error(error);
        throw new Error("Base de données indisponible");
    }
};

export const getPokemon = async (id) => {
    try{
        const response = await fetch(`http://localhost:3000/pokemons/${id}`);
        const pokemon = await response.json();      
        return pokemon; 
    }catch(error){
        console.error(error);
        throw new Error("Base de données indisponible");
    }
};

export const getPokemonBySearchTerm = async () => {
    try{
        const name = document.getElementById("search").value;
        const response = await fetch(`http://localhost:3000/pokemons?searchTerm=${name}`);
        const pokemon = await response.json();     
        return pokemon[0]; 
    }catch(error){
        console.error(error);
        throw new Error("Base de données indisponible");
    }
};