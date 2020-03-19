export function obtenerListadoPokemones() {
  let urlInicial = 'https://pokeapi.co/api/v2/pokemon/';
  return fetch(urlInicial)
    .then((r) => r.json())
    .then((r) => r.results);
}

export function obtenerInfoPokemon(urlPokemon) {
  return fetch(urlPokemon)
    .then((r) => r.json())
}

export function obtenerHabilidadesEsp(infoPokemon) {
  const habilidadesObj = infoPokemon.abilities;
  const habilidadesObjEspanol = {};
  
  habilidadesObj.forEach((habilidad) => {
    const { url, name } = habilidad.ability;
    fetch(url)
      .then((info) => info.json())
      .then((infoJSON) => {
        const idiomas = infoJSON.flavor_text_entries;

        for (let i = 0; i < idiomas.length; i += 1) {
          if (idiomas[i].language.name === 'es') {
            habilidadesObjEspanol[name] = idiomas[i].flavor_text;
            break;
          }
        }
      })
  })
  return habilidadesObjEspanol;
}