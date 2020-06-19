import React, { Component } from 'react';
import css from './counter.module.css';
import IncrementButton from './IncrementButton.js';
import DecrementButton from './DecrementButton';
import Value from './Value';
import Steps from './Steps';

export default class Counter2 extends Component {
  //chaves no spanpara entender que é valor
  //implementar com arrow function por causa do this
  handleButtonClick = (clickType) => {
    this.props.onCount(clickType);
  };
  render() {
    const { countValue, currentStep } = this.props;
    return (
      <div className={css.counterContainer}>
        <DecrementButton onIncrement={this.handleButtonClick} />

        <Value value={countValue} />

        <IncrementButton onIncrement={this.handleButtonClick} />

        <Steps currentStep={currentStep} />
      </div>
    );
  }
}
