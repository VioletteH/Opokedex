import {getTeams, getPokemonsByTeam} from "./api/team.api.js";

export function insertTeamSection(team) {
    try{
      const teamSectionTemplate = document.querySelector('.team-template');
      const cloneTeamSection = teamSectionTemplate.content.cloneNode(true);
  
      const teamSection = cloneTeamSection.querySelector("section");
      teamSection.dataset.id = team.id;
      const teamName = teamSection.querySelector(".team-name");
      teamName.textContent = team.name;
      const teamDescription = teamSection.querySelector(".team-description");
      teamDescription.textContent = team.description;

      const imgContainer = teamSection.querySelector(".imgContainer");
      fetchAndInsertPokemonTeam(teamSection, imgContainer);

      const teamButton = teamSection.querySelector(".btnModalTeam");
      teamButton.addEventListener("click", () => {
        openTeamModal(teamSection);
      });

      document.querySelector('.container').append(cloneTeamSection);

    }catch(error) {
      console.error(error.message);
    }
}
    
export async function fetchAndInsertTeamSection() {
    try {
      const teams = await getTeams();
  
      for(let team of teams){
        insertTeamSection(team);
      }
  
    } catch (error) {
        console.error(error.message);
    }
  };

  export async function fetchAndInsertPokemonTeam(teamSection, imgContainer) {
    try {
      const teamId = teamSection.dataset.id;
      const pokemons = await getPokemonsByTeam(teamId);

      for (let pokemon of pokemons){
        const pokemonFigure = imgContainer.querySelector("figure");
        const cloneFigure = pokemonFigure.cloneNode(true);
        const pokemonImage = cloneFigure.querySelector(".image img");
        pokemonImage.src = `./assets/img/${pokemon.id}.webp`;
        imgContainer.append(cloneFigure);
      }
  
    } catch (error) {
        console.error(error.message);
    }
  };

  export async function openTeamModal(teamSection) {
    try {
      const teamModal = document.querySelector("#team_modal");
      teamModal.classList.add("is-active");

      const teamId = teamSection.dataset.id;
      const pokemons = await getPokemonsByTeam(teamId);

      const table = document.querySelector("#tbody_team");
      const originalTr = table.querySelector("tr"); // C'est la ligne modèle, elle sera supprimée
      originalTr.remove();

      for (let pokemon of pokemons){
                
        const cloneTr = originalTr.cloneNode(true);
        
        cloneTr.querySelector("#numero").textContent = pokemon.hp;
        cloneTr.querySelector("#name").textContent = pokemon.name;
        cloneTr.querySelector("#hp").textContent = pokemon.hp;
        cloneTr.querySelector("#atk").textContent = pokemon.atk;
        cloneTr.querySelector("#def").textContent = pokemon.def;
        cloneTr.querySelector("#atk_spe").textContent = pokemon.atk_spe;
        cloneTr.querySelector("#def_spe").textContent = pokemon.def_spe;
        cloneTr.querySelector("#speed").textContent = pokemon.speed;
        cloneTr.querySelector("#types").textContent = pokemon.types.length;

        table.append(cloneTr);

      }
  
      const closeModal = document.querySelector("#team_modal .close");
        closeModal.addEventListener("click", () => {
          teamModal.classList.remove("is-active");
        });

    } catch (error) {
        console.error(error.message);
    }
  };
  