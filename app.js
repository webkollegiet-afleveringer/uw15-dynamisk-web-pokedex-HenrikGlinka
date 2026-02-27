import Header from './components/Header.js';
import PokeCard from './components/PokeCard.js';
import { fetchPokemonList, fetchPokemonListTest } from './utilities/fetch-pokemon.js';

const pokemonData = await fetchPokemonListTest();

document.body.innerHTML = /* HTML */`
    ${Header()}
    <main>
        ${pokemonData.map(pokemon => PokeCard(pokemon)).join('')}
    </main>
`;