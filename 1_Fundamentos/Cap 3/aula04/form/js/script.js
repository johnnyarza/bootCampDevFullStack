console.log('Aula 04');

//Neste caso o start é uma função e está sem o parenteses
//pq ele só deve ser executado após a pagina carregar.
//Caso colocar parentesis a função start será executada
//direto na linha onde esta sendo declarada
window.addEventListener('load', start);

function start() {
  console.log('Página totalmente carregada');
  var nameInput = document.querySelector('#nameInput');
  nameInput.addEventListener('keyup', countName);

  var form = document.querySelector('form');
  form.addEventListener('submit', preventSubmit);
}

function countName(event) {
  console.log(event);
  var count = event.target.value;

  var span = document.querySelector('#nameLength');
  span.textContent = count.length === 0 ? '' : count.length;
}

function preventSubmit(event) {
  event.preventDefault();

  var nameInput = document.querySelector('#nameInput');
  alert(nameInput.value + ' cadastrado com sucesso!');
}
