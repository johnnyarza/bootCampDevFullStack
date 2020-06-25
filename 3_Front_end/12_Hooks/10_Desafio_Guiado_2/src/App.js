import React, { useState, useEffect } from 'react';
import Countries from './components/countries/Countries';
import Header from './components/header/Header';

export default function App() {
  const [allCountries, setAllCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [filteredPopulation, setFilteredPopulation] = useState(0);
  const [userFilter, setUserFilter] = useState('');

  useEffect(() => {
    const getCountries = async () => {
      const res = await fetch('https://restcountries.eu/rest/v2/all');
      let allCountries = await res.json();
      allCountries = allCountries.map(
        ({ name, numericCode, flag, population }) => {
          return {
            id: numericCode,
            name,
            filterName: name.toLowerCase(),
            flag,
            population,
          };
        }
      );
      setAllCountries(allCountries);
      setFilteredCountries(Object.assign([], allCountries));
    };

    getCountries();
  }, []);

  const calculatePopulationFrom = (countries) => {
    const totalPopulation = countries.reduce((accumulator, current) => {
      return accumulator + current.population;
    }, 0);
    return totalPopulation;
  };

  const handleChangeFilter = (newText) => {
    const filterLowerCase = newText.toLowerCase();

    setUserFilter(filterLowerCase);

    setFilteredCountries(
      allCountries.filter((country) => {
        return country.filterName.includes(filterLowerCase);
      })
    );
    setFilteredPopulation(calculatePopulationFrom(filteredCountries));
  };

  return (
    <div className="container">
      <h1 className="center">React Country</h1>
      <Header
        filter={userFilter}
        countryCount={filteredCountries.length}
        totalPopulation={filteredPopulation}
        onChangeFilter={handleChangeFilter}
      />
      <Countries countries={filteredCountries} />
    </div>
  );
}
