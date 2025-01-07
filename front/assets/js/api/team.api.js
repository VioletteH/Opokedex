export const getTeams = async () => {
    try{
        const response = await fetch("http://localhost:3000/teams");
        const teams = await response.json();      
        return teams; 
    }catch(error){
        console.error(error);
        throw new Error("Base de données indisponible");
    }
};

export const getPokemonsByTeam = async (id) => {
    try{
        const response = await fetch(`http://localhost:3000/teams/${id}`);
        const pokemonsByTeam = await response.json();      
        return pokemonsByTeam; 
    }catch(error){
        console.error(error);
        throw new Error("Base de données indisponible");
    }
};