var a = 4,
  b = 5;

if (a > b) {
  console.log(a + ' é maior que ' + b);
} else if (a < b) {
  console.log(b + ' é maior que ' + a);
} else {
  console.log(a + ' é igual a ' + b);
}

var r = '';
var dia = 1;
//prettier-ignore
switch (dia) {
  case 1: r = 'Domingo'; break;
  case 2: r = 'Segunda'; break;
  case 3: r = 'Terça'; break;
  case 4: r = 'Quarta'; break;
  case 5: r = 'Quinta'; break;
  case 6: r = 'Sexta'; break;
  case 7: r = 'Sabádo'; break;
  default: r = 'Dia inválido';
}
//prettier-ignore-end

console.log(r);

//operador ternário
a = 6;
b = 7;

var resposta = a > b ? 'maior' : a < b ? 'menor' : 'igual';
console.log(`${a} é ${resposta} que ${b}`);

//Estruturas de repetição

var numeroAtual = 1;
var somatorio = 0;

while (numeroAtual <= 10) {
  somatorio += numeroAtual;
  numeroAtual++;
}

console.log('A soma é ' + somatorio);

numeroAtual = 1;
somatorio = 0;
do {
  somatorio += numeroAtual;
  numeroAtual++;
} while (numeroAtual <= 10);
console.log('A soma é ' + somatorio);

somatorio = 0;
for (numeroAtual = 1; numeroAtual <= 10; numeroAtual++) {
  somatorio += numeroAtual;
}
console.log('A soma é ' + somatorio);
