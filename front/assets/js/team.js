import {getTeams, getPokemonsByTeam, createTeam, deleteTeam, updateTeam, deletePokemonFromTeam} from "./api/team.api.js";

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

      const originalFigure = imgContainer.querySelector("figure");
      originalFigure.remove();

      for (let pokemon of pokemons){
        
        const cloneFigure = originalFigure.cloneNode(true);

        cloneFigure.dataset.id = pokemon.id;
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
      const originalTr = table.querySelector("tr"); 
      originalTr.remove();

      table.innerHTML = '';
      for (let pokemon of pokemons){
                
        const cloneTr = originalTr.cloneNode(true);
        cloneTr.dataset.id = pokemon.id;
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

        const deletePokemonBtn = cloneTr.querySelector(".fa-trash");
        deletePokemonBtn.addEventListener("click", async () => {
          const pokemonId = pokemon.id;
          await deletePokemonFromTeam(teamId, pokemonId);
          document.querySelector(`tr[data-id='${pokemonId}']`).remove(); 
          document.querySelector(`figure[data-id='${pokemonId}']`).remove();
          teamModal.classList.remove("is-active");
        });

      }
  
      const editTeamButton = document.querySelector("#team_modal .edit");
        editTeamButton.addEventListener("click", () => {
          const editForm = document.querySelector("#team_modal-update");
          editForm.classList.remove("is-hidden");
          updateTeamForm(teamSection);
        });

      const deleteTeamButton = document.querySelector("#team_modal .fa-trash");
      deleteTeamButton.addEventListener("click", async () => {
        const teamId = teamSection.dataset.id;
        await deleteTeam(teamId);
        document.querySelector(`section[data-id='${teamId}']`).remove();  
        teamModal.classList.remove("is-active");
      });

      const closeModal = document.querySelectorAll("#team_modal .close");
      for(let closebutton of closeModal){
        closebutton.addEventListener("click", () => {
          teamModal.classList.remove("is-active");
        });
      }

    } catch (error) {
        console.error(error.message);
    }
  };
  
  export async function openAddTeamModal() {
    try {
      const addTeamModal = document.querySelector("#add_team_modal");
      addTeamModal.classList.add("is-active");

      const form = document.querySelector("#form_team_modal");
      form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const formData = Object.fromEntries(new FormData(event.currentTarget));
        const newTeam = await createTeam(formData);
        insertTeamSection(newTeam);
        addTeamModal.classList.remove("is-active");
      });

      const closeModal = document.querySelector("#add_team_modal .close");
        closeModal.addEventListener("click", () => {
          addTeamModal.classList.remove("is-active");
        });
      
    }catch(error) {
      console.error(error.message);
    }
  };

  export async function updateTeamForm(teamSection) {
    try {
      const updateForm = document.querySelector("#team_modal-update");
      const editTeamButtonOk = document.querySelector("#team_modal-update-validate");
      editTeamButtonOk.addEventListener("click", async (e) => {
        e.preventDefault();
        
        let formData = Object.fromEntries(new FormData(updateForm));
        const teamId = teamSection.dataset.id;
        formData = { 
          name: formData.team_name,  
          description: formData.team_description  
        };
        const updatedTeam = await updateTeam(teamId, formData);
        document.querySelector(`section[data-id='${teamId}']`).remove(); 
        insertTeamSection(updatedTeam);
        updateForm.classList.add("is-hidden");
      });

    }catch(error) {
      console.error(error.message);
    }
  };