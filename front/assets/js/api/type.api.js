const apiBaseUrl = "http://localhost:3000";

export const getTypes = async () => {
    try{
        const response = await fetch(`${apiBaseUrl}/types`);
        if (!response.ok) return null;
        const types = await response.json();      
        return types; 
    }catch(error){
        console.error(error);
        throw new Error("Base de données indisponible");
    }
};

export const getPokemonsByType = async (id) => {
    try{
        const response = await fetch(`${apiBaseUrl}/types/${id}`);
        if (!response.ok) return null;
        const pokemonsByType = await response.json();      
        return pokemonsByType; 
    }catch(error){
        console.error(error);
        throw new Error("Base de données indisponible");
    }
};