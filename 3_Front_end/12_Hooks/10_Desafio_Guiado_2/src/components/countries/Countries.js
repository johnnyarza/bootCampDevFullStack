import React from 'react';
import Country from './Country';
import css from './countries.module.css';

export default function Countries(props) {
  const { countries } = props;

  return (
    <div className={`${css.border} ${css.flexRow}`}>
      {countries.map((country) => {
        return <Country key={country.name} country={country} />;
      })}
    </div>
  );
}
