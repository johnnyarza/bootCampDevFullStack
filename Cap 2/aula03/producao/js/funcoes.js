function sum(a, b) {
  return a + b;
}

console.log(sum(2, 3));

function compareNumbers(a, b) {
  //return a > b ? 1 : a < b ? -1 : 0;
  return a - b;
  /* geralemnte os programas retornam 
  0 quando os numeros são iguais
  um numero negativo, quando o primeiro numero é menor que o segundo
  um numero positivo quando o primeiro numero é maior que o segundo*/
}

console.log(compareNumbers(1, 1));
console.log(compareNumbers(1, 2));
console.log(compareNumbers(2, 1));

function superSum(from, upTo) {
  var sum = 0;

  for (var i = from; i <= upTo; i++) {
    sum += i;
  }
  return sum;
}
console.log(superSum(1, 10));
console.log(superSum(9, 100));
console.log(superSum(200, 1000));
