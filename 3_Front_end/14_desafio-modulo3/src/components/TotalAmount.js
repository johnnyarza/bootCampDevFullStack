import React from 'react';

export default function TotalAmount({ onAmountChange }) {
  const handleAmountChange = (event) => {
    onAmountChange(event.target.value);
  };
  return (
    <div className="input-field col s4">
      <input
        id="totalAmount"
        type="number"
        onChange={handleAmountChange}
        min={0}
        max={100000}
      />
      <label className="active" htmlFor="totalAmount">
        Montante Inicial
      </label>
    </div>
  );
}
