function media(array = []) {
  const sum = array.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );
  return sum / array.length;
}

function somatorio(array = []) {
  const sum = array.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );
  return sum;
}

module.exports = { media, somatorio };
