const getPokemonData = (pokemonName) => {
    return axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`)
        .then(response => response.data);
};

const getPokemonStats = (pokemonName) => {
    return axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`)
        .then(response => response.data.stats);
};

const searchButton = document.querySelector("#searchButton");
const pokemonInput = document.querySelector("#inputBar");
const pokemonNameElement = document.querySelector("#pokemonName");
const pokemonImageElement = document.querySelector("#pokemonImage");
const pokemonStatsElement = document.querySelector("#pokemonStats");

searchButton.addEventListener('click', () => {
    let pokemonName = pokemonInput.value.trim().toLowerCase();
    if (pokemonName) {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
            .then(async response => {
                const pokemonData = response.data;
                pokemonNameElement.textContent = pokemonData.name;
                pokemonImageElement.src = pokemonData.sprites.front_default;

                // Fetch Pokémon stats
                const pokemonStats = await getPokemonStats(pokemonName);
                if (pokemonStats) {
                    pokemonStatsElement.innerHTML = ''; // Clear existing content
                    pokemonStats.forEach(stat => {
                        const statElement = document.createElement('div');
                        statElement.textContent = `${stat.stat.name}: ${stat.base_stat}`;
                        pokemonStatsElement.appendChild(statElement);
                    });
                } else {
                    pokemonStatsElement.textContent = 'Stats not found';
                }
            })
            .catch(error => {
                console.error('Error fetching Pokémon data:', error);
                pokemonNameElement.textContent = "Pokémon not found";
                pokemonImageElement.src = ""; // Clear the image
                pokemonStatsElement.textContent = ''; // Clear the stats
            });
    } else {
        console.log('Please enter a Pokémon name');
    }
});

