// Obtiene pokemon.results
import { obtenerListadoPokemones } from './pokeapi.js';
import { mostrarListado } from './ui.js';

function actualizar() {
  obtenerPokemonSeleccionado()
}

function inicializar() {
  const listado = document.querySelector('#listado');

  obtenerListadoPokemones()
  .then((pokemones) => {
    listado.appendChild(mostrarListado(pokemones));
  });

  //configurarNav();
}

inicializar()
