import React from 'react';
import * as formatNumber from '../helpers/formatNumber';

export default function Quota({ num, percentage, revenue, amount }) {
  return (
    <div style={styles.flexRow}>
      <div
        style={{
          padding: '10px',
          justifyContent: 'flex-start',
          marginRight: '5px',
        }}
      >
        <span color="red" style={{ fontWeight: 'bold' }}>
          {num}
        </span>
      </div>
      <div style={styles.flexCol}>
        <div
          style={
            revenue > 0
              ? { color: '#3ae374', fontWeight: 'bold' }
              : { color: '#ff3838', fontWeight: 'bold' }
          }
        >
          {formatNumber.formatCurrency(amount)}
        </div>
        <div style={revenue > 0 ? { color: '#3ae374' } : { color: '#ff3838' }}>
          {formatNumber.formatCurrency(revenue)}
        </div>
        <div
          style={percentage > 0 ? { color: '#17c0eb' } : { color: '#ff3838' }}
        >
          {formatNumber.formatPercentage(percentage)}
        </div>
      </div>
    </div>
  );
}

const styles = {
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    border: 'solid 1px',
    borderRadius: '5px',
    padding: '10px',
    margin: '10px',
    width: '150px',
    backgroundColor: '#ffffff',
  },
  flexCol: {
    display: 'flex',
    flexDirection: 'column',
  },
};
