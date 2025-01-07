export const getTypes = async () => {
    try{
        const response = await fetch("http://localhost:3000/types");
        const types = await response.json();      
        return types; 
    }catch(error){
        console.error(error);
        throw new Error("Base de données indisponible");
    }
};

export const getPokemonsByType = async (id) => {
    try{
        const response = await fetch(`http://localhost:3000/types/${id}`);
        const pokemonsByType = await response.json();      
        return pokemonsByType; 
    }catch(error){
        console.error(error);
        throw new Error("Base de données indisponible");
    }
};