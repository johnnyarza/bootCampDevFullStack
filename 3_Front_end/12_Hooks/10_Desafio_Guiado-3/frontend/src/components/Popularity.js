import React from 'react';

const STARS = {
  full: '★',
  empty: '☆',
};

export default function Popularity({ value }) {
  const fullStars = STARS.full.repeat(value);
  const maxStars = 10;
  const emptyStars = STARS.empty.repeat(maxStars - value);
  return (
    <div style={{ fontSize: '1.5rem', color: '#f1c40f' }}>
      {fullStars + emptyStars}
    </div>
  );
}
