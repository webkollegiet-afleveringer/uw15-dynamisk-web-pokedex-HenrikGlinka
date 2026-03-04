const IMAGE_URL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/';
import { BASE_PATH } from '../utilities/base-path.js';

export default function PokeCard(pokemon) {
    
    const id = pokemon.url.match(/(\d+)\/$/)[1];
    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    const image = IMAGE_URL + id + '.png';

    return /* HTML */`
        <a class="poke-card" href="${BASE_PATH}/details/?pokemon=${id}">
            <p class="poke-card__number">#${id.padStart(4, '0')}</p>
            <img class="poke-card__image" src="${image}" alt="${name}">
            <h2 class="poke-card__title">${name}</h2>
        </a>
    `;
}
