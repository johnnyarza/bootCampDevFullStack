import React, { Component } from 'react';
import css from './counter.module.css';
import IncrementButton from './IncrementButton.js';
import DecrementButton from './DecrementButton';
import Value from './Value';
import Steps from './Steps';

export default class Counter2 extends Component {
  constructor() {
    super(); //obrigado pelo react
    this.state = {
      currentCounter: 2,
      steps: 0,
    };
  }

  //chaves no spanpara entender que é valor
  //implementar com arrow function por causa do this
  handleButtonClick = (clickType) => {
    const { currentCounter, steps } = this.state;
    this.setState({
      currentCounter:
        clickType === '+' ? currentCounter + 1 : currentCounter - 1,
      steps: steps + 1,
    });
  };
  render() {
    const { currentCounter, steps } = this.state;
    return (
      <div className={css.counterContainer}>
        <DecrementButton onIncrement={this.handleButtonClick} />

        <Value value={currentCounter} />

        <IncrementButton onIncrement={this.handleButtonClick} />

        <Steps currentStep={steps} />
      </div>
    );
  }
}
