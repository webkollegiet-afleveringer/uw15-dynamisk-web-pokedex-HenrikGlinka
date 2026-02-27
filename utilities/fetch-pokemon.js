const API_URL = "https://pokeapi.co/api/v2/pokemon/";
const TEST_API_URL = "http://127.0.0.1:5500/public/test-data.json";
const TEST_API_DETAILS_URL = "http://127.0.0.1:5500/public/test-details-data.json";

export async function fetchPokemonList(limit = 20, offset = 0) {
    const url = new URL(API_URL);

    const response = await fetch(url);
    const data = await response.json();

    console.log(data.results);
    

    return data.results;
}

export async function fetchPokemonListTest(limit = 20, offset = 0) {
    const url = new URL(TEST_API_URL);

    const response = await fetch(url);
    const data = await response.json();

    return data.results;
}

export async function fetchPokemonDetails(id) {
    const url = new URL(id, API_URL);

    const response = await fetch(url);
    const data = await response.json();

    return data.results;
}

export async function fetchPokemonDetailsTest(id) {
    const url = new URL(id, TEST_API_DETAILS_URL);

    const response = await fetch(url);
    const data = await response.json();

    return data.results;
}
