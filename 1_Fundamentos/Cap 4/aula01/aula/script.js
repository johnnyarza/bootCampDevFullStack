'use strict'; // o JS acusa mais erros

//var x let

//var tem escopo abrangente
//let tem escopo reduzido

function withVar() {
  for (var i = 0; i < 10; i++) {
    console.log('var' + i);
  }
  i = 20;
  console.log(i);
}

withVar();

function withLet() {
  for (let i = 0; i < 10; i++) {
    console.log('var' + i);
  }
  //i = 20; // aqui da erro
  //console.log(i);
}

withLet();

//const - não podemos reatribuir valores

//const c = 10;
//c = 20;

//const nao garante a imutabilidade de arrays
const d = [];
console.log(d);

d.push(1);
console.log(d);

function sum(a, b) {
  return a + b;
}

const sum2 = function (a, b) {
  //função anonima
  return a + b;
};

//arrow function
const sum3 = (a, b) => {
  return a + b;
};
//arrow function reduzida
const sum4 = (a, b) => a + b;

console.log(sum(2, 3));
console.log(sum2(2, 3));
console.log(sum3(2, 3));
console.log(sum4(2, 3));

//template literals
const name = 'Raphael';
const surName = 'Gomide';
const text1 = 'Meu nome é ' + name + ' ' + surName;
const text2 = `Meu nome é ${name} ${surName}`;

console.log(text1);
console.log(text2);

//defaul params

const sum5 = (a = 2, b = 3) => a + b;
console.log(sum5());
console.log(sum5(1));
