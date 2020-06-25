import React from 'react';
import css from './countries.module.css';

export default function Country(props) {
  const { country } = props;
  const { name, flag } = country;
  return (
    <div className={`${css.country} ${css.border}`}>
      <img className={css.flag} src={flag} alt={name} />
      <span className={css.countryName}>{country.name}</span>
    </div>
  );
}
