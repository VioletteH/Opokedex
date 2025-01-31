import {getTeams, getPokemonsByTeam, createTeam, deleteTeam, updateTeam, removePokemonFromTeam} from "./api/team.api.js";
import {fetchAndInsertPokemonCard} from "./pokemon.js";

export function insertTeamCard(team) {
    try{
      const cardTemplate = document.querySelector('.team-template');
      const cloneTemplate = cardTemplate.content.cloneNode(true);
  
      const teamSection = cloneTemplate.querySelector("section");
      teamSection.dataset.id = team.id;
      teamSection.querySelector(".team-name").textContent = team.name;
      teamSection.querySelector(".team-description").textContent = team.description;

      const imgContainer = teamSection.querySelector(".imgContainer");
      fetchAndInsertPokemonTeam(teamSection, imgContainer);

      const adminTeamButton = teamSection.querySelector(".btnModalTeam");
      adminTeamButton.addEventListener("click", () => {
        openTeamModal(teamSection);
      });

      const addPokemonTeamButton = teamSection.querySelector(".btnAddPokemon");
      addPokemonTeamButton.addEventListener("click", async () => {
        let container = document.querySelector(".container");
        container.innerHTML = `<h2 class="title has-text-centered column is-full has-text-primary">Pokedex</h2>`;
        await fetchAndInsertPokemonCard();
      });

      document.querySelector('.container').append(cloneTemplate);

    }catch(error) {
      console.error(error.message);
    }
}
    
export async function fetchAndInsertTeamCard() {
    try {
      const teams = await getTeams();
      for(let team of teams){
        insertTeamCard(team);
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
      cloneFigure.querySelector(".image img").src = `./assets/img/${pokemon.id}.webp`;
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

      const teamModalTitle = document.querySelector("#team_modal .team-name");
      teamModalTitle.textContent = teamSection.querySelector(".team-name").textContent;

      const teamId = teamSection.dataset.id;
      const pokemons = await getPokemonsByTeam(teamId);

      // CREATION DU TABLEAU

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
          await removePokemonFromTeam(teamId, pokemonId);
          document.querySelector(`tr[data-id='${pokemonId}']`).remove(); 
          document.querySelector(`figure[data-id='${pokemonId}']`).remove();
          teamModal.classList.remove("is-active");
        });

      }
  
      // EDIT TEAM

      const editTeamButton = document.querySelector("#team_modal .edit"); 
      editTeamButton.addEventListener("click", () => {
        
        const editForm = document.querySelector("#team_modal-update");

        const modalCardHead = document.querySelector("#team_modal .modal-card-head");
        modalCardHead.style.flexDirection = "column";
        modalCardHead.style.alignItems = "flex-start";

        const modalCardIcons = document.querySelectorAll("#team_modal .fa");
        modalCardIcons.forEach(icon => {
          icon.classList.add("is-hidden");
        });

        editForm.classList.remove("is-hidden");
        updateTeamForm(teamSection);
      });

      // DELETE TEAM

      const deleteTeamButton = document.querySelector("#team_modal .fa-trash");
      deleteTeamButton.addEventListener("click", async () => {
        const teamId = teamSection.dataset.id;
        await deleteTeam(teamId);
        document.querySelector(`section[data-id='${teamId}']`).remove();  
        teamModal.classList.remove("is-active");
      });

      const closeModalButtons = document.querySelectorAll("#team_modal .close");
      for(let closeModalButton of closeModalButtons){
        closeModalButton.addEventListener("click", () => {
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
        insertTeamCard(newTeam);
        addTeamModal.classList.remove("is-active");
      });

      const closeModalButtons = document.querySelectorAll("#add_team_modal .close");
      for(let closeModalButton of closeModalButtons){
        closeModalButton.addEventListener("click", async () => {
          addTeamModal.classList.remove("is-active");
          let container = document.querySelector(".container");
          container.innerHTML = `<h2 class="title has-text-centered column is-full has-text-primary">Teams</h2>`;
          await fetchAndInsertTeamCard();
        });
    }
      
    }catch(error) {
      console.error(error.message);
    }
  };

  export async function updateTeamForm(teamSection) {
    try {
      const updateForm = document.querySelector("#team_modal-update");
      const updateFormButton = document.querySelector("#team_modal-update-validate");

      updateFormButton.addEventListener("click", async (e) => {
        e.preventDefault();
        
        let formData = Object.fromEntries(new FormData(updateForm));
        const teamId = teamSection.dataset.id;
        formData = { 
          name: formData.team_name,  
          description: formData.team_description  
        };
        const updatedTeam = await updateTeam(teamId, formData);
        document.querySelector(`section[data-id='${teamId}']`).remove(); 
        insertTeamCard(updatedTeam);
        updateForm.classList.add("is-hidden");

        const closeModalButton = document.querySelector("#team_modal-update-close");
        closeModalButton.addEventListener("click", (e) => {
          e.preventDefault();
          console.log("click")
          updateForm.classList.add("is-hidden");
        })
      });

    }catch(error) {
      console.error(error.message);
    }
  };