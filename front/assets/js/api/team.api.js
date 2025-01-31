const apiBaseUrl = "http://localhost:3000";

export const getTeams = async () => {
    try{
        const response = await fetch(`${apiBaseUrl}/teams`);
        if (!response.ok) return null;
        const teams = await response.json();      
        return teams; 
    }catch(error){
        console.error(error);
        throw new Error("Base de données indisponible");
    }
};

export const getPokemonsByTeam = async (id) => {
    try{
        const response = await fetch(`${apiBaseUrl}/teams/${id}`);
        if (!response.ok) return null;
        const pokemonsByTeam = await response.json();      
        return pokemonsByTeam; 
    }catch(error){
        console.error(error);
        throw new Error("Base de données indisponible");
    }
};

export const createTeam = async (data) => {
    try{
        const response = await fetch(`${apiBaseUrl}/teams`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
          });
          if (!response.ok) return null;
          const newTeam = await response.json();
          return newTeam;
    }catch(error){
        console.error(error);
    }
};

export const updateTeam = async (id, data) => {
    try{
        const response = await fetch(`${apiBaseUrl}/teams/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
          });
          if (!response.ok) return null;
          const updatedTeam = await response.json();
          return updatedTeam;
    }catch(error){
        console.error(error);
    }
};

export const deleteTeam = async (id) => {
    try{
        const response = await fetch(`${apiBaseUrl}/teams/${id}`, {
            method: "DELETE",
          });
        if (!response.ok) return null;
        return response.json;
    }catch(error){
        console.error(error);
    }
};

export const addPokemonInTeam = async (teamid, pokemonid) => {
    try{
        const response = await fetch(`${apiBaseUrl}/teams/${teamid}/pokemons/${pokemonid}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
          });
          if (!response.ok) return null;
          const updatedPokemonInTeam = await response.json();
          return updatedPokemonInTeam;
    }catch(error){
        console.error(error);
    }
};

export const removePokemonFromTeam = async (teamid, pokemonid) => {
    try{
        const response = await fetch(`${apiBaseUrl}/teams/${teamid}/pokemons/${pokemonid}`, {
            method: "DELETE"
          });
        if (!response.ok) return null;
        return response.json;
    }catch(error){
        console.error(error);
    }
};