import React, { useState } from 'react';
import css from './counter.module.css';
import IncrementButton from './IncrementButton.js';
import DecrementButton from './DecrementButton';
import Value from './Value';
import Steps from './Steps';

export default function Counter2(props) {
  //chaves no spanpara entender que é valor
  //implementar com arrow function por causa do this

  const [counter2State, setCurrentCounter] = useState(props);
  console.log(counter2State, setCurrentCounter);

  const handleButtonClick = (clickType) => {
    counter2State.onCount(clickType);
    console.log(counter2State.onCount);
  };

  const { countValue, currentStep } = counter2State;
  return (
    <div className={css.counterContainer}>
      <DecrementButton onIncrement={handleButtonClick} />

      <Value value={countValue} />

      <IncrementButton onIncrement={handleButtonClick} />

      <Steps currentStep={currentStep} />
    </div>
  );
}
