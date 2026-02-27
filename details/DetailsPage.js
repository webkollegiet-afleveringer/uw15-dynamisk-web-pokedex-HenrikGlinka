import { fetchPokemonDetails, fetchPokemonDetailsTest } from "../utilities/fetch-pokemon.js";

const id = Number(new URLSearchParams(window.location.search).get("pokemon"));

if (isNaN(id)) window.location.href = "/";

const pokemon = await fetchPokemonDetailsTest(id);

document.body.innerHTML = /* HTML */`
        <h1>Details Page</h1>
    `;