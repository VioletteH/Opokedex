const apiBaseUrl = "http://localhost:3000";

export const getPokemons = async () => {
    try{
        const response = await fetch(`${apiBaseUrl}/pokemons`);
        if (!response.ok) return null;
        const pokemons = await response.json();      
        return pokemons; 
    }catch(error){
        console.error(error);
        throw new Error("Base de données indisponible");
    }
};

export const getPokemon = async (id) => {
    try{
        const response = await fetch(`${apiBaseUrl}/pokemons/${id}`);
        if (!response.ok) return null;
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
        const response = await fetch(`${apiBaseUrl}/pokemons?searchTerm=${name}`);
        if (!response.ok) return null;
        const pokemon = await response.json();     
        return pokemon[0]; 
    }catch(error){
        console.error(error);
        throw new Error("Base de données indisponible");
    }
};