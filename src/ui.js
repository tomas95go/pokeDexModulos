import { obtenerInfoPokemon, obtenerHabilidadesEsp } from './pokeapi.js';

export function mostrarListado(pokemones) {
  const lista = document.createElement('div');
  const infoDelPokemon = document.querySelector('#info');

  pokemones.forEach((pokemon) => {
    const name = pokemon.name;
    const item = document.createElement('a');
    const url = pokemon.url;

    item.textContent = name[0].toUpperCase() + name.slice(1, name.length);
    item.href = '#';
    item.classList.add('list-group-item', 'list-group-item-action');
    item.addEventListener('click', () => {
      const itemActivo = document.querySelector('.active');
      if (itemActivo) {
        itemActivo.classList.remove('active');
      }
      item.classList.add('active');

      obtenerInfoPokemon(url)
        .then(infoPokemon => mostrarInfoPokemon(infoPokemon));
    });

    if(infoDelPokemon.classList.contains('hidden')) {
      infoDelPokemon.classList.remove('hidden');
    }

    lista.appendChild(item);

  });

  return lista;
}

export function mostrarInfoPokemon(infoPokemon) {
  const imageDOM = document.querySelector('#image');
  const imageDOM1 = document.querySelector('#image1');
  const nameDOM = document.querySelector('#name');
  const heightDOM = document.querySelector('#height');
  const weightDOM = document.querySelector('#weight');
  const { name, height, weight } = infoPokemon;
  const image = infoPokemon.sprites.front_default;
  const image1 = infoPokemon.sprites.back_default;

  imageDOM.setAttribute('src', image);
  if (image1) {
    imageDOM1.setAttribute('src', image1);
  } else {
    imageDOM1.parentNode.removeChild(imageDOM1);
  }

  nameDOM.textContent = name[0].toUpperCase() + name.slice(1, name.length);
  heightDOM.textContent = `Altura: ${height * 10}cm`;
  weightDOM.textContent = `Peso: ${(weight * 0.1).toFixed(1)}kg`;

  return mostrarHabilidades(obtenerHabilidadesEsp(infoPokemon));
}

function mostrarHabilidades(habilidadesEsp) {
  const habilidadesDOM = document.querySelector('#abilityList');
  habilidadesDOM.innerHTML = '';
  const spanHabilidades = document.querySelector('#habilidades');
  /*
    Aca simplemente termino la promise y luego con el foreach ya se va agregando
    los items a la lista, puedo aplicar un forEach porque esto devuelve un array con
    2 promises, lo mismo para el .then, es aplicable porque devuelve promises.
  */
  habilidadesEsp.forEach((value, i) => {

  const liHabilidad = document.createElement('li');
  liHabilidad.classList.add('list-group-item');
  const pNombreHabilidad = document.createElement('p');
  const pDescripcionHabilidad = document.createElement('p');

    value.then((data) => {
      pNombreHabilidad.textContent  = data.name.toUpperCase();
      pDescripcionHabilidad.textContent = data.flavor_text_entries[4].flavor_text;

    })
    liHabilidad.appendChild(pNombreHabilidad);
    liHabilidad.appendChild(pDescripcionHabilidad);
    habilidadesDOM.appendChild(liHabilidad);
  });

}