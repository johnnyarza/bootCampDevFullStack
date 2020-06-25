import React from 'react';

export default function Input({
  stepValue,
  children,
  minValue,
  maxValue,
  onValueChange,
}) {
  return (
    <div className="input-field col s4">
      <input
        id="inputValue"
        type="number"
        step={stepValue}
        min={minValue}
        max={maxValue}
        onChange={onValueChange}
      />
      <label className="active" htmlFor="inputValue">
        {children}
      </label>
    </div>
  );
}
