import React from 'react';
import TotalAmount from './TotalAmount';
import Input from './Input';

export default function Inputs({
  amount,
  intRate,
  months,
  onAmountChange,
  onIntRateChange,
  onMonthsChange,
}) {
  const handleAmountChange = (value) => {
    onAmountChange(value);
  };
  const handleIntRateChange = (event) => {
    onIntRateChange(event.target.value);
  };
  const handleMonthsRateChange = (event) => {
    onMonthsChange(event.target.value);
  };

  return (
    <div style={styles.flexRow} className="row">
      <TotalAmount onAmountChange={handleAmountChange} />
      <Input
        stepValue={0.1}
        minValue={-12}
        maxValue={12}
        onValueChange={handleIntRateChange}
      >
        Taxa de Juros Mensal:
      </Input>
      <Input
        stepValue={1}
        minValue={1}
        maxValue={36}
        onValueChange={handleMonthsRateChange}
      >
        Período (meses):
      </Input>
    </div>
  );
}

const styles = {
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: '10px',
    marginTop: '50px',
    alignItems: 'stretch',
    backgroundColor: '#ffffff',
    border: '1px transparent',
    borderRadius: '5px',
  },
};
