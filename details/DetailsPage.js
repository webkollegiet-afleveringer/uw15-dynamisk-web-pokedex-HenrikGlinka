import { fetchPokemonDetails, fetchPokemonDetailsTest } from "../utilities/fetch-pokemon.js";

const id = Number(new URLSearchParams(window.location.search).get("pokemon"));

if (isNaN(id)) window.location.href = "/";

const pokemon = await fetchPokemonDetails(id);
console.log(pokemon);

const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
const firstAppearances = pokemon.game_indices[0].version.name.split('-').map(word => word[0].toUpperCase() + word.slice(1)).join(' ');

document.body.classList.add(pokemon.types[0].type.name);

document.body.innerHTML = /* HTML */`
        <header>
            <h1>${name}</h1>
        </header>
        <main>
            <img src="${pokemon.sprites.other['official-artwork'].front_default}" alt="${pokemon.name}" class="pokemon-image">
            <div class="type-container">
                ${pokemon.types.map(type => /* html */`
                    <span class="type ${type.type.name}">${type.type.name[0].toUpperCase() + type.type.name.slice(1)}</span>
                `).join('')}
            </div>

            <h2 class="${pokemon.types[0].type.name}-text">About</h2>

            <table>
                <tbody>
                    <tr>
                        <td>
                            <span class="icon weight-icon"></span>
                            ${pokemon.weight / 10} kg
                        </td>
                        <td>
                            <span class="icon height-icon"></span>
                            ${pokemon.height / 10} m
                        </td>
                        <td>${pokemon.abilities.map(ability => ability.ability.name[0].toUpperCase() + ability.ability.name.slice(1)).join('<br>')}</td>
                    </tr>
                    <tr>
                        <th>Weight</th>
                        <th>Height</th>
                        <th>Moves</th>
                    </tr>
                </tbody>
            </table>

            <p class="description">${name} is a ${pokemon.types.map(type => type.type.name).join(' and ')} type Pokémon which first appeared in Pokémon ${firstAppearances}.</p>
        
        </main>
    `;