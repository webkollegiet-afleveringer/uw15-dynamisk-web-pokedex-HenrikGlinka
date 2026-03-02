import Search from "./Search.js";

export default function Header(options) {

    return /* html */`
        <header class="header">
            <span class="icon icon--white pokeball-icon"></span>
            <h1>Pokédex</h1>
            ${Search(options.search)}
        </header>
    `;

}