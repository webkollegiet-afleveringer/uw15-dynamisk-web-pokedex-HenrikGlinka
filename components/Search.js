export default function Search(options = null) {

    if (options?.onInput) {
        setTimeout(() => {
            const searchInput = document.querySelector('.search__input');
            searchInput.addEventListener('input', options.onInput);
        });
    }

    return /* html */`
        <form class="header__search search">
            <span class="search__icon icon icon--red search-icon"></span>
            <input type="search" class="search__input" placeholder="Search">
            <button type="button" class="search__button">
                <span class="icon icon--red ${options?.sortBy === 'name' ? 'name-icon' : 'number-icon'}"></span>
            </button>
        </form>
    `;

}