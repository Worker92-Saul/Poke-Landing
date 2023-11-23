const contenedor = document.querySelector('#content');
const url = 'https://pokeapi.co/api/v2/pokemon';
// "name": "ivysaur",
// "id": 2,
// "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png",


async function recuperaPokemon(url,numItems){
    try {
        //const lista = await axios.get(url);
        const pokemon = [];

        for (let i = 0; i < numItems; i++) {
            pokemon.push(await axios.get(url+"/"+(i+1)));
        }
        
        console.log(pokemon[0].data.sprites.front_default);
        //console.log(lista.data.results[0].name);
        let view = `
        ${pokemon.map(elemento =>
            `
            <div class="group relative">
                <div
                    class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                    <img src="${elemento.data.sprites.front_default}" alt="" class="w-full">
                </div>
                <div class="mt-4 flex justify-between">
                    <h3 class="text-sm text-gray-700">
                    <span aria-hidden="true" class="absolute inset-0"></span>
                    ${elemento.data.name} # ${elemento.data.id}
                    </h3>
                </div>
            </div>
            `).slice(0,8).join('') }`;
        // Se divide en 4 arrays, y se une en un solo string sin espacios para agregar directamente al html
        contenedor.innerHTML = view;
    } catch (error) {
        console.error(error + " :" + url);
        alert("error");
    }
}

recuperaPokemon(url,8);

