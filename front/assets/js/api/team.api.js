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

export const createTeam = async (data) => {
    try{
        const response = await fetch("http://localhost:3000/teams", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
          });
          const newTeam = await response.json();
          return newTeam;
    }catch(error){
        console.error(error);
    }
};

export const updateTeam = async (id, data) => {
    try{
        const response = await fetch(`http://localhost:3000/teams/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
          });
          const updatedTeam = await response.json();
          return updatedTeam;
    }catch(error){
        console.error(error);
    }
};

export const deleteTeam = async (id) => {
    try{
        const response = await fetch(`http://localhost:3000/teams/${id}`, {
            method: "DELETE",
          });
        return response.json;
    }catch(error){
        console.error(error);
    }
};

export const addPokemonInTeam = async (teamid, pokemonid) => {
    try{
        const response = await fetch(`http://localhost:3000/teams/${teamid}/pokemons/${pokemonid}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
          });
          const updatedPokemonInTeam = await response.json();
          return updatedPokemonInTeam;
    }catch(error){
        console.error(error);
    }
};

export const deletePokemonFromTeam = async (teamid, pokemonid) => {
    try{
        const response = await fetch(`http://localhost:3000/teams/${teamid}/pokemons/${pokemonid}`, {
            method: "DELETE"
          });
          return response.json;
    }catch(error){
        console.error(error);
    }
};