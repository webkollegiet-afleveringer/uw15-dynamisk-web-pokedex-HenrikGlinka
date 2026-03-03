import Header from './components/Header.js';
import PokeCard from './components/PokeCard.js';
import Spinner from './components/Spinner.js';
import { fetchPokemonList } from './utilities/fetch-pokemon.js';

const sortBy = new URLSearchParams(window.location.search).get("sortby");
const pokemonData = await fetchPokemonList();

let loading = false;

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!loading && entry.isIntersecting) {
      loadMorePokemon();
    }
  });
});

console.log(pokemonData);


function updatePokemonList(pokemonList) {
    const container = document.querySelector('.pokemon-cards');

    if (sortBy === 'name') {
        pokemonList.sort((a, b) => a.name.localeCompare(b.name));
    } else {
        pokemonList.sort((a, b) => a.id - b.id);
    }

    container.innerHTML = pokemonList.map(pokemon => PokeCard(pokemon)).join('');
}

function handleSearchInput(event) {
    const searchTerm = event.target.value.toLowerCase();
    const filteredPokemon = pokemonData.filter(
        pokemon => pokemon.name.toLowerCase().includes(searchTerm)
    );

    updatePokemonList(filteredPokemon);
}

window.loadMorePokemon = async () => {
    loading = true;

    pokemonData.sort((a, b) => a.id - b.id);

    const newPokemon = await fetchPokemonList(20, pokemonData.length);
    pokemonData.push(...newPokemon);
    updatePokemonList(pokemonData);

    //loading = false;
}

document.body.innerHTML = /* HTML */`
    ${Header({ search: { onInput: handleSearchInput, sortBy } })}
    
    <main>
        <div class="pokemon-cards">
        </div>
        <span class="load-more">${Spinner()}</span>
    </main>
    
`;

observer.observe(document.querySelector('.load-more'));

updatePokemonList(pokemonData);