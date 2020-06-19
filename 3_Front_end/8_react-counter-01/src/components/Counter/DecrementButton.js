import React from 'react';

export default function IncrementButton(props) {
  const handleButtonClick = () => {
    props.onIncrement('-');
  };

  return (
    <button
      onClick={handleButtonClick}
      className="waves-effect waves-light btn red darken-4"
    >
      -
    </button>
  );
}
