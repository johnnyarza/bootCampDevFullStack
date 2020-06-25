function calcQuotas(initialAmount, intRate, months) {
  let quotas = [];
  let newAmount = 0;
  let currAmount = initialAmount;
  let percentage = 0;
  for (let i = 1; i <= months; i++) {
    newAmount = currAmount * (1 + intRate / 100);
    percentage = +(((newAmount - initialAmount) / initialAmount) * 100).toFixed(
      2
    );

    quotas.push([
      percentage,
      +(newAmount - initialAmount).toFixed(2),
      +newAmount.toFixed(2),
    ]);
    currAmount = newAmount;
  }
  return quotas;
}

export { calcQuotas };
