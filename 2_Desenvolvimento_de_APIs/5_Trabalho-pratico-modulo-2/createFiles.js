const fs = require('fs');
const utils = require('./utils/utils.js');
let cities = [];
let states = [];

async function init() {
  try {
    loadCities(await utils.readFile('./cidadesEEstados/Cidades.json'));
    loadStates(await utils.readFile('./cidadesEEstados/Estados.json'));
    saveStatesInJSONFile();
    console.log(states);
    console.log(cities);
  } catch (err) {
    console.log(err);
  }
}

function loadCities(data) {
  cities = JSON.parse(data);
  return JSON.parse(data);
}

function loadStates(data) {
  states = JSON.parse(data);
  return JSON.parse(data);
}

function saveStatesInJSONFile() {
  states.forEach((state) => {
    let path = `./estados/${state.Sigla}.json`;
    utils.writeFile(path, state);
  });
}

module.exports = init;
module.exports = loadCities;
module.exports = loadStates;
