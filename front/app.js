import * as pokemon from "./assets/js/pokemon.js";
import * as type from "./assets/js/type.js";
import * as team from "./assets/js/team.js";
import { openPokemonModalBySearchTerm } from "./assets/js/pokemon.js";

const page = document.querySelectorAll("a");
let container = document.querySelector(".container");
const searchFormElement = document.querySelector('#search-form');   

document.addEventListener("DOMContentLoaded", init);

async function init() {

  container.innerHTML = `<h2 class="title has-text-centered column is-full has-text-primary">Bienvenue sur le Pokedex !</h2>`;
  await pokemon.fetchAndInsertPokemonCard();

  searchFormElement.addEventListener("submit", (e) => {
    e.preventDefault();
      openPokemonModalBySearchTerm();
      searchFormElement.reset();
  });
  
  page.forEach(page => {
    page.addEventListener('click', async (e) => {
      e.preventDefault();
      const pageId = e.target.id;
      container.innerHTML = '';
      if(pageId === "nav-item-pokedex") {
        container.innerHTML = `<h2 class="title has-text-centered column is-full has-text-primary">Pokedex</h2>`;
        await pokemon.fetchAndInsertPokemonCard();
      }else if(pageId === "nav-item-type") {
        container.innerHTML = `<h2 class="title has-text-centered column is-full has-text-primary">Types</h2>`;
        await type.fetchAndInsertTypeButton();
      }else if(pageId === "nav-item-team") {
        container.innerHTML = `<h2 class="title has-text-centered column is-full has-text-primary">Teams</h2>`;
        await team.fetchAndInsertTeamCard();
      }else if(pageId === "nav-item-add-team") {
        await team.openAddTeamModal();
      }
    });
  });

};



