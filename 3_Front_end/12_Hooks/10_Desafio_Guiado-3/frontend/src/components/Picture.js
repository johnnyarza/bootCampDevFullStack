import React from 'react';
import css from './picture.module.css';
export default function ({ imageSource, name }) {
  return (
    <div>
      <img className={css.picture} src={imageSource} alt={name} title={name} />
    </div>
  );
}
