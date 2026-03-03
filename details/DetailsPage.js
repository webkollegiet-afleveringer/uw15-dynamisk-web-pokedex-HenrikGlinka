import { fetchPokemonDetails } from "../utilities/fetch-pokemon.js";
import { BASE_PATH } from "../utilities/base-path.js";

const id = Number(new URLSearchParams(window.location.search).get("pokemon"));

if (isNaN(id)) window.location.href = `${BASE_PATH}/`;


const pokemon = await fetchPokemonDetails(id);
console.log(pokemon);

const name = pokemon.details.name[0].toUpperCase() + pokemon.details.name.slice(1);
const primaryType = pokemon.details.types[0].type.name;
const description = pokemon.species.flavor_text_entries.find(entry => entry.language.name === 'en').flavor_text.replace(/\f/g, ' ');

document.body.classList.add(pokemon.details.types[0].type.name);

document.body.innerHTML = /* HTML */`
    <audio class="audio-player">
        <source src="${pokemon.details.cries.latest}" type="audio/ogg">
    </audio>

        <header>
            <a href="${BASE_PATH}/"><span class="icon icon--white arrow-back-icon"></span></a>
            <h1>${name}</h1>
            <p>#${id.toString().padStart(3, '0')}</p>
        </header>
        <main>
            <div class="image-container">
                <a href="${BASE_PATH}/details/?pokemon=${id - 1 <= 1 ? 1025 : id - 1}"><span class="icon icon--white chevron-left-icon"></span></a>
                <img class="pokemon-image" src="${pokemon.details.sprites.other['official-artwork'].front_default}" alt="${name}" class="pokemon-image">
                <a href="${BASE_PATH}/details/?pokemon=${id + 1 >= 1025 ? 1 : id + 1}"><span class="icon icon--white chevron-right-icon"></span></a>
            </div>
            <div class="type-container">
                ${pokemon.details.types.map(type => /* html */`
                    <span class="type ${type.type.name}">${type.type.name[0].toUpperCase() + type.type.name.slice(1)}</span>
                `).join('')}
            </div>

            <h2 class="${pokemon.details.types[0].type.name}-text">About</h2>

            <table class="about-table">
                <tbody>
                    <tr>
                        <td>
                            <span class="icon weight-icon"></span>
                            ${pokemon.details.weight / 10} kg
                        </td>
                        <td>
                            <span class="icon height-icon"></span>
                            ${pokemon.details.height / 10} m
                        </td>
                        <td>${pokemon.details.abilities.map(ability => ability.ability.name[0].toUpperCase() + ability.ability.name.slice(1)).join('<br>')}</td>
                    </tr>
                    <tr>
                        <th>Weight</th>
                        <th>Height</th>
                        <th>Moves</th>
                    </tr>
                </tbody>
            </table>

            <p class="description">${description}</p>

            <h2 class="${primaryType}-text">Base Stats</h2>

            <table class="stats-table">
                <tbody>
                    <tr>
                        <th class="${primaryType}-text">HP</th>
                        <td>${pokemon.details.stats[0].base_stat.toString().padStart(3, '0')}</td>
                        <td><meter class="${primaryType}-text" value="${pokemon.details.stats[0].base_stat}" min="0" max="255"></meter></td>
                    </tr>
                    <tr>
                        <th class="${primaryType}-text">ATK</th>
                        <td>${pokemon.details.stats[1].base_stat.toString().padStart(3, '0')}</td>
                        <td><meter class="${primaryType}-text" value="${pokemon.details.stats[1].base_stat}" min="0" max="255"></meter></td>
                    </tr>
                    <tr>
                        <th class="${primaryType}-text">DEF</th>
                        <td>${pokemon.details.stats[2].base_stat.toString().padStart(3, '0')}</td>
                        <td><meter class="${primaryType}-text" value="${pokemon.details.stats[2].base_stat}" min="0" max="255"></meter></td>
                    </tr>
                    <tr>
                        <th class="${primaryType}-text">SATK</th>
                        <td>${pokemon.details.stats[3].base_stat.toString().padStart(3, '0')}</td>
                        <td><meter class="${primaryType}-text" value="${pokemon.details.stats[3].base_stat}" min="0" max="255"></meter></td>
                    </tr>
                    <tr>
                        <th class="${primaryType}-text">SDEF</th>
                        <td>${pokemon.details.stats[4].base_stat.toString().padStart(3, '0')}</td>
                        <td><meter class="${primaryType}-text" value="${pokemon.details.stats[4].base_stat}" min="0" max="255"></meter></td>
                    </tr>
                    <tr>
                        <th class="${primaryType}-text">SPD</th>
                        <td>${pokemon.details.stats[5].base_stat.toString().padStart(3, '0')}</td>
                        <td><meter class="${primaryType}-text" value="${pokemon.details.stats[5].base_stat}" min="0" max="255"></meter></td>
                    </tr>
                </tbody>
            </table>

        </main>
    `;

document.querySelector('.details-page .pokemon-image').addEventListener('click', event => {
    const audioPlayer = document.querySelector('.audio-player');

    audioPlayer.currentTime = 0;
    audioPlayer.play();
});

document.querySelectorAll('.details-page meter').forEach((meter, index) => {
    const targetValue = meter.value;
    const statDisplay = meter.parentNode.previousElementSibling;

    meter.value = 0;
    statDisplay.textContent = '000';

    setTimeout(() => {
        let currentValue = 0;
        const duration = 500; // 1 second
        const startTime = performance.now();

        function animate(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            currentValue = targetValue * progress;
            meter.value = currentValue;

            statDisplay.textContent = currentValue.toFixed().toString().padStart(3, '0');

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        }

        requestAnimationFrame(animate);
    }, 500 + 200 * index);
});
