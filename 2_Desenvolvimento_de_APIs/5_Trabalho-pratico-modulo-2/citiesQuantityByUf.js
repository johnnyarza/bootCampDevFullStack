const init = require('./createFiles');
const utils = require('./utils/utils.js');
const loadCities = require('./createFiles');
const loadStates = require('./createFiles.js');

async function citiesQuantityByUf(uf = '') {
  try {
    let stateId = await getStateId(uf);
    const cities = await loadCities(
      await utils.readFile('./cidadesEEstados/Cidades.json')
    );
    const states = await loadStates(
      await utils.readFile('./cidadesEEstados/Estados.json')
    );
    //countCities(stateId, cities);
    //top5StatesByCityQuantity(states, cities);
    //topCitiesByNameLenOfEachState(states, cities);
    lastCitiesByNameLenOfEachState(states, cities);
    //topCityByNameLen(states, cities);
    //lastCityByNameLen(states, cities);
  } catch (err) {
    console.log(err);
  }
}

function lastCityByNameLen(states, cities) {
  let topCity = cities.sort((a, b) => {
    return a.Nome.length !== b.Nome.length
      ? a.Nome.length - b.Nome.length
      : a.Nome > b.Nome;
  })[0];

  let sigla = states.find((state) => topCity.Estado === state.ID).Sigla;
  console.log(`${topCity.Nome} - ${sigla}`);
}

function topCityByNameLen(states, cities) {
  let topCity = cities.sort((a, b) => {
    return a.Nome.length != b.Nome.length
      ? b.Nome.length - a.Nome.length
      : a.Nome <= b.Nome;
  })[0];

  let sigla = states.find((state) => topCity.Estado === state.ID).Sigla;
  console.log(`${topCity.Nome} - ${sigla}`);
}

function lastCitiesByNameLenOfEachState(states, cities) {
  let arr = states.map((state) => {
    let citiesFromState = cities.filter((city) => city.Estado === state.ID);
    function compare(a = '', b = '') {
      if (a.length === b.length) {
        if (a > b) return -1;
        if (a < b) return 1;
        return 0;
      } else return a.length - b.length;
    }
    let topCityNameLenFromState = citiesFromState.sort((a, b) =>
      compare(a.Nome, b.Nome)
    );
    return [topCityNameLenFromState[0], state.Sigla];
  });
  arr = arr.map((array) => `${array[0].Nome} - ${array[1]}`);
  console.log(arr);
}

function topCitiesByNameLenOfEachState(states, cities) {
  let arr = states.map((state) => {
    let citiesFromState = cities.filter((city) => city.Estado === state.ID);
    function compare(a = '', b = '') {
      if (a.length === b.length) {
        if (a > b) return -1;
        if (a < b) return 1;
        return 0;
      } else return a.length - b.length;
    }
    let topCityNameLenFromState = citiesFromState.sort((a, b) =>
      compare(a.Nome, b.Nome)
    );
    return [
      topCityNameLenFromState[topCityNameLenFromState.length - 1],
      state.Sigla,
    ];
  });
  arr = arr.map((array) => `${array[0].Nome} - ${array[1]}`);
  console.log(arr);
}

function top5StatesByCityQuantity(states, cities) {
  let stateCity = states.map((state) => {
    let count = cities.filter((city) => state.ID === city.Estado).length;
    return [state.Sigla, count];
  });
  let top5Cities = stateCity.sort((a, b) => b[1] - a[1]).slice(0, 5);
  let last5Cities = stateCity.sort((a, b) => b[1] - a[1]).slice(-5);
  top5Cities = top5Cities.map((city) => {
    return `${city[0]} - ${city[1]}`;
  });
  last5Cities = last5Cities.map((city) => {
    return `${city[0]} - ${city[1]}`;
  });
  console.log(top5Cities);
  console.log(last5Cities);
}

function countCities(stateId = 0, cities = []) {
  console.log(cities.filter((city) => city.Estado === stateId).length);
}

async function getStateId(uf) {
  const pr = await utils.readFile(`./estados/${uf.toUpperCase()}.json`);
  const stateId = JSON.parse(pr).ID;
  return stateId;
}

citiesQuantityByUf('AC');
