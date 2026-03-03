const API_URL = "https://pokeapi.co/api/v2/";
const TEST_API_URL = "http://127.0.0.1:5500/public/test-data.json";
const TEST_API_DETAILS_URL = "http://127.0.0.1:5500/public/test-details-data.json";


const cache = new Map();

export async function fetchPokemonList(limit = 20, offset = 0) {
    const url = new URL('pokemon', API_URL);

    url.searchParams.set("limit", limit);
    url.searchParams.set("offset", offset);

    const response = await fetch(url);
    const data = await response.json();

    console.log(data.results);
    

    return data.results;
}

export async function fetchPokemonListTest(limit = 20, offset = 0) {
    const url = new URL(TEST_API_URL);

    url.searchParams.set("limit", limit);
    url.searchParams.set("offset", offset);

    const response = await fetch(url);
    const data = await response.json();

    return data.results;
}

export async function fetchPokemonDetails(id) {

    if (cache.has(id)) return cache.get(id);



    const [details, species] = await Promise.all([
        await fetch(new URL(`pokemon/${id}`, API_URL))
            .then(response => response.json()),
        await fetch(new URL(`pokemon-species/${id}`, API_URL))
            .then(response => response.json())
    ]);

    cache.set(id, { details, species });

    return { details, species };
}