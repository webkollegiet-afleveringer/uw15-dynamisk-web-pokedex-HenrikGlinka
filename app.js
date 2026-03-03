import Header from './components/Header.js';
import PokeCard from './components/PokeCard.js';
import { fetchPokemonList } from './utilities/fetch-pokemon.js';

const sortBy = new URLSearchParams(window.location.search).get("sortby");
const pokemonData = await fetchPokemonList();

console.log(pokemonData);


function updatePokemonList(pokemonList) {
    const main = document.querySelector('main');

    if (sortBy === 'name') {
        pokemonList.sort((a, b) => a.name.localeCompare(b.name));
    } else {
        pokemonList.sort((a, b) => a.id - b.id);
    }

    main.innerHTML = pokemonList.map(pokemon => PokeCard(pokemon)).join('');
}

function handleSearchInput(event) {
    const searchTerm = event.target.value.toLowerCase();
    const filteredPokemon = pokemonData.filter(
        pokemon => pokemon.name.toLowerCase().includes(searchTerm)
    );

    updatePokemonList(filteredPokemon);
}

window.loadMorePokemon = async () => {
    pokemonData.sort((a, b) => a.id - b.id);

    const newPokemon = await fetchPokemonList(20, pokemonData.length);
    pokemonData.push(...newPokemon);
    updatePokemonList(pokemonData);
}

document.body.innerHTML = /* HTML */`
    ${Header({ search: { onInput: handleSearchInput, sortBy } })}
    
    <main></main>
    <button id="load-more" class="load-more" onclick="loadMorePokemon()">Load More</button>
`;

updatePokemonList(pokemonData);