const publicKey = 'cd1f3cea10689ef6a9cdb6be5d474701';
const privateKey = '1da6d19b7f10d2c03b3115d6651582d3b975a463';
const baseURL = `http://gateway.marvel.com/v1/public/characters`;

async function fetchCharacters() {
    const ts = new Date().getTime();
    const hash = CryptoJS.MD5(ts + privateKey + publicKey).toString();
    const apiUrl = `${baseURL}?ts=${ts}&apikey=${publicKey}&hash=${hash}`;
    try {
        const response = await fetch(apiUrl); 
        const data = await response.json();
        displayCharacters(data.data.results);
    } catch (error) {
        console.error('Error fetching characters:', error);
    }
}
const displayCharacters = (charactersData) => {
    const charactersContainer = document.getElementById('characters');
    charactersContainer.innerHTML = ''; 
    charactersData.forEach(character => {
        const characterInfo = document.createElement('div');
        characterInfo.classList.add('character-info');
        characterInfo.innerHTML = `
            <h2>${character.name}</h2>
            <img src="${character.thumbnail.path}.${character.thumbnail.extension}" alt="${character.name}">
            <p>Available comics count: ${character.comics.available}</p>
            <p>Available series count: ${character.series.available}</p>
            <p>${character.description}</p>
        `;

        charactersContainer.appendChild(characterInfo);
    });
}

const updateCharacters = () => {
    fetchCharacters();
}

updateCharacters();
setInterval(updateCharacters, 5000);