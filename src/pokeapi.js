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
  let habilidadesObjEspanol = {};


  /*
    Hago un map porque map te devuelve un array nuevo con los valores que queres trabajar,
    yo queria minimizar la cantidad de la información con la que estaba trabajando y solo agarrar 
    pocas cosas, conviene que hagas console.log para ver que retorna.
  */
  let habilidadesArray = habilidadesObj.map((habilidad, i) => {
    /*
      Creo un objeto para guardar el nuevo array que mencione anteriormente.
      Por lo tanto, el objeto retornado (habilidades) es lo que se va a devolver como resultado 
      con solo dos datos: el nombre de la habilidad y la url
    */
    let habilidades = {
      nombre: '',
      url: ''
    }

    habilidades.nombre = habilidad.ability.name;
    habilidades.url = habilidad.ability.url;

    return habilidades;
  })

  /*
    Aca nuevamente hago un map, porque solo necesito el valor de la habilidad
    para que entiendas hacele console.log :D
  */
  let habilidadIndividualArray = habilidadesArray.map((value, i) => {
      return value
  })

  /*
    Le aplico un filter que me va a devolver los valores sin repetirse, porque hasta aca
    me salian 2 o mas veces la misma habilidad, esto la reduce a la cantidad que tienen que ser
  */
    let filtrarHabilidades = habilidadIndividualArray.filter((value, i) => {
        return value === value ? value : false;
        /*
          esto es como hacer if(value === value){
              return value 
          }else{
              return false
          }
        */
    });
    /*
      Ya que ahora tengo las urls sin repetir, hago un map para que:
      me devuelva un nuevo array para trabajar y de paso hace una promise por cada url que trae
      de la API.
    */
    let habilidadesFiltradas = filtrarHabilidades.map((value,i) => {
       return fetch(value.url).then((data) => data.json());
    })

    /*
      El resultado de esta funcion ahora este nuevo array que contiene promises para resolver
      esto sigue en ui.js linea 65
    */
  return habilidadesFiltradas;
}