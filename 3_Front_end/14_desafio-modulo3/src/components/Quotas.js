import React, { useState, useEffect } from 'react';
import Quota from './Quota';
import { calcQuotas } from '../helpers/interestCalc';

export default function Quotas({ amount, intRate, months }) {
  const [quotas, setQuotas] = useState([]);

  useEffect(() => {
    setQuotas(calcQuotas(amount, intRate, months));
  }, [amount, intRate, months]);

  return (
    <div style={styles.flexRow}>
      {quotas.map((quota, index) => {
        const [percentage, revenue, amount] = quota;

        return (
          <Quota
            key={index}
            num={index + 1}
            percentage={percentage}
            revenue={revenue}
            amount={amount}
          />
        );
      })}
    </div>
  );
}

const styles = {
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: '10px',
    marginTop: '50px',

    alignItems: 'stretch',
    flexWrap: 'wrap',
  },
};
