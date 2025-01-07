import * as pokemon from "./assets/js/pokemon.js";
import * as type from "./assets/js/type.js";
import * as team from "./assets/js/team.js";

const page = document.querySelectorAll("a");
const title = document.querySelector("h2");
let content = document.querySelector(".content");

document.addEventListener("DOMContentLoaded", init);

async function init() {

  page.forEach(page => {
    page.addEventListener('click', async (e) => {
      e.preventDefault();
      const pageId = e.target.id;
      content.innerHTML = ""; // ne fonctionne pas
      if(pageId === "nav-item-pokemon") {
        title.textContent = "Pokemons";
        await pokemon.fetchAndInsertPokemonCard();
      }else if(pageId === "nav-item-type") {
        title.textContent = "Types";
        await type.fetchAndInsertTypeButton();
      }else if(pageId === "nav-item-team") {
        title.textContent = "Teams";
        await team.fetchAndInsertTeamSection();
      }
    })
  })
  
}



