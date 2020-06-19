import React, { Component } from 'react';
import css from './user.module.css';

export default function User(props) {
  const { name, picture } = props.user;
  return (
    <div className={css.flexRow}>
      <img className={css.avatar} src={picture.large} alt={name.first} />
      <span>{name.first}</span>
    </div>
  );
}
