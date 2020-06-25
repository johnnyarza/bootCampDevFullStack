import React, { useState, useEffect } from 'react';
import Inputs from './components/Inputs';
import Quotas from './components/Quotas';

function App() {
  const [amount, setAmount] = useState('');
  const [intRate, setIntRate] = useState(0);
  const [months, setMonths] = useState(1);
  useEffect(() => {}, [amount, intRate, months]);

  const handleAmountChange = (value) => {
    setAmount(+value);
  };
  const handleIntRateChange = (value) => {
    setIntRate(+value);
  };
  const handleMonthsChange = (value) => {
    setMonths(+value);
  };

  return (
    <div className="container">
      <h1 className="center">React - Juros Composto</h1>

      <Inputs
        amount={amount}
        intRate={intRate}
        months={months}
        onAmountChange={handleAmountChange}
        onIntRateChange={handleIntRateChange}
        onMonthsChange={handleMonthsChange}
      />
      {amount !== 0 && intRate !== 0 && months > 0 && (
        <Quotas amount={amount} intRate={intRate} months={months} />
      )}
    </div>
  );
}

export default App;
